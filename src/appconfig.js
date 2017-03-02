global.appconfig = {
    name: 'plugin.oauth',
    listen: 9600,
    db: {
        url: 'mongodb://192.168.0.111:27017/oauthv2'
    },
    services: {
        manager: 'http://localhost:9599',
        auth: 'http://localhost:9600',
        mail: 'http://localhost:9602',
    },
    app: {
        rootProjectId: '58a714841ca4c40a38ae2125'
    },
    cache: {
        redis: {
            host: 'localhost',
            port: 6379,
            opts: {}
        }
    }
};