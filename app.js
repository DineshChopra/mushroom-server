const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const customerRoutes = require("./routes/customer.route");
const productRoutes = require("./routes/product.route");
const stockRoutes = require("./routes/stock.route");

const app = express();
const mongoDB = 'mongodb://127.0.0.1:27017/mushroom';
mongoose.connect(mongoDB)
.then(
  () => {
    console.log('Connecting to the database -------- ');
  }
)
.catch( () => {
  console.log('Connection failed =========');
});

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  next();
});

app.use('/api/customers/', customerRoutes)
app.use('/api/products/', productRoutes)
app.use('/api/stocks/', stockRoutes)

module.exports = app;