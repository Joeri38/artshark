import User from '../../../models/User'
import connectDb from '../../../middleware/mongoose'
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

const handler = async (req,res)=>{
    if (req.method == 'POST'){
        let user = await User.findOne({"email": req.body.email})

        if (user){
            // Decryptossword
            let bytes  = CryptoJS.AES.decrypt(user.password, process.env.CRYPTOJS_SECRET);
            let encryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
            if (req.body.email === user.email && req.body.password === encryptedPassword){
                let token = jwt.sign({ email:user.email, name:user.name}, process.env.JWT_SECRET);
                res.status(200).json({ success: true, message: "Succesful log in!", token, email:user.email })
            }
            else{
                res.status(400).json({ success: false, message: "Wrong password!" })
            }
        }
        else{
            res.status(400).json({ success: "none" , message: "No account found!" })
        }
    }
}
export default connectDb(handler);