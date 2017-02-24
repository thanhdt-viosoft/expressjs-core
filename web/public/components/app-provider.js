module.exports = {    
    UtilsService: ['$window', function($window) {
        return {
            throwError(err){
                console.log('e');
                $window.top.postMessage(JSON.stringify(err), '*');
            }
        }
    }],
    Mail: ['$http', '$rootScope', '$config', 'UtilsService', function ($http, $rootScope, $config, UtilsService) {
        return {
            find(status) {
                return $http.get(`${$config.apiUrl}/mail?status=${status}`).catch(UtilsService.throwError);
            },
            init() {
                return $http.post(`${$config.apiUrl}/config`).catch(UtilsService.throwError);
            },
            delete(_id) {                
                return $http.delete(`${$config.apiUrl}/mail/${_id}`).catch(UtilsService.throwError);
            }   
        };
    }]
}