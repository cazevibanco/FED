// server.js (or your main server file)
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/orders', { useNewUrlParser: true, useUnifiedTopology: true });

const orderSchema = new mongoose.Schema({
  name: String,
  email: String,
  product: String,
  quantity: Number,
  price: Number,
});

const Order = mongoose.model('Order', orderSchema);

app.post('/api/orders', async (req, res) => {
  const { name, email, product, quantity, price } = req.body;
  const newOrder = new Order({ name, email, product, quantity, price });
  try {
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Error saving order', error });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});