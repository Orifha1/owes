const mongoose = require('mongoose');
const validator = require('validator');
const transactionSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'A transaction must have a title'],
  },
  amount: {
    type: Number,
    required: [true, 'A transaction must have an amount'],
    // TODO: Check if this is a valid currency.
  },
  notes: {
    type: String,
    default: 'N/A',
    trim: true,
  },
  agreed: {
    type: Boolean,
    default: false,
  },
  declinedByBorrower: {
    type: Boolean,
    default: false,
  },
  declinedByLender: {
    type: Boolean,
    default: false,
  },
  currency: {
    type: String,
    default: 'ZAR',
    // TODO: Check if this is a valid currency.
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  repaymentDueDate: {
    type: Date,
  },
  agreementTimestamp: {
    type: Date,
  },
  repaymentStatus: {
    type: String,
  },
  reminderSent: {
    type: Boolean,
    default: false,
  },
  returnConfirmedByLender: {
    type: Boolean,
    default: false,
  },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
