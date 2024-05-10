const express = require('express');
const path = require('path');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const app = express();

const limiter = rateLimit({
  windowMs: 30 * 1000, // 30 seconds
  max: 50 // limit of requests per windowMs
});

if (process.env.SERVER_SECURITY === 'TRUE') {
  console.log('---[Request limit enabled]---');
  app.use(limiter); // request limit
}

app.use(morgan('dev')); // enable logs
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3004;

app.listen(PORT, () => {
  console.log(`Server on http://localhost:${PORT}`);
});
