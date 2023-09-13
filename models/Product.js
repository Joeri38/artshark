const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title:{type: String, default: 'no title'},
    desc: {type: String, required: true},
    img: {type: String, required: true},
    price: {type: Number, default: 40},
    stripePriceId: {type: String, default: 'price_1NL5edBIDAiFaigFzqaKakWB'},
  },{timestamps:true});

mongoose.models = {};

export default mongoose.model("Product", ProductSchema);