module.exports = {
    name: 'login',
    template: require('./login.html'),
    controller: ['$config', 'Account', '$http', '$location', '$window', function ($config, Account, $http, $location, $window) {
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

            let projectId;
            if(!$window.sessionStorage.projectId) projectId = $location.search().id;
            Account.login(self.user, projectId).then((res) => {
                $http.defaults.headers.common.token = res.headers('token');
            });
            
        }
    }]
}
