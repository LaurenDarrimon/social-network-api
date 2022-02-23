const path = require('path');
const express = require('express');
const db = require('./config/connection');

const routes = require('./controllers');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(routes);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());