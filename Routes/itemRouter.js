const { Router } = require('express');

const itemRouter = new Router();

itemRouter.get('/', (req, res) => {
  res.status(200).json();
});

itemRouter.get('/get-items', (req, res) => {
  res.status(200).json({ items: 'items' });
});

module.exports = itemRouter;
