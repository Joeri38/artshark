import connectDb from '../../../middleware/mongoose'

const nodemailer = require('nodemailer')
//let ejs = require('ejs');

const handler = async (req,res)=>{

  console.log('Sending order email...')

  const {email, orderId, name, streetAddress, city, zip, date, products, amount} = req.body;

  const html = `
    <p>Dear ${name}</p>

    <p>Thank you for choosing Art Shark! We will deliver your order within two weeks.</p>

    <p>Shipping adress:</p>
    <p>${name} <br> ${streetAddress} <br> ${zip} ${city}</p>

    <p>To see all your orders, create an <a href='http://localhost:3000/signup' target='_blank'>account.</a></p>
  `

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
      from: `"Art Shark" <${process.env.EMAIL}>`,
      to: `${email}`,
      bcc: `${process.env.EMAIL}`,
      subject: `Order Confirmation`,
      //text: `${message}`,
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
  }

  else{
    return res.status(400).json({ success: false, message: "Only POST method is allowed!"})
  }
}

export default connectDb(handler);