const path = require('path');
const uuid = require('node-uuid');
const _ = require('lodash');

/************************************
 ** CLASS HELPER
 ** 
 *************************************/

exports = module.exports = _.extend(require('./utils.cast.js'), require('./utils.body.handler'), {
  Uuid: String,
  uuid() {
    return uuid.v4();
  },
  
  // fileUploadHandler(config) {
  //     let baseConfig = {
  //         uploadDir: "assets/upload/",
  //         httpPath: "/upload/${filename}",
  //         keepName: false,
  //         resize: undefined,
  //         mapFiles: false,
  //         mapParams: false,
  //         keepExtensions: false,
  //         multiples: false,
  //         multipartFileHandler(part, req) {
  //             const defaultConfig = _.clone(config[part.name]);
  //             const filename = exports.uuid() + (part.filename.indexOf('.') !== -1 ? part.filename.substr(part.filename.lastIndexOf('.')) : '');
  //             try {
  //                 defaultConfig.uploadDir = eval(defaultConfig.uploadDir);    
  //             } catch (e) {}
  //             try {
  //                 defaultConfig.httpPath = eval(defaultConfig.httpPath);    
  //             } catch (e) {}
  //             const fileout = path.join(defaultConfig.uploadDir, filename);
  //             let buf = new Buffer(0);
  //             part.on('data', (data) => {
  //                 buf = Buffer.concat([buf, data]);
  //             })
  //             part.on('end', async () => {
  //                 const fs = require('fs-path');
  //                 fs.writeFileSync(fileout, buf, 'binary');
  //                 if (!req.file[part.name]) req.file[part.name] = defaultConfig.multiples ? [] : {};
  //                 if(defaultConfig.keepName) {                        
  //                     if (req.file[part.name] instanceof Array) {
  //                         req.file[part.name].push({
  //                             name: part.filename.substr(0, part.filename.lastIndexOf('.')),
  //                             path: defaultConfig.httpPath
  //                         });
  //                     } else {
  //                         req.file[part.name] = {
  //                             name: part.filename.substr(0, part.filename.lastIndexOf('.')),
  //                             path: defaultConfig.httpPath
  //                         };
  //                     }
  //                 }else {
  //                     if (req.file[part.name] instanceof Array) req.file[part.name].push(defaultConfig.httpPath.replace('${filename}', filename));
  //                     else req.file[part.name] = defaultConfig.httpPath;
  //                 }
  //                 if (defaultConfig.resize) {
  //                     try {
  //                         let rs = await exports.resizeImage({
  //                             buf: fileout,
  //                             file: fileout
  //                         }, defaultConfig.resize);
  //                         // Done
  //                     } catch (err) {
  //                         exports.deleteFile(fileout, defaultConfig.resize);
  //                         console.error('RESIZE', err);
  //                     }
  //                 }
  //             });
  //             // stream.on('close', async() => {
  //             //     if (defaultConfig.resize) {
  //             //         try {
  //             //             let rs = await exports.resizeImage({
  //             //                 buf: fileout,
  //             //                 file: fileout
  //             //             }, defaultConfig.resize);
  //             //             // Done
  //             //         } catch (err) {
  //             //             exports.deleteFile(fileout, defaultConfig.resize);
  //             //             console.error('RESIZE', err);
  //             //         }
  //             //     }
  //             // });
  //             // part.pipe(stream);
  //         }
  //     };
  //     if (config instanceof Object) {
  //         baseConfig = _.extend(baseConfig, config[Object.keys(config)[0]]);
  //         if (baseConfig.uploadDir) baseConfig.uploadDir = path.join(__dirname, '..', '..', baseConfig.uploadDir);
  //     } else {
  //         baseConfig.uploadDir = path.join(__dirname, '..', '..', config);
  //     }
  //     // return [(req, res, next) => {
  //     //     if (!req.file) req.file = {};
  //     //     next();

  //     // }, ...restify.bodyParser(baseConfig)];
  // },
  getAbsoluteUpload(files, rootPath) {
    if (!files) return files;
    this.getPath = (f) => {
      return path.join(rootPath, f.substr(f.lastIndexOf('/') + 1));
    };
    if (!(files instanceof Array)) {
      return this.getPath(files);
    }
    return files.map((f) => {
      return this.getPath(f);
    });

  },
  deleteFile(files, sizes) {
    if (!files) return;
    const remove = (f, sizes) => {
      try {
        const fs = require('fs-path');
        fs.statSync(f);
        fs.unlinkSync(f);
      } catch (e) { /*File was removed before that*/ }
      if (sizes) {
        sizes.forEach((s) => {
          remove(f.substr(0, f.lastIndexOf('.')) + '.' + s.ext + f.substr(f.lastIndexOf('.')));
        });
      }
    };
    if (!(files instanceof Array)) {
      return remove(files, sizes);
    }
    files.forEach((f) => {
      remove(f, sizes);
    });
  },
  md5(str) {
    const crypto = require('crypto');
    return crypto.createHash('md5').update(str).digest("hex");
  },
  base64(str, isDecode) {
    if (!isDecode) return new Buffer(str).toString('base64');
    return Buffer.from(str, 'base64').toString('utf8');
  }
});