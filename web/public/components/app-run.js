module.exports = ['$rootScope', '$location', '$window', '$http', function ($rootScope, $location, $window, $http) {
    $http.defaults.headers.common.token = $location.search().session;
    angular.element($window.document).find('head').append(`<link href="${$location.search().theme}" rel="stylesheet" type="text/css" />`);
}];