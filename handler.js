const serverless = require('serverless-http');
const express = require('express');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const app = express();

const rateLimitConfig = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 100 requests per windowMs
});

const { Routes } = require('./src/routes');
const { originMiddleware } = require('./src/middlewares/origin');

app.use(express.json());
app.use(cors());

app.use(rateLimitConfig);

app.get('/', (req, res, next) => {
  return res.status(200).json({
    message: 'Hello from root!',
  });
});

app.get('/hello', (req, res, next) => {
  return res.status(200).json({
    message: 'Hello from path!',
  });
});

app.use('/api/services', originMiddleware, Routes);

app.use((req, res, next) => {
  return res.status(404).json({
    error: 'Not Found',
  });
});

app.listen(5440, () => {
  console.log('App Running on 5440');
});
// module.exports.handler = serverless(app);
