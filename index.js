const express = require('express');

const app = express();

const mainRouter = require('./Routes/mainRouter');

app.use('/api', mainRouter);

app.get('/', (req, res) => {
  res.status(200).json({ msg: 'Home' });
});
const startApp = () => {
  app.listen(5000, () => {
    console.log('Listening server on port 5000');
  });
};

startApp();
