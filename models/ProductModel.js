const mongoose = require("mongoose")

const { model, Schema } = mongoose;

const productSchema = Schema({
  name: {
    type: String,
    required: [true, "Please enter a product name"]
  },
  quantity: {
    type: Number,
    required: true,
    default: 0
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  }
}, {
  timestamps: true
})


const Product = model("Product", productSchema)

module.exports = Product;