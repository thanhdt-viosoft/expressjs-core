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
            config(key) {
                return $http.post(`${$config.services[key]}/config`).catch(UtilsService.throwError);
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
    }]
}