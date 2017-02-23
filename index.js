const express = require('express');
const app = express();
const port = 9599;

app.use('/', express.static('dist'));

app.listen(port, () => {
  console.log('Theme is listening on %d', port);
});