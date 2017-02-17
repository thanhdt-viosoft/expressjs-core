require('./declare');
require('./src/appconfig');
const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();

app.disable('etag');
app.disable('x-powered-by');

app.use(cors({
    exposedHeaders: ['token']
}));

global.FileUpload = (config) => {
    return config;
}

global.app = app;

const files = fs.readdirSync(path.join(__dirname, 'src', 'controller'));
files.map((f) => {
    if(f.indexOf('.js') != -1){
        require(`./src/controller/${f}`);
    } 
});
app.use((err, req, res, next) => {
    res.status(err.status || 500).send(err.message);
});

app.listen(appconfig.listen, () => {
  delete global.app;
  require('./src/service/_startup');
  console.log('Listening on %d', appconfig.listen);
});