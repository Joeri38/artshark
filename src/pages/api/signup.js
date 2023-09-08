import User from '../../../models/User'
import connectDb from '../../../middleware/mongoose'
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

const handler = async (req,res)=>{

    if (req.method == 'POST'){
        let user = await User.findOne({"email": req.body.email})
        if (user){
            if (req.body.email === user.email){
                res.status(400).json({ success: false, message: "Already have an account!"})
                }
            }
        else{
            const {email} = req.body; // { .. } syntax takes value corresponding to key
            let newuser = new User( {email , password: CryptoJS.AES.encrypt(req.body.password, process.env.CRYPTOJS_SECRET).toString()});
            await newuser.save();
            let token = jwt.sign({ email: email, name: newuser.name}, process.env.JWT_SECRET);
            res.status(200).json({ success: true, message: "Account created!", token, email: email })
            }
        }
    }

export default connectDb(handler);