const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    orderId:{type: Number, required: true, default: Math.floor(Math.random() * Date.now()), unique: true},
    Firstname:{type: String},
    lastname:{type: String },
    email:{type: String, required: true},
    phoneno:{type: Number, required: true},
    cardHolder:{type: String, required: true},
    cardNumber:{type: Number, required: true},
    cardExpiry:{type: Number, required: true},
    cardCvc:{type: Number, required: true},
    products:{type: Object, required: true},
    amount:{type: Number, required: true},
    streetAddress: {type: String, required: true},
    state: {type: String, required: true},
    zip: {type: Number, required: true},
  },{timestamps:true});

mongoose.models={}
export default mongoose.model("Order", OrderSchema);