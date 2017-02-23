const _ = require('lodash');
const httpService = require('./http.service');

/************************************
 ** SERVICE:      microService
 ** AUTHOR:       Unknown
 ** CREATED DATE: 2/7/2017, 3:31:14 PM
 *************************************/

exports = module.exports = {
    async checkAuthoriz(headers) {
        return await httpService.head(`${global.appconfig.auth.url}/authoriz`, {
            headers: headers
        })        
    },
    async updateConfig(auth, data) {
        const resp = await httpService.put(`${global.appconfig.auth.url}/project-config`, {
            headers: {
                token: auth.rawToken,
                path: '/project-config',
                actions: 'UPDATE_CONFIG'
            },
            data: data
        });
        return resp;
    },
    async getConfig(auth, pluginName) {
        const resp = await httpService.get(`${global.appconfig.auth.url}/project-config`, {
            headers: {
                token: auth.rawToken,
                path: '/project-config',
                actions: 'GET_CONFIG'
            },
            query: {
                plugin: pluginName
            }
        });
        if (resp.code === 200) return resp.body;
        throw resp.body;
    }
}