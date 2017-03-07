module.exports = {
    UtilsService: ['$window', function($window) {
        return {
            throwError(err){
                err.msg = err.msg || err.data;
                $window.top.postMessage(JSON.stringify({type: 'ERROR', data: err}), '*');
            }
        }
    }],
    Project: ['$http', '$rootScope', '$config', '$window', '$location', 'UtilsService', function($http, $rootScope, $config, $window, $location, UtilsService) {
        return {
            initConfig(key) {
                return $http.post(`${$config.services[key]}/config`).catch(UtilsService.throwError);
            },
            updateConfig: (data) => {
                return $http.put(`${$config.services.oauth}/config`, data).catch(UtilsService.throwError);
            },
            get: () => {
                return $http.get(`${$config.services.oauth}/project`).catch(UtilsService.throwError);
            },
            add: (data) => {
                return $http.post(`${$config.services.oauth}/project`, data).catch(UtilsService.throwError);
            },
            update: (data) => {
                return $http.put(`${$config.services.oauth}/project`, data).catch(UtilsService.throwError);
            },
            getDetail(id) {
                return $http.get(`${$config.services.oauth}/project/${id}`).catch(UtilsService.throwError);
            },
            delete(id) {
                return $http.delete(`${$config.services.oauth}/project/${id}`).catch(UtilsService.throwError);
            }
        };
    }],
    Role: ['$http', '$rootScope', '$config', 'UtilsService', function($http, $rootScope, $config, UtilsService) {
        return {
            get: () => {
                return $http.get(`${$config.services.oauth}/role`).catch(UtilsService.throwError);
            },
            add: (data) => {
                return $http.post(`${$config.services.oauth}/role`, data).catch(UtilsService.throwError);
            },
            update: (data) => {
                return $http.put(`${$config.services.oauth}/role/${data._id}`, data).catch(UtilsService.throwError);
            },
            getDetail(id) {
                return $http.get(`${$config.services.oauth}/role/${id}`).catch(UtilsService.throwError);
            },
            delete(id) {
                return $http.delete(`${$config.services.oauth}/role/${id}`).catch(UtilsService.throwError);
            }
        };
    }],
    Account: ['$http', '$rootScope', '$config', 'UtilsService', 'md5', function($http, $rootScope, $config, UtilsService, md5) {
        return {
            get: () => {
                return $http.get(`${$config.services.oauth}/account`).catch(UtilsService.throwError);
            },
            login : (data, projectId) => {
                data = _.clone(data);
                data.password = md5.createHash(data.password);
                return $http.post(`${$config.services.oauth}/login`, data, {headers : {pj: projectId}}).catch(UtilsService.throwError);
            },
            logout(){
                return $http.post(`${$config.services.oauth}/logout`).catch(UtilsService.throwError);
            },
            add: (data) => {
                data = _.clone(data);
                data.password = md5.createHash(data.password);
                return $http.post(`${$config.services.oauth}/account`, data).catch(UtilsService.throwError);
            },
            author: (data) => {
                return $http.head(`${$config.services.oauth}/authoriz`, {headers : data}).catch(UtilsService.throwError);
            },
            ping: (data) => {
                return $http.head(`${$config.services.oauth}/ping`).catch(UtilsService.throwError);
            },
            update: (account) => {
                if(account.password) account = _.clone(account);
                account.password = md5.createHash(account.password);
                return $http.put(`${$config.services.oauth}/account/${account._id}`, account).catch(UtilsService.throwError);
            },
            getDetail(id) {
                return $http.get(`${$config.services.oauth}/account/${id}`).catch(UtilsService.throwError);
            },
            delete(id) {
                return $http.delete(`${$config.services.oauth}/account/${id}`).catch(UtilsService.throwError);
            }
        };
    }]
}