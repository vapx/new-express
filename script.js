const mongoose = require("mongoose")
const express = require("express")
const User = require("./User")
const Product = require("./models/ProductModel")

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World")
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get("/products", async (req, res) => {
  try {
    const productData = await Product.find({})
    res.status(200).json(productData)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findById(id)
    res.status(200).json(product)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

app.post("/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product)
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ message: err.message })
  }
})

app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) { res.status(404).json({ message: "We cannot fidn any product with ID" }) }

    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      res.status(400).json({ message: "Cannot find product with this id" })
    }
    res.status(200).json(product)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

mongoose.connect("mongodb+srv://edmonexpress:123edmon@cluster0.xsbgvsc.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    app.listen(3001, () => {
      console.log(`Listening to port 3001`)
    })
    console.log("Connected to DB")
  })
  .catch((err) => console.log(err))


