module.exports = ['$rootScope', '$location', '$http', '$window', 'Account', function ($rootScope, $location, $http, $window, Account) {
    $http.defaults.headers.common.token = $location.search().session;
    angular.element($window.document).find('head').append(`<link href="${$location.search().theme}" rel="stylesheet" type="text/css" />`);
}];