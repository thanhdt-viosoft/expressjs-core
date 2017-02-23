require('./my-app.css');
module.exports = {
    name: 'myApp',
    template: require('./my-app.html'),
    $routeConfig: [{
        path: '/',
        name: 'MailList',
        component: 'mailList',
        useAsDefault: true
    }]
}