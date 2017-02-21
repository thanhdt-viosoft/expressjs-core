global.appconfig = {
    name: 'plugin.mail',
    listen: 9602,
    db: {
        url: 'mongodb://localhost:27017/mail'
    },
    auth: {
        url: 'http://localhost:9600'
    },
    app: {
        timeout_scan_email: 5000
    }
};