global.appconfig = {
    name: 'plugin.oauthv2',
    listen: 9600,
    db: {
        url: 'mongodb://localhost:27017/oauthv2'
    },
    auth: {
        url: 'http://localhost:9600'
    },
    mail: {
        url: 'http://localhost:9602'
    },
    app: {
        rootProjectId: '58a6db5263e9bd2b3c584066'
    },
    cache: {
        redis: {
            host: 'localhost',
            port: 6379,
            opts: {}
        }
    }
};