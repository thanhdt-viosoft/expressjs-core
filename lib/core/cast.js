const _ = require('lodash');

exports = module.exports = {
  date(date) {
    if (exports.has(date) !== true || date instanceof Date) return date;
    return new Date(date);
  },
  boolean(bol) {
    if (!bol) return false;
    if (bol === true) return bol;
    return bol.toString().toLowerCase() === 'true';
  },
  object(object) {
    if (_.isNil(object)) return object;
    if (typeof object === 'string') {
      object = JSON.parse(object);
    }
    _.forOwn(object, (props, fieldName) => {
      if (typeof props === 'object') {
        object[fieldName] = exports.object(object[fieldName]);
      } else if (typeof props === 'string' && /^\d{4}-\d{1,2}-\d{1,2}T\d{1,2}:\d{1,2}:\d{1,2}\.\d{1,3}Z$/.test(props)) {
        object[fieldName] = exports.date(object[fieldName]);
      }
    });
    return object;
  }
}