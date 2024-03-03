import User from '../../../models/User'
import connectDb from '../../../middleware/mongoose'
var jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

const handler = async (req,res)=>{

    if (req.method == 'POST'){

        let user = await User.findOne({"email": req.body.email})

        // User already exists
        if (user){
            if (req.body.email === user.email){
                res.status(400).json({ success: false, message: "Already have an account!"})
            }
        }

        // Hash password and add user to database
        else{
            const {email} = req.body; // { .. } syntax takes value corresponding to key
            const numSaltRounds = 8;
            bcryptjs.hash(req.body.password, numSaltRounds)
            .then(hash => {
                let newuser = new User( {email , password: hash});
                newuser.save();
                let token = jwt.sign({ email: email, name: newuser.name}, process.env.JWT_SECRET);
                res.status(200).json({ success: true, message: "Account created!", token, email: email })
            })
        }
    }
}

export default connectDb(handler);