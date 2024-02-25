import connectDb from '../../../middleware/mongoose';
import Order from '../../../models/Order';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const nodemailer = require('nodemailer');

const handler = async (req,res)=>{

  const sessionId = req.body.sessionId;
  const cart = JSON.parse(req.body.cart);
  console.log('cart: ' + cart);

  if( sessionId ){
    try {

      // Get details from Stripe
      const session = await stripe.checkout.sessions.retrieve(sessionId);
  
      // Customer info and payment info 
      const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent);
      let customerDetails = session.customer_details;
      const { name, email, phone } = customerDetails;
      const { city, country, line1, postal_code } = customerDetails.address;
      const { id, amount, status } = paymentIntent;
  
      try {

        // Add new order 
        let newOrder = new Order( { name, email, phone, streetAddress: line1, city, zip: postal_code, country,
                                    paymentId:id, paymentStatus:status, amount:amount / 100,
                                    products: cart } );
        let order = await newOrder.save();
        res.status(200).json({ success: true, message: "New Order Added !",  id: order.id}) 
        
        // Mail content
        const html = `
          <p>Dear ${name}</p>

          <p>Thank you for choosing Art Shark! We will deliver your order within two weeks.</p>

          <p>Shipping adress:</p>
          <p>${name} <br> ${line1} <br> ${postal_code} ${city}</p>

          <p>To see all your orders, create an <a href='http://localhost:3000/signup' target='_blank'>account.</a></p>
        `

        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true, // true for 465, false for other ports
          auth: {
            user: `${process.env.EMAIL}`, // generated ethereal user
            pass: `${process.env.PASSWORD}`, // generated ethereal password
          },
        });
    
        let mailData = {
          from: `"Art Shark" <${process.env.EMAIL}>`,
          to: `${email}`,
          bcc: `${process.env.EMAIL}`,
          subject: `Order Confirmation`,
          html: html,
        };
    
        transporter.sendMail(mailData, function (err,info){
          if (!err) {
              return res.status(200).json({ success: true, message: `Order confirmation has been sent to ${email}`})
          }
          if (err) {
              return res.status(400).json({ success: false, message: "Some Error Occured!"})
          }
        })
  
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