module.exports = {    
    Mail: ['$http', '$rootScope', '$config', function ($http, $rootScope, $config) {
        return {
            find(status) {
                return $http.get(`${$config.apiUrl}/mail?status=${status}`);
            },
            init() {
                return $http.post(`${$config.apiUrl}/config`);
            },
            delete(_id) {                
                return $http.delete(`${$config.apiUrl}/mail/${_id}`);
            }   
        };
    }]
}