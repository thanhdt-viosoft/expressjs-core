module.exports = {
    name: 'register',
    template: require('./register.html'),
    controller: ['$config', function ($config) {
        require('./register.scss');
        this.$routerOnActivate = (next) => {
            
        }
        
    }]
}
