module.exports = ['$rootScope', '$location', '$http', '$window', function ($rootScope, $location, $http, $window) {
    $http.defaults.headers.common.token = $location.search().session;
    angular.element($window.document).find('head').append(`<link href="${$location.search().theme}" rel="stylesheet" type="text/css" />`);
}];