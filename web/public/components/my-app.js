require('./my-app.css');
module.exports = {
    name: 'myApp',
    template: require('./my-app.html'),
    $routeConfig: [
        { path: '/login',name: 'Login',component: 'login',useAsDefault: true},        
        { path: '/logout',name: 'Logout',component: 'logout'},
        { path: '/projects',name: 'Projects',component: 'projects'},
        { path: '/config',name: 'Config',component: 'config'},
        { path: '/role',name: 'Role',component: 'role'},
        { path: '/account',name: 'Account',component: 'account'}
    ]
}