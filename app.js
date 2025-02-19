const fs = require("fs");
const express = require("express");

const app = express();

app.use(express.json());

const transactions = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data.json`)
);

app.get("/api/v1/transactions", (req, res) => {
  res.status(200).json({
    status: "success",
    results: transactions.length,
    data: {
      transactions,
    },
  });
});

app.get("/api/v1/transactions/:id", (req, res) => {
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
});

app.post("/api/v1/transactions", (req, res) => {
  // console.log(req.body);
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
});

app.patch("/api/v1/transactions/:id", (req, res) => {
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
});

app.delete("/api/v1/transactions/:id", (req, res) => {
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
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
