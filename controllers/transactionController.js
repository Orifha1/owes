const Transaction = require('./../models/transactionModel');
const APIFeatues = require('./../utils/apiFeatures');

/**
 * Gets all the transactions.
 */
exports.getAllTransactions = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

/**
 * Gets a specific transaction
 */
exports.getTransaction = async (req, res) => {
  const id = req.params.id;

  try {
    const transaction = await Transaction.findById(id);
    res.status(200).json({
      status: 'success',
      data: {
        transaction,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

/**
 * Creates the user transaction that will be shared by ythe users.
 */
exports.createTransaction = async (req, res) => {
  try {
    const newTransaction = await Transaction.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        transaction: newTransaction,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

/**
 * Updates the trancaction.
 */
exports.updateTransaction = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true, // return newly updated transaction.
        runValidators: true,
      },
    );
    res.status(200).json({
      status: 'success',
      data: {
        transaction: updatedTransaction,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

/**
 * Deletes a specific transaction.
 */
exports.deleteTransaction = async (req, res) => {
  try {
    const id = req.params.id;
    await Transaction.findByIdAndDelete(id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};
