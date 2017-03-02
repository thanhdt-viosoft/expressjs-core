const _ = require('lodash');
const httpService = require('./http.service');

/************************************
 ** SERVICE:      microService
 ** AUTHOR:       Unknown
 ** CREATED DATE: 2/7/2017, 3:31:14 PM
 *************************************/

exports = module.exports = {
    async checkAuthoriz(headers) {
        return await httpService.head(`${global.appconfig.services.auth}/authoriz`, {
            headers: headers
        })        
    },
    async updateConfig(auth, data) {
        const resp = await httpService.put(`${global.appconfig.services.auth}/config`, {
            headers: {
                token: auth.rawToken,
                path: '/config',
                actions: 'UPDATE'
            },
            data: data
        });
        return resp.body;
    },
    async getConfig(auth, pluginName) {
        const resp = await httpService.get(`${global.appconfig.services.auth}/config`, {
            headers: {
                token: auth.rawToken,
                path: '/config',
                actions: 'GET'
            },
            query: {
                plugin: pluginName
            }
        });
        if (resp.code === 200) return resp.body;
        throw resp.body;
    }
}