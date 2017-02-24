const express = require('express');
const compression = require('compression');
const app = express();
const appconfig = require('./config.js');

app.use(compression());
app.use('/', express.static('dist'));

app.listen(appconfig.listen, () => {
  console.log('Theme is listening on %d', appconfig.listen);
});