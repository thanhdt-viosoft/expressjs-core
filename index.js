require('./declare');
require('./src/appconfig');
const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const bodyHandler = require('./src/body.handler');

const app = express();
global.app = app;

app.disable('etag');
app.disable('x-powered-by');

if(app.get('env') === 'production') {
    require('./env/production');
} else {
    require('./env/development');    
}

app.use(cors());

global.FileUpload = (config) => {
    return config;
}

app.use(bodyHandler.encrypt(6));

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
  console.log('Listening on %d', appconfig.listen);
});