import connectDb from '../../../middleware/mongoose'

const nodemailer = require('nodemailer')

const handler = async (req,res)=>{

  console.log('Sending order email...')

  let websiteUrl = 'http://artshark.vercel.app'
  let customerSupportEmail = 'artsharkbe@gmail.com'

  const {email, firstName, orderId, streetAddress, date, products, amount} = req.body;

  let message = `Dear ${firstName},

Thank you for choosing Art Shark. We are pleased to confirm your recent order with us. Below are the details of your purchase:

    Order Number: #${orderId}
    Order Date: ${date}
    Shipping Address: ${streetAddress}
    Amount: €${amount}

Please note that the shipping and delivery times may vary depending on your location and the availability of the product(s). You will receive a separate email with the tracking information once your order has been dispatched.

If you have any questions or concerns regarding your order, please don't hesitate to reach out to our customer support team at ${customerSupportEmail}. Our dedicated team is ready to assist you with any queries you may have.

Thank you once again for choosing Art Shark. We appreciate your business and look forward to serving you in the future.

Best regards,

Art Shark team`

  console.log(message);

  if (req.method == 'POST'){

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
      //from: `${process.env.EMAIL}`,
      from: `"Art Shark" <${process.env.EMAIL}>`,
      to: `${email}`,
      bcc: `${process.env.EMAIL}`,
      subject: `Order Confirmation`,
      text: `${message}`,
    };

    transporter.sendMail(mailData, function (err,info){
      if (!err) {
          return res.status(200).json({ success: true, message: `Order confirmation has been sent to ${email}`})
      }
      if (err) {
          return res.status(400).json({ success: false, message: "Some Error Occured!"})
      }
    })
  }

  else{
    return res.status(400).json({ success: false, message: "Only POST method is allowed!"})
  }
}

export default connectDb(handler);