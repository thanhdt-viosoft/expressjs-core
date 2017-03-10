global.appconfig = {
    name: 'plugin.mail',
    listen: 9602,
    db: {
        url: 'mongodb://localhost:27017/mail'
    },
    services: {
        manager: 'http://localhost:9599',
        auth: 'http://localhost:9600',
        mail: 'http://localhost:9602',
        log: 'http://localhost:9603'
    },
    app: {
        timeout_scan_email: 60000,
        encrypt: 0
    }
};