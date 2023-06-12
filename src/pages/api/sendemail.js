import Forgot from "../../../models/Forgot"
import connectDb from '../../../middleware/mongoose'

var jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')


const handler = async (req,res)=>{
    let company = process.env.NEXT_PUBLIC_HOST;
    const email = req.body.email;


    const token = jwt.sign({ email }, process.env.JWT_SECRET);
    // To save data in database
    const forgot= new Forgot({
      email: email,
      token: token,
    });
    await forgot.save();


    // To delete token data from database
    // this function executes after 10 min and delete the token from database
    setTimeout(async() => {
      await Forgot.deleteOne({token});
    }, 50000);


    let message = `Hello ${email},

Somebody requested a new password for the ${company} account associated with ${email}.
    
No changes have been made to your account yet.
    
You can reset your password by clicking the link below:
<a href="http://${company}/forgot?token=${token}" target="_blank"></a>


If you did not request a new password, please let us know immediately by replying to this email.
    
Yours,
The ${company} team`
    

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
        let mailData = {
          from: `${process.env.EMAIL}`,
          to: `${email}`,
          subject: `Password Rest Instructions by ${company}`,
          text: `${message}`,
        };
        transporter.sendMail(mailData, function (err,info){
          if (!err) {
              return res.status(200).json({ success: true, token: token, message: `Email Sent!`})
            }
            if (err) {
                return res.status(400).json({ success: false, message: "Some Error Occured!"})
            }
        })
    }
    
  else{
        return res.status(400).json({ success: false, message: "Some Error Occured!"})
    }

  }

export default connectDb(handler);