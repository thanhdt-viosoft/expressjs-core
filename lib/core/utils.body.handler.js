const bodyParser = require('body-parser');
const _ = require('lodash');

exports = module.exports = {
  jsonHandler: (config, fields) => {
    let mid = [bodyParser.json(config)];
    if(fields && fields.length > 0) {
      mid.push((req, res, next) => {
        const tmp = {};
        for(let k of fields) {
          if(!_.isNil(req.body[k])) tmp[k] = req.body[k];
        }
        req.body = tmp;
        next();
      });
    }
    return mid;
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