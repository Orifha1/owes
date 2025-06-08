const Transaction = require('./../models/transactionModel');
const APIFeatues = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');

/**
 * Gets all the transactions.
 */
exports.getAllTransactions = catchAsync(async (req, res, next) => {
  const features = new APIFeatues(Transaction.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  // EXECUTE THE QUERY
  const transactions = await features.query;

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: transactions.length,
    data: {
      transactions,
    },
  });
});

/**
 * Gets a specific transaction
 */
exports.getTransaction = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const transaction = await Transaction.findById(id);
  res.status(200).json({
    status: 'success',
    data: {
      transaction,
    },
  });
});

/**
 * Creates the user transaction that will be shared by ythe users.
 */
exports.createTransaction = catchAsync(async (req, res, next) => {
  const newTransaction = await Transaction.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      transaction: newTransaction,
    },
  });
});

/**
 * Updates the trancaction.
 */
exports.updateTransaction = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const updatedTransaction = await Transaction.findByIdAndUpdate(id, req.body, {
    new: true, // return newly updated transaction.
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    data: {
      transaction: updatedTransaction,
    },
  });
});

/**
 * Deletes a specific transaction.
 */
exports.deleteTransaction = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  await Transaction.findByIdAndDelete(id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getTransactionsStats = catchAsync(async (req, res, next) => {
  const stats = await Transaction.aggregate([
    {
      $match: {
        amount: { $gte: 1 },
      },
    },
    {
      $group: {
        _id: '$createdAt',
        numTransactions: {
          $sum: 1,
        },
        numAmount: {
          $sum: '$amount',
        },
        avgAmount: {
          $avg: '$amount',
        },
        minAmount: {
          $min: '$amount',
        },
        maxAmount: {
          $max: '$amount',
        },
      },
    },
    {
      $sort: {
        avgAmount: 1,
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    stats,
  });
});
