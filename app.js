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

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
