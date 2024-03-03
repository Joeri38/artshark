import User from '../../../models/User'
import connectDb from '../../../middleware/mongoose'
var jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

const handler = async (req,res)=>{
    if (req.method == 'POST'){
        let user = await User.findOne({"email": req.body.email})

        if (user){
            
            // Compare password to hash
            bcryptjs.compare(req.body.password, user.password)
            .then(correctPassword => {
                if(correctPassword){ 
                    let token = jwt.sign({ email:user.email, name:user.name}, process.env.JWT_SECRET);
                    res.status(200).json({ success: true, message: "Succesful log in!", token, email:user.email })
                } else {
                    res.status(400).json({ success: false, message: "Wrong password!" })
                
                }
            })
        }
        else{
            res.status(400).json({ success: "none" , message: "No account found!" })
        }
    }
}
export default connectDb(handler);