const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title:{type: String, default: 'no title'},
    desc: {type: String, required: true},
    img: {type: String, required: true},
    series: {type: Number, default: -1},
    price: {type: Number, default: 35},
    stripePriceId: {type: String, default: 'price_1NL5edBIDAiFaigFzqaKakWB'},
  },{timestamps:true});

mongoose.models = {};

export default mongoose.model("Product", ProductSchema);