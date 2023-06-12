import connectDb from '../../../middleware/mongoose';
import Order from '../../../models/Order';
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const handler = async (req,res)=>{

  const sessionId = req.body.sessionId;

  if( sessionId){
    try {

      // Details of everything
      const session = await stripe.checkout.sessions.retrieve(sessionId);
  
      // Customer Info Details
      let customerDetails = session.customer_details;
  
      // Product Details that user buy
      const data = await stripe.checkout.sessions.listLineItems(sessionId, { limit: 100 });
      let productData = data.data;
  
  
      // Payment Intent Details
      const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent);
  
      
      const { name, email, phone } = customerDetails;
      const { city, country, line1, postal_code } = customerDetails.address;
  
      const { id, amount, status } = paymentIntent;
  

      try {
        let newOrder = new Order( { name, email, paymentId:id, amount:amount / 100, paymentStatus:status , products:productData, phone, city, country, streetAddress:line1, zip:postal_code } );
        let order = await newOrder.save();
        res.status(200).json({ success: true, message: "New Order Added !",  id: order.id}) 
  
      } catch (error) {
        res.status(400).json({ success: false, message: "Internal Server Error!" })
      }



      
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
    
  }
  else{
    res.status(500).json({ error: 'sessionId not found' });
  }
  
}


export default connectDb(handler);