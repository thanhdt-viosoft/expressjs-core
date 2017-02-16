const bodyParser = require('body-parser');
const uuid = require('node-uuid');
const _ = require('lodash');
const cast = require('./cast');
const db = require('./db.mongo');

exports = module.exports = {
  fileHandler: (schema) => {
    const multer = require('multer');
    const path = require('path');
    let files = [];
    for(var k in schema){
      if(typeof schema[k] === 'object'){
        files.push({name: k, maxCount: schema[k].maxCount});
      }
    }
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {        
        let pathUpload = req.custom.schema[file.fieldname].saveTo;
        if(!pathUpload.includes('`')){
          pathUpload = path.join(__dirname, '..', '..', pathUpload);
        } else {
          pathUpload = path.join(__dirname, '..', '..', eval(pathUpload));
          const fsPath = require('fs-path');
          fsPath.mkdirSync(pathUpload);
        }       
        cb(null, pathUpload);
      },
      filename: function (req, file, cb) {
        cb(null, uuid.v4() + file.originalname.substr(file.originalname.lastIndexOf('.')));
      }
    });
    const upload = multer({ storage: storage });
    return [(req, res, next) => {
      req.custom = {schema};
      upload.fields(files)(req, res, next);
    }, exports.validateBodyHandler(schema)];
  },
  formHandler: (schema) => {
    if(!schema) return bodyParser.urlencoded({ extended: false });
    return [bodyParser.urlencoded({ extended: false }), exports.validateBodyHandler(shema)];
  },  
  jsonHandler: (schema) => {
    if(!schema) return bodyParser.json();
    return [bodyParser.json(), exports.validateBodyHandler(schema)];    
  },
  validateBodyHandler(schema){
    return async (req, res, next) => {
      const tmp = {};
      for(let k in schema) {
        if(!_.isNil(req.body[k])) {
          if(schema[k] === String) {
            tmp[k] = req.body[k].toString();
          } else if(schema[k] === Number) {
            tmp[k] = +req.body[k];
          } else if(schema[k] === Object || schema[k] === Array) {
            tmp[k] = cast.object(req.body[k]);
          } else if(schema[k] === Boolean) {
            tmp[k] = cast.boolean(req.body[k]);
          } else if(schema[k] === Date) {
            tmp[k] = cast.date(req.body[k]);
          } else if(schema[k] === db.Uuid) {
            tmp[k] = db.uuid(req.body[k]);
          } else {
            tmp[k] = req.body[k];
          }
        } else if(!_.isNil(req.files) && !_.isNil(req.files[k])) {
          tmp[k] = req.files[k];
          if(tmp[k]) {
            for(var i in tmp[k]) {
              let filename = tmp[k][i].filename;
              tmp[k][i].filename = eval(schema[k].returnPath);
              // resize image
              if(schema[k].resize) await exports.resizeImage({buf: tmp[k][i].path, file: tmp[k][i].path}, schema[k].resize);
              if(!schema[k].isFull) tmp[k][i] = tmp[k][i].filename;
            }            
            if(schema[k].maxCount === 1) tmp[k] = tmp[k][0];
          }
        }
      }
      req.body = tmp;
      next();
    }
  },
  resizeImage({
    buf,
    file
  }, sizes) {
    return new Promise(async(resolve, reject) => {
      try {
        const Jimp = require('jimp');
        if (!(sizes instanceof Array)) sizes = [sizes];
        const resize = sizes.map(async(size) => {
          if (!size.w && !size.h) throw 'Need enter size to resize image';
          const fileout = file.substr(0, file.lastIndexOf('.')) + (size.ext ? ('.' + size.ext) : '') + file.substr(file.lastIndexOf('.'));
          let image = await Jimp.read(buf);
          if (size.h < 0) {
            size.h = Math.abs(size.h);
            size.h = image.bitmap.height > size.h ? size.h : image.bitmap.height;
          }
          if (size.w < 0) {
            size.w = Math.abs(size.w);
            size.w = image.bitmap.width > size.w ? size.w : image.bitmap.width;
          }
          if (!size.w) size.w = size.h * image.bitmap.width / image.bitmap.height;
          if (!size.h) size.h = size.w * image.bitmap.height / image.bitmap.width;
          if (size.ratio) {
            size.w *= size.ratio;
            size.h *= size.ratio;
          }
          image = await image.cover(size.w, size.h).quality(size.quality || 100).write(fileout);
          // image = null;
          return fileout;
        });
        const rs = await Promise.all(resize);
        resolve(rs);
      } catch (err) {
        reject(err);
      }
    });
  }
}