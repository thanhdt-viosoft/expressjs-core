const bodyParser = require('body-parser');
const _ = require('lodash');
const cast = require('./utils.cast');

exports = module.exports = {
  jsonHandler: (schema) => {
    return [bodyParser.json(), (req, res, next) => {
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
          } else {
            tmp[k] = req.body[k];
          }
        }
      }
      req.body = tmp;
      next();
    }];    
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
          image = null;
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