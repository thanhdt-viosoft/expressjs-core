module.exports = {
    Project: ['$http', '$rootScope', '$config', '$q', '$location', function($http, $rootScope, $config, $q,$location) {
        return {
            config(key) {
                return $http.post(`${$config.services[key]}/config`).then(function successCallback(response) {
                    return response;
                }, function errorCallback(response) {
                    $location.path('/empty');
                });
            },
            get: () => {
                return $http.get(`${$config.apiUrl}/project`).then(function successCallback(response) {
                    return response;
                }, function errorCallback(response) {
                    $location.path('/empty');
                });
            },
            add: (data) => {
                return $http.post(`${$config.apiUrl}/project`, data).then(function successCallback(response) {
                    return response;
                }, function errorCallback(response) {
                    $location.path('/empty');
                });
            },
            update: (data) => {
                return $http.put(`${$config.apiUrl}/project`, data).then(function successCallback(response) {
                    return response;
                }, function errorCallback(response) {
                    $location.path('/empty');
                });
            },
            getDetail(id) {
                return $http.get(`${$config.apiUrl}/project/${id}`).then(function successCallback(response) {
                    return response;
                }, function errorCallback(response) {
                    $location.path('/empty');
                });
            },
            delete(id) {
                return $http.delete(`${$config.apiUrl}/project/${id}`).then(function successCallback(response) {
                    return response;
                }, function errorCallback(response) {
                    $location.path('/empty');
                });
            }
        };
    }],
    Role: ['$http', '$rootScope', '$config', '$q', function($http, $rootScope, $config, $q) {
        return {
            get: () => {
                return $http.get(`${$config.apiUrl}/role`);
            },
            add: (data) => {
                return $http.post(`${$config.apiUrl}/role`, data);
            },
            update: (data) => {
                return $http.put(`${$config.apiUrl}/role/${data._id}`, data);
            },
            getDetail(id) {
                return $http.get(`${$config.apiUrl}/role/${id}`);
            },
            delete(id) {
                return $http.delete(`${$config.apiUrl}/role/${id}`);
            }
        };
    }],
    Account: ['$http', '$rootScope', '$config', '$q', function($http, $rootScope, $config, $q) {
        return {
            get: () => {
                return $http.get(`${$config.apiUrl}/account`);
            },
            login : (data, projectId) => {
                return $http.post(`${$config.apiUrl}/login`, data, {headers : {pj: projectId}});
            },
            add: (data) => {
                // return $http.post(`${$config.apiUrl}/register`, data);
                return $http.post(`${$config.apiUrl}/account`, data);
            },
            author: (data) => {
                // data.pj = $config.auth.pj;
                // headers : {
                //     'content-type': 'application/json',
                //     'token': '58997ac77e9a4435508973bf-589980092d24aa1dbc5f97ea-589bd9aafb9ca430b415ee7f',
                //     'path': '/Login',
                //     'actions': 'ADD'
                // }
                return $http.head(`${$config.apiUrl}/authoriz`, {headers : data});
            },
            ping: (data) => {
                return $http.head(`${$config.apiUrl}/ping`);
            },
            update: (account) => {
                return $http.put(`${$config.apiUrl}/account/${account._id}`, account);
            },
            getDetail(id) {
                return $http.get(`${$config.apiUrl}/account/${id}`);
            },
            delete(id) {
                return $http.delete(`${$config.apiUrl}/account/${id}`);
            }
        };
    }]
}