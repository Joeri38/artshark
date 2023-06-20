import connectDb from '../../../middleware/mongoose'

const nodemailer = require('nodemailer')

const handler = async (req,res)=>{

  let company = 'Art Shark'
  let websiteUrl = 'http://artshark.vercel.app'
  let customerSupportEmail = 'artsharkbe@gmail.com'
  //let customerSupportPhoneNo = '971238834941'

  const {email, firstName, orderId, streetAddress, date, products, amount} = req.body;

  let message = `Dear ${firstName},

      Thank you for choosing ${company}. We are pleased to confirm your recent order with us. Below are the details of your purchase:

      Order Number: #${orderId}
      Order Date: ${date}
      Shipping Address: ${streetAddress}
      Amount: €${amount}

      Please note that the shipping and delivery times may vary depending on your location and the availability of the product(s). You will receive a separate email with the tracking information once your order has been dispatched.

      If you have any questions or concerns regarding your order, please don't hesitate to reach out to our customer support team at ${customerSupportEmail}. Our dedicated team is ready to assist you with any queries you may have.

      Thank you once again for choosing ${company}. We appreciate your business and look forward to serving you in the future.

      Best regards,

      ${company}
      ${websiteUrl}`

  console.log(message);

  if (req.method == 'POST'){
        
    const transporter = nodemailer.createTransport({
      host:'smtp.gmail.com',
      port: 465,
      secure: true,
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    console.log(process.env.EMAIL);
    console.log(process.env.PASSWORD);

    let mailData = {
      from: `${process.env.EMAIL}`,
      to: `${email}`,
      subject: `Order Confirmation by ${company}`,
      text: `${message}`,
    };

    transporter.sendMail(mailData);

    /*transporter.sendMail(mailData, function (err,info){
      if (!err) {
          return res.status(200).json({ success: true, message: `details has been sent to ${email}`})
      }
      if (err) {
          return res.status(400).json({ success: false, message: "Some Error Occured!"})
          console.log(err);
      }
    })*/
  }

  else{
    return res.status(400).json({ success: false, message: "Only POST method is allowed!"})
  }
}

export default connectDb(handler);