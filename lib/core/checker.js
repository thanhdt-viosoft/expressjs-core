const _ = require('lodash');

exports = module.exports = {
  is(params, type, fieldName) {
    if (type instanceof Array) {
      for (var e of type) {
        let msgs = [];
        try {
          exports.is(params, e, fieldName);
          return;
        } catch (e) {
          msgs.push(e.message);
        }
      }
      throw Error.create(Error.NOT_FOUND, msgs.join(' or '));
    } else {
      if (Number === type && isNaN(params) === true) throw Error.create(Error.NOT_FOUND, `${fieldName} must be Number type`);
      else if (Date === type && !(params instanceof Date)) throw Error.create(Error.NOT_FOUND, `${fieldName} must be Date type`);
      else if (Boolean === type && _.isBoolean(params) !== true) throw Error.create(Error.NOT_FOUND, `${fieldName} must be Boolean type`);
      else if (Array === type && _.isArray(params) !== true) throw Error.create(Error.NOT_FOUND, `${fieldName} 'must be Array type`);
      else if (Object === type && _.isPlainObject(params) !== true) throw Error.create(Error.NOT_FOUND, `${fieldName} 'must be Object type`);
      else if (String === type && _.isString(params) !== true) throw Error.create(Error.NOT_FOUND, `${fieldName} 'must be String type`);
    }
  },
  option(fieldName, value, type, fcDone) {
    if(!exports.has(value)) return;
    if (type) exports.is(value, type, fieldName);
    if(fcDone) fcDone(value);
  },
  must(fieldName, value, type, defaultValue) {
    let msg;
    if (!exports.has(value)) {
      if (exports.has(defaultValue)) value = defaultValue;
      else throw Error.create(Error.NOT_FOUND, `${fieldName} is required`);
    }
    if (type) exports.is(value, type, fieldName);
    return value;
  },
  has(value) {
    if (_.isNil(value) || (typeof value === 'string' && value.length === 0)) return false;
    return true;
  }
}