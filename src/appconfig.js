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
        rootProjectId: '58997ac77e9a4435508973bf'
    },
    cache: {
        redis: {
            host: 'localhost',
            port: 6379,
            opts: {}
        }
    }
};