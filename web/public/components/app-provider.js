module.exports = {    
    UtilsService: ['$window', function($window) {
        return {
            throwError(err){
                err.msg = err.msg || err.data;
                $window.top.postMessage(JSON.stringify({type: 'ERROR', data: err}), '*');
            }
        }
    }],
    Mail: ['$http', '$rootScope', '$config', 'UtilsService', function ($http, $rootScope, $config, UtilsService) {
        return {
            find(status) {
                return $http.get(`${$config.services.mail}/mail?status=${status}`).catch(UtilsService.throwError);
            },
            init() {
                return $http.post(`${$config.services.mail}/config`).catch(UtilsService.throwError);
            },
            delete(_id) {                
                return $http.delete(`${$config.services.mail}/mail/${_id}`).catch(UtilsService.throwError);
            },
            resend(_id) {                
                return $http.put(`${$config.services.mail}/mail/${_id}`).catch(UtilsService.throwError);
            }   
        }
    }]
}