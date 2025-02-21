const fs = require("fs");
const morgan = require("morgan");
const express = require("express");

const app = express();

// MIDDLEWARES
app.use(morgan("dev"));
app.use(express.json());

const transactions = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data.json`)
);

// ROUTE HANDLERS
const getAllTransactions = (req, res) => {
  res.status(200).json({
    status: "success",
    results: transactions.length,
    data: {
      transactions,
    },
  });
};

const getTransaction = (req, res) => {
  const id = req.params.id * 1;
  const transaction = transactions.find((el) => el.id === id);
  if (!transaction) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      transaction,
    },
  });
};

const createTransaction = (req, res) => {
  const newId = transactions[transactions.length - 1].id + 1;

  const newTransaction = Object.assign({ id: newId }, req.body);

  transactions.push(newTransaction);
  fs.writeFile(
    `${__dirname}/dev-data/data.json`,
    JSON.stringify(transactions),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          transaction: newTransaction,
        },
      });
    }
  );
};

const updateTransaction = (req, res) => {
  if (req.params.id * 1 > transactions.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      transaction: "<updated transaction here>",
    },
  });
};

const deleteTransaction = (req, res) => {
  if (req.params.id * 1 > transactions.length) {
    return res.status(404).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
};

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined",
  });
};
const createUsers = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined",
  });
};
const getUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined",
  });
};
const updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined",
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined",
  });
};

// ROUTES
const transactionRouter = express.Router();
const userRouter = express.Router();

transactionRouter.route("/").get(getAllTransactions).post(createTransaction);

transactionRouter
  .route("/:id")
  .get(getTransaction)
  .patch(updateTransaction)
  .delete(deleteTransaction);

userRouter.route("/").get(getAllUsers).post(createUsers);
userRouter.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

app.use("/api/v1/transactions", transactionRouter);
app.use("/api/v1/users", userRouter);

// START SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
