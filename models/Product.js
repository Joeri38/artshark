const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title:{type: String, required: true},
    desc: {type: String, required: true},
    img1: {type: String, required: true},
    img2: {type: String},
    img3: {type: String},
    category: {type: String, required: true},
    price: {type: Number, required: true},
    stripePriceId: {type: String, required: true, unique: true},
  },{timestamps:true});

mongoose.models = {};

export default mongoose.model("Product", ProductSchema);