global.appconfig = {
    name: 'plugin.core',
    listen: 9002,
    db: {
        url: 'mongodb://localhost:27017/core'
    },
    auth: {
        url: 'http://localhost:9600'
    },
    app: {
        timeout_scan_email: 60000
    }
};