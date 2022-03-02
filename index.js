const express = require('express');
const app = express();
const db = require('./db');

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// const swaggerOptions = {
//   swaggerDefinition: {
//     info: {
//       title: 'Delivery backend',
//       description: 'simple delivery backend',
//       contact: {
//         name: 'Ivan Seagull',
//       },
//       servers: ['http://localhost:5000'],
//     },
//   },
//   apis: [
//     // 'index.js',
//     // '.Routes/userRouter.js',
//     // '.Routes/categoryRouter.js',
//     // '.Routes/productRouter.js',
//   ],
// };
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Delivery backend',
      version: '1.0.0',
      description: 'simple delivery backend',
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
  },
  apis: ['./Routes/*.js', 'index.js'],
};

const swaggerDocs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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
