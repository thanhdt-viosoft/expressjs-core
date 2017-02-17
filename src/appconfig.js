global.appconfig = {
    name: 'plugin.oauthv2',
    listen: 9600,
    db: {
        url: 'mongodb://localhost:27017/oauthv2'
    },
    auth: {
        url: 'http://localhost:9600'
    },
    app: {
        rootProjectId: '589c3cd29971853aa803b264'
    },
    cache: {
        redis: {
            host: 'localhost',
            port: 6379,
            opts: {}
        }
    }
};