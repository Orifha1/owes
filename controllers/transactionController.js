const fs = require('fs');

const transactions = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data.json`),
);

exports.checkID = (req, res, next) => {
  if (req.params.id * 1 > transactions.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};

exports.getAllTransactions = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: transactions.length,
    data: {
      transactions,
    },
  });
};

exports.getTransaction = (req, res) => {
  const id = req.params.id * 1;
  const transaction = transactions.find((el) => el.id === id);
  if (!transaction) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      transaction,
    },
  });
};

exports.createTransaction = (req, res) => {
  const newId = transactions[transactions.length - 1].id + 1;

  const newTransaction = Object.assign({ id: newId }, req.body);

  transactions.push(newTransaction);
  fs.writeFile(
    `${__dirname}/dev-data/data.json`,
    JSON.stringify(transactions),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          transaction: newTransaction,
        },
      });
    },
  );
};

exports.updateTransaction = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      transaction: '<updated transaction here>',
    },
  });
};

exports.deleteTransaction = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
