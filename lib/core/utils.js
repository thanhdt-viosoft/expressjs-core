const _ = require('lodash');

/************************************
 ** CLASS HELPER
 ** 
 *************************************/

exports = module.exports = {
  Uuid: String,
  uuid() {
    const uuid = require('uuid');
    return uuid.v4();
  },
  getAbsoluteUpload(files, rootPath) {
    if (!files) return files;
    const path = require('path');
    this.getPath = (f) => {
      return path.join(__dirname, '..', '..', rootPath, f.substr(f.lastIndexOf('/') + 1));
    };
    if (!(files instanceof Array)) {
      return this.getPath(files);
    }
    return files.map((f) => {
      return this.getPath(f);
    });

  },
  deleteFiles(files, sizes) {
    if (!files) return;
    const fs = require('fs');
    const remove = (f, sizes) => {
      try {        
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
  }
}