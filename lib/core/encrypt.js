exports = module.exports = {
  md5(str) {
    const crypto = require('crypto');
    return crypto.createHash('md5').update(str).digest("hex");
  },
  base64(str, isDecode) {
    if (!isDecode) return new Buffer(str).toString('base64');
    return Buffer.from(str, 'base64').toString('utf8');
  },
  decryptText(sf, hashSize) {
    sf = sf.replace(/\0/g, '=');
    sf = sf.split('');
    for (let i = 0; i < sf.length - 1; i += 2) {
      if(i >= hashSize) break;
      if (i + 1 < sf.length && sf[i] != '=' && sf[i + 1] != '=') {
        let tmp = sf[i];
        sf[i] = sf[i + 1];
        sf[i + 1] = tmp;
      }
    }
    sf = sf.join('');
    return Buffer.from(sf, 'hex').toString();
  },
  encryptText(data, hashSize) {
    if(data === null || data === undefined) return data;
    data = JSON.stringify(data);
    let sf = Buffer.from(data).toString('hex');
    sf = sf.split('');
    for (let i = 0; i < sf.length - 1; i += 2) {
      if(i >= hashSize) break;
      if (i + 1 < sf.length && sf[i] != '=' && sf[i + 1] != '=') {
        let tmp = sf[i];
        sf[i] = sf[i + 1];
        sf[i + 1] = tmp;
      }
    }
    sf = sf.join('').replace(/=/g, '\0');
    return sf;
  }
}