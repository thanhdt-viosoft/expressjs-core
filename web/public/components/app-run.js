module.exports = ['$location', '$http', '$window', '$config', function ($location, $http, $window, $config) {
    $http.defaults.headers.common.token = $location.search().session;
    angular.element($window.document).find('head').append(`<link href="${$location.search().theme}" rel="stylesheet" type="text/css" />`);        
    $config.services = $window.localStorage.services ? JSON.parse($window.localStorage.services) : '';
    $window.onmessage = function(e) {
        let data = JSON.parse(e.data);
        if(data.type === 'INIT') {
            $window.localStorage.services = JSON.stringify(data.data);
            $config.services = data.data;
        }
    };
}];