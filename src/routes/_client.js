const express = require('./index');

express.router.get('/client', (req, res) => {
  res.send('HELLO');
});

module.exports = express.router;