module.exports = {    
    UtilsService: ['$window', function($window) {
        return {
            throwError(err){
                err.msg = err.msg || err.data;
                $window.top.postMessage(JSON.stringify({type: 'ERROR', data: err}), '*');
            }
        }
    }],
    Log: ['$http', '$rootScope', '$config', 'UtilsService', function ($http, $rootScope, $config, UtilsService) {
        return {
            find(status) {
                let q = {};
                if(status) {
                    q.status = status;
                }
                return $http.get(`${$config.services.log}/log?q=${JSON.stringify(q)}`).catch(UtilsService.throwError);
            }  
        }
    }]
}