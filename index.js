const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors')

const app = express();

app.use(cors());
// app.options('*', cors())

Error.BAD_REQUEST = 400;
Error.NOT_FOUND = 404;
Error.EXPIRED = 440;
Error.AUTHEN = 401;
Error.AUTHORIZ = 403;
Error.INTERNAL = 500;
Error.CONDITION = 412;
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
  require('./src/service/_startup.js');
  console.log('Listening on %d', appconfig.listen);
});