const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

global.appconfig = require('./src/appconfig');

global.app = app;

const files = fs.readdirSync(path.join(__dirname, 'src', 'controller'));
files.map((f) => {
    if(f.indexOf('.js') != -1){
        require(`./src/controller/${f}`);
    } 
});
app.listen(appconfig.listen, () => {
  delete global.app;
  console.log('Listening on %d', appconfig.listen);
});