import connectDb from '../../../middleware/mongoose';
import Order from '../../../models/Order';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const nodemailer = require('nodemailer');
const sdk = require('api')('@helloprintapi/v1.1#1i1s3pl2z3rvpz');

const handler = async (req,res)=>{

  const sessionId = req.body.sessionId;
  const cart = JSON.parse(req.body.cart);

  if( sessionId ){
    try {

      // Get details from Stripe
      const session = await stripe.checkout.sessions.retrieve(sessionId);
  
      // Customer info and payment info 
      const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent);
      let customerDetails = session.customer_details;
      const { name, email, phone } = customerDetails;
      const { city, country, line1, line2, postal_code } = customerDetails.address;
      const { id, amount, status } = paymentIntent;

      // Split name into first and last name
      const firstWhiteSpaceIndex = name.indexOf(' ');
      const firstName = name.substring(0, firstWhiteSpaceIndex);
      const lastName = name.substring(firstWhiteSpaceIndex + 1);

      console.log(`Processing order, sessionId ${sessionId}`)
  
      try {

        // Add new order to database
        let newOrder = new Order( { name, email, phone, addressLine1: line1, addressLine2:line2, 
                                    city, zip: postal_code, country,
                                    paymentId:id, paymentStatus:status, amount:amount / 100,
                                    products: cart } );
        let order = await newOrder.save();
        //res.status(200).json({ success: true, message: `Order confirmation has been sent to ${email}`})
        console.log(`Order added to database: ${order.id}`)

        // Maker orderItems
        const orderItems = cart.map((item) => {

          // Collection file name for images 
          const collection_idx = item.collection;
          const collection_files = ['recently-added/', 'red-japan/', 'celebrities/', 'hockney/', 'ukiyo-e/'];
          const file = collection_files[collection_idx];

          return { 
            itemReferenceId: '1',
            variantKey: 'tshirtspremiumclique~TODO',
            quantity: item.qty,
            serviceLevel: 'standard',
            fileUrl: 'artshark.be/images/collections/' + file + item.img.replace('.png', '.pdf'),
          }
        })
        
        console.log('Order items:')
        console.log(orderItems)

        const shipping = {
          shipping: {
            companyName: 'artshark',
            firstName: firstName,
            lastName: lastName,
            addressLine1: line1,
            addressLine2: line2,
            postcode: postal_code,
            city: city,
            country: country,
            phone: phone
          }
        }

        console.log('Shipping info')
        console.log(shipping)
        
        // Send order to Helloprint
        /*sdk.auth('testapikey');
        sdk.server('https://drukzo-michael.ngrok.io/rest/v1');
        sdk.createOrder({
          mode: 'test',
          shipping: {
            companyName: 'artshark',
            firstName: firstName,
            lastName: lastName,
            addressLine1: line1,
            addressLine2: line2,
            postcode: postal_code,
            city: city,
            country: country,
            phone: phone
          },
          orderItems: orderItems,
          callbackUrls: ['test'],
          orderReferenceId: order.id,
        })
          .then(({ data }) => console.log(data))
          .catch(err => console.error(err));*/
        
        // Send mail
        const html = `
          <p>Dear ${name}</p>

          <p>Thank you for choosing Artshark! We will deliver your order within two weeks.</p>

          <p>Shipping adress:</p>
          <p>${name} <br> ${line1} ${line2 ? '<br> ' + line2 : ''} <br> ${postal_code} ${city}</p>

          <p>To see all your orders, create an <a href='http://artshark.be/signup' target='_blank'>account</a></p>
        `

        const transporter = nodemailer.createTransport({
          host: "send.one.com",
          port: 465,
          secure: true, // true for 465, false for other ports
          auth: {
            user: `${process.env.EMAIL}`, // generated ethereal user
            pass: `${process.env.PASSWORD}`, // generated ethereal password
          },
        });
    
        let mailData = {
          from: `"Artshark" <${process.env.EMAIL}>`,
          to: `${email}`,
          bcc: `${process.env.EMAIL}`,
          subject: `Order Confirmation`,
          html: html,
        };
    
        transporter.sendMail(mailData, function (err,info){
          if (!err) {
              console.log(`Order confirmation has been sent to ${email}`)
              return res.status(200).json({ success: true, message: `Order confirmation has been sent to ${email}`})
              
          }
          if (err) {
              console.log(`error with mail`)
              return res.status(400).json({ success: false, message: "Some Error Occured!"})    
          }
        })
  
      } catch (error) {
        res.status(400).json({ success: false, message: "Internal Server Error!" })
        console.log(`internal server error`)
        console.log(error.message)
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