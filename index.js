const express = require('express');
const db = require('./db');

const app = express();

const mainRouter = require('./Routes/mainRouter');

app.use('/api', mainRouter);

app.get('/', (req, res) => {
  res.status(200).json({ msg: 'Home' });
});
const startApp = async () => {
  db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch((err) => console.log('Error ', err));

  app.listen(5000, () => {
    console.log('Listening server on port 5000');
  });
};

startApp();
