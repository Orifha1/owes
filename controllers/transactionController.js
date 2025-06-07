const Transaction = require('./../models/transactionModel');

/**
 * Gets all the transactions.
 */
exports.getAllTransactions = async (req, res) => {
  try {
    // BUILD THE QUERY
    // Filtering
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Transaction.find(JSON.parse(queryStr));

    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    //Field limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    // Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const numTransactions = await Transaction.countDocuments();
      if (skip >= numTransactions) {
        throw new Error('This page does not exist');
      }
    }

    // EXECUTE THE QUERY
    const transactions = await query;

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
