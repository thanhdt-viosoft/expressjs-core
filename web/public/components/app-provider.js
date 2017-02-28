module.exports = {
    UtilsService: ['$window', function($window) {
        return {
            throwError(err){
                err.msg = err.msg || err.data;
                $window.top.postMessage(JSON.stringify(err), '*');
            }
        }
    }],
    Project: ['$http', '$rootScope', '$config', '$window', '$location', 'UtilsService', function($http, $rootScope, $config, $window, $location, UtilsService) {
        return {
            config(key) {
                return $http.post(`${$config.services[key]}/config`).catch(UtilsService.throwError);
            },
            get: () => {
                return $http.get(`${$config.apiUrl}/project`).catch(UtilsService.throwError);
            },
            add: (data) => {
                return $http.post(`${$config.apiUrl}/project`, data).catch(UtilsService.throwError);
            },
            update: (data) => {
                return $http.put(`${$config.apiUrl}/project`, data).catch(UtilsService.throwError);
            },
            getDetail(id) {
                return $http.get(`${$config.apiUrl}/project/${id}`).catch(UtilsService.throwError);
            },
            delete(id) {
                return $http.delete(`${$config.apiUrl}/project/${id}`).catch(UtilsService.throwError);
            }
        };
    }],
    Role: ['$http', '$rootScope', '$config', 'UtilsService', function($http, $rootScope, $config, UtilsService) {
        return {
            get: () => {
                return $http.get(`${$config.apiUrl}/role`).catch(UtilsService.throwError);
            },
            add: (data) => {
                return $http.post(`${$config.apiUrl}/role`, data).catch(UtilsService.throwError);
            },
            update: (data) => {
                return $http.put(`${$config.apiUrl}/role/${data._id}`, data).catch(UtilsService.throwError);
            },
            getDetail(id) {
                return $http.get(`${$config.apiUrl}/role/${id}`).catch(UtilsService.throwError);
            },
            delete(id) {
                return $http.delete(`${$config.apiUrl}/role/${id}`).catch(UtilsService.throwError);
            }
        };
    }],
    Account: ['$http', '$rootScope', '$config', 'UtilsService', 'md5', function($http, $rootScope, $config, UtilsService, md5) {
        return {
            get: () => {
                return $http.get(`${$config.apiUrl}/account`).catch(UtilsService.throwError);
            },
            login : (data, projectId) => {
                data = _.clone(data);
                data.password = md5.createHash(data.password);
                return $http.post(`${$config.apiUrl}/login`, data, {headers : {pj: projectId}}).catch(UtilsService.throwError);
            },
            logout(){
                return $http.post(`${$config.apiUrl}/logout`).catch(UtilsService.throwError);
            },
            add: (data) => {
                data = _.clone(data);
                data.password = md5.createHash(data.password);
                return $http.post(`${$config.apiUrl}/account`, data).catch(UtilsService.throwError);
            },
            author: (data) => {
                return $http.head(`${$config.apiUrl}/authoriz`, {headers : data}).catch(UtilsService.throwError);
            },
            ping: (data) => {
                return $http.head(`${$config.apiUrl}/ping`).catch(UtilsService.throwError);
            },
            update: (account) => {
                if(account.password) account = _.clone(account);
                account.password = md5.createHash(account.password);
                return $http.put(`${$config.apiUrl}/account/${account._id}`, account).catch(UtilsService.throwError);
            },
            getDetail(id) {
                return $http.get(`${$config.apiUrl}/account/${id}`).catch(UtilsService.throwError);
            },
            delete(id) {
                return $http.delete(`${$config.apiUrl}/account/${id}`).catch(UtilsService.throwError);
            }
        };
    }]
}