const mongoose = require('mongoose');
const transactionSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'A transaction must have a title'],
  },
  amount: {
    type: Number,
    required: [true, 'A transaction must have an amount'],
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
