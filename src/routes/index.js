const express = require('express');
const AppController = require('../controllers/AppController');
const Routes = express.Router();

Routes.post('/validate-email', AppController.validateEmailAddress);

module.exports = {
  Routes,
};
