const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');

const customerRoutes = require("./routes/customer/customer.route");
const productRoutes = require("./routes/product/product.route");
const stockRoutes = require("./routes/stock/stock.route");
const saleRoutes = require("./routes/sale/sale.route");
const userRoutes = require("./routes/user/user.route");

const app = express();
const mongoDB = 'mongodb://127.0.0.1:27017/mushroom';

mongoose.connect(mongoDB)
.then(
  () => {
    console.log('Connecting to the database --------- ');
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
  // if(req.method === 'OPTIONS') {
  //   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  //   res.status(200).json({});
  // }
  next();
});

app.use(morgan('dev'));
app.use('/api/customers/', customerRoutes)
app.use('/api/products/', productRoutes)
app.use('/api/stocks/', stockRoutes)
app.use('/api/sales/', saleRoutes)
app.use('/api/users/', userRoutes)

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message || 'Server Error'
    }
  });
});
module.exports = app;