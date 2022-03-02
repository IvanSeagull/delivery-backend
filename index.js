const express = require('express');
const app = express();
const db = require('./db');

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDoc = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(express.json());

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
