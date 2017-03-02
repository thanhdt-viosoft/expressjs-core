require('./my-app.css');
module.exports = {
    name: 'myApp',
    template: require('./my-app.html'),
    $routeConfig: [{
        path: '/',
        name: 'LogList',
        component: 'logList',
        useAsDefault: true
    }]
}