const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

// Database setup
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);
mongoose.connect(DB).then(() => {
  console.log('DB connection successful');
});
// START SERVER
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
