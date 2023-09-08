const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstname:{type: String},
    lastname:{type: String},
    phone:{type: String},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    streetAddress: {type: String},
    city: {type: String},
    zip: {type: String},
  },{timestamps:true});
   

mongoose.models = {}
export default mongoose.model("User", UserSchema);