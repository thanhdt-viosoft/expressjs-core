const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

Error.create = (code, msg) => {
    let err = new Error(msg);
    err.status = code;
    return err;
};

global.FileUpload = (config) => {
    return config;
}

global.appconfig = require('./src/appconfig');

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
  console.log('Listening on %d', appconfig.listen);
});