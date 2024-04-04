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
        let newOrder = new Order( { orderId: Math.floor(Math.random() * Date.now()),
                                    name, email, phone, addressLine1: line1, addressLine2:line2, 
                                    city, zip: postal_code, country,
                                    paymentId:id, paymentStatus:status, amount:amount / 100,
                                    products: cart } );
        let order = await newOrder.save();
        console.log(`Order added to database: ${order.id}`)
        //res.status(200).json({ success: true, message: `Order confirmation has been sent to ${email}`}) causes error in vercel production

        
        // Helloprint: make orderItems
        const orderItems = cart.map((item) => {

          // Collection file name for images 
          const collection_idx = item.collection;
          const collection_files = ['recently-added/', 'red-japan/', 'celebrities/', 'hockney/', 'ukiyo-e/'];
          const file = collection_files[collection_idx];

          return { 
            itemReferenceId: '1',
            variantKey: 'fullcutshirt140gsm~FULLCUTSHIRT140GSM-COTTON-100X100-QTY-FULL_COLOR+CHEST_LEFT+DIGITAL-FRUIT_OF_THE_LOOM+WHITE+NONE+CLASSIC_M_SLIM_F+UNISEX_FEMALE+ROUND_NECK+SHORT',
            quantity: item.qty,
            serviceLevel: 'standard',
            fileUrl: 'artshark.be/images/collections/' + file + item.img.replace('.png', '.pdf'),
            options: [
              { code: "apparelSize",
                value: [
                  {
                    quantity: item.qty,
                    size: item.size,
                    type: "unisex"
                  }
                ]
              }
            ]
          }
        })
        console.log('Order items:')
        console.log(orderItems)

        // Send order to Helloprint
        sdk.auth(process.env.HELLOPRINT_API_KEY);
        //sdk.server('https://api.helloprint.com/rest/v1');
        //sdk.server('https://drukzo-michael.ngrok.io/rest/v1');
        sdk.createOrder({
          mode: 'prod', //prod
          shipping: {
            companyName: 'artshark',
            firstName: firstName,
            lastName: lastName,
            addressLine1: line1,
            addressLine2: line2,
            postcode: postal_code,
            city: city,
            country: 'BE',
            phone: phone
          },
          orderReferenceId: order.id.toString(),
          orderItems: orderItems,
          //callbackUrls: ['test'],      
        })
          .then(({ data }) => console.log(data))
          .catch(err => console.error(err));
        
        // Send mail
        const orderString = cart.map((item) => {
          if (item.qty == 1){
            return `${item.qty}x T-shirt ${item.size} ${item.sex}`
          } else{
            return `${item.qty}x T-shirts ${item.size} ${item.sex}`
          }
        }).join('<br>')
        console.log(orderString)
        
        const html = `
          <p>Dear ${name}</p>

          <p>Thank you for choosing Artshark! We will deliver your order within two weeks.</p>

          <p>Order details:</p>
          <p>${orderString}</p>

          <p>Shipping adress:</p>
          <p>${name} <br> ${line1} ${line2 ? '<br> ' + line2 : ''} <br> ${postal_code} ${city}</p>

          <p>To see all your orders, create an <a href='http://artshark.be/signup' target='_blank'>account</a></p>

          <br><br><br>
          <p><a href='http://artshark.be/termsandconditions' target='_blank'>Terms and conditions</a> | <a href='http://artshark.be/privacy-policy' target='_blank'>Privacy Policy</a> </p>
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