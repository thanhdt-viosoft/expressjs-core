const _ = require('lodash');

const db = require('./db');
const microService = require('./service/micro.service');

/************************************
 ** CLASS HELPER
 ** 
 *************************************/

exports = module.exports = _.extend(require('../lib/core/utils'), {
    authHandler(isAutoCheckInCache=false) {
        return async (req, res, next) => {
            if(!req.headers.token && !req.headers.secret_key) return next(Error.create(Error.AUTHEN));
            if(req.headers.token) {
                const [projectId, accountId, token] = req.headers.token.split('-');  
                if(!projectId || !accountId || !token) return next(Error.create(Error.AUTHEN));
                req.auth = {
                    projectId: db.uuid(projectId),
                    accountId: db.uuid(accountId),
                    secretToken: db.uuid(token)
                };
            }else {
                const accountService = require('./service/account.service');
                try {
                    const rawToken = await accountService.authBySecretKey(db.uuid(req.headers.secret_key));                
                    const [projectId, accountId, secretKey] = rawToken.split('-');        
                    req.auth = {
                        projectId: db.uuid(projectId),
                        accountId: db.uuid(accountId),
                        secretToken: db.uuid(secretKey)
                    };
                } catch(e){
                    return next(e);
                }
            }
            if(isAutoCheckInCache){
                const accountService = require('./service/account.service');
                const cacheService = require('./service/cached.service');
                let user = await accountService.getCached(req.auth.secretToken);
                if(!user) return next(Error.create(Error.EXPIRED));
            }
            next();
        };
    },
    auth(pathCode, ...actions){
        return async (req, res, next) => {
            try {
                if(!req.headers.token && !req.headers.secret_key) throw Error.create(Error.AUTHEN);
                let headers = {                
                    path: pathCode,
                    actions: actions.join(',')
                };
                if(req.headers.token) headers.token = req.headers.token;
                else if(req.headers.secret_key) headers.secret_key = req.headers.secret_key;
                const resp = await microService.checkAuthoriz(headers);
                if(resp.code !== 200) return next(Error.create(resp.code, resp.body));
                const token = resp.headers.token.split('-');
                req.auth = {
                    projectId: db.uuid(token[0]),
                    accountId: db.uuid(token[1]),
                    token: db.uuid(token[2]),
                    rawToken: resp.headers.token
                };
                next();
            }catch(e){
                next(e);
            }
        };
    }
});