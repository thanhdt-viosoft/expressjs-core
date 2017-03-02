const _ = require('lodash');

const db = require('./db');
const microService = require('./service/micro.service');

/************************************
 ** CLASS HELPER
 ** 
 *************************************/

exports = module.exports = _.extend(require('../lib/core/utils'), {
    // auth(pathCode, ...actions){
    //     return async (req, res, next) => {
    //         try {
    //             next();
    //         }catch(e){
    //             next(e);
    //         }
    //     };
    // }
});