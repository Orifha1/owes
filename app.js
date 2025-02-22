const morgan = require('morgan');
const express = require('express');
const transactionRouter = require('./routes/transactionsRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

// ROUTES
app.use('/api/v1/transactions', transactionRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
