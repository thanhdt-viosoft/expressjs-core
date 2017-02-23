require('./my-app.css');
module.exports = {
    name: 'myApp',
    template: require('./my-app.html'),
    $routeConfig: [
        { path: '/:id',name: 'Login',component: 'login',useAsDefault: true},
        { path: '/projects',name: 'Projects',component: 'projects'},
        { path: '/config',name: 'Config',component: 'config'},
        { path: '/role',name: 'Role',component: 'role'},
        { path: '/empty',name: 'Empty',component: 'empty' },
        { path: '/account',name: 'Account',component: 'account'}
    ]
}