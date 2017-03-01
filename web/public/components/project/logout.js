module.exports = {
    name: 'logout',
    template: require('./logout.html'),
    controller: ['$config', 'Account', 'UtilsService', function ($config, Account, UtilsService) {
        require('./logout.scss');
        Account.logout().then((res) => {
            UtilsService.throwError({logout: true});
        });
    }]
}
