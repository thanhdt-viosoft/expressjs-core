module.exports = {
    name: 'login',
    template: require('./login.html'),
    controller: ['$config', 'Account', '$http', '$location', '$window', 'UtilsService', function ($config, Account, $http, $location, $window, UtilsService) {
        require('./login.scss');
        let self = this;
        self.user = {};

        this.$routerOnActivate = (next) => {
            
        }
        
        this.login = () => {
            self.err= {};
              
            if(!$location.search().id) {
                console.log("Lack of id");
                return;
            }
            if(!self.user.username) {
                self.err.usr = "*";
                return;
            }
            if(!self.user.password){
                self.err.pwd = "*";
                return;
            }
            let projectId = $location.search().id;
            let theme = $location.search().theme;
            Account.login(self.user, projectId).then((res) => {
                UtilsService.throwError({theme: theme, token: res.headers('token')});
            });
            
        }
    }]
}
