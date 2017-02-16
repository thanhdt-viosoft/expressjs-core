exports = module.exports = {
  md5(str) {
    const crypto = require('crypto');
    return crypto.createHash('md5').update(str).digest("hex");
  },
  base64(str, isDecode) {
    if (!isDecode) return new Buffer(str).toString('base64');
    return Buffer.from(str, 'base64').toString('utf8');
  }
}