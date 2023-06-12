const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  
  orderId:{type: Number, required: true, default: Math.floor(Math.random() * Date.now()), unique: true},
  name:{type: String},
  email:{type: String, required: true},
  paymentId:{type: String, unique:true},
  amount:{type: Number, required: true},
  paymentStatus:{type: String, required: true},
  products:{type: Array, required: true},
  phone:{type: Number, required: true},
  city: {type: String, required: true},
  streetAddress: {type: String, required: true},
  country: {type: String, required: true},
  zip: {type: Number},
},{timestamps:true});

mongoose.models={}
export default mongoose.model("Order", OrderSchema);