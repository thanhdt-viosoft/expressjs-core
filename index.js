require('./declare');
require('./src/appconfig');
const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
global.app = app;

app.disable('etag');
app.disable('x-powered-by');

app.use(cors({
    exposedHeaders: ['token']
}));

app.use('/dist', express.static('web/dist'));

if(app.get('env') === 'production') {
    require('./env/production');
} else {
    require('./env/development');    
}

global.FileUpload = (config) => {
    return config;
}

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