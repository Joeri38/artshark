import User from '../../../models/User'
import connectDb from '../../../middleware/mongoose'

// Jwt token
var jwt = require('jsonwebtoken');

const handler = async (req,res)=>{

    if (req.method == 'POST'){
        let token = req.body.token;
        let user = jwt.verify(token, process.env.JWT_SECRET);

        await User.findOneAndUpdate({email: user.email}, {firstname:req.body.firstname, lastname:req.body.lastname, streetAddress: req.body.streetAddress, city:req.body.city , zip: req.body.zip, phone: req.body.phone})

        res.status(200).json({ success: true , message: "Account updated!" })
    }
    else{
        res.status(400).json({ success: false , message: "No user found!" })
    }

}
export default connectDb(handler);