const morgan = require('morgan');
const express = require('express');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
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
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
