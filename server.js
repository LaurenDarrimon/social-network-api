const path = require('path');
const express = require('express');
const db = require('./config/connection');

const routes = require('./controllers');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(routes);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  });