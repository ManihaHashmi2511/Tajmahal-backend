const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim : true
    },
    brand:{
        type: String,
        required: true,
    },
    type:{
        type: String,
        required: true,
        enum: ["Candies", "Chocolates", "Bubble Gums", "Lollipops", "Toffees", "Chews", "Chews & Toffees", "Others", "CC Sticks"],
    },
    imageUrl:{
        type: String,
        required: true
    },
    
},
{ timestamps: true }
);


module.exports = mongoose.model("Product", ProductSchema);