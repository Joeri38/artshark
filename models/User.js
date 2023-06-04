const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstname:{type: String, required: true},
    lastname:{type: String, required: true},
    phoneno:{type: Number, default: 0 },
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    streetAddress: {type: String, default: ''},
    state: { type: String, default: ''},
    zip: { type: Number, default: 0 },

  },{timestamps:true});
   

mongoose.models = {}
export default mongoose.model("User", UserSchema);