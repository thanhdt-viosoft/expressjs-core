const path = require('path');
module.exports = {
    auth: "utils.auth(`${global.appconfig.name}>${table}`, '${action}')",
    tables: {
        project: {
            _id: GenType.Key(GenType.Uuid),
            name: GenType.String,
            status: GenType.Number(0),  
            plugins: GenType.Object({
                oauth: GenType.Object({
                    _id: GenType.Uuid,
                    single_mode: GenType.Boolean,
                    session_expired: GenType.Number,
                    is_verify: GenType.Boolean
                })
            }),          
            roles: GenType.Array,
            user: GenType.Array({
                username: GenType.String,
                password: GenType.String(null)
            }, null),
            abc: GenType.Array({
                username: GenType.String,
                password: GenType.String(null)
            }, [{
                username: 'thanh'
            }]),
            image: GenType.File({
                saveTo: '`assets/images`', // Upload file to physical path
                maxCount: 1, // Upload multiple file. If maxCount > 1 ? Array : Path image file
                isFull: false, // isFull ? details object image : only path
                returnPath: "`/images/${filename}`", // Path get after upload which is inserted into database (It's web path not physical path)
                limits: 10000, // limit file size
                resize: Native("global.appconfig.app.imageResize.product") // Auto resize image base on config in src/appconfig.js
            }),
            created_at: GenType.Date('auto-insert'),
            updated_at: GenType.Date('auto-insert|auto-update')
        }
        // project: {
        //     _id: GenType.Key(GenType.Uuid),
        //     name: GenType.String,
        //     status: GenType.Number(0),  
        //     plugins: GenType.Object({
        //         oauthv2: GenType.Object({
        //             _id: GenType.Uuid,
        //             single_mode: GenType.Boolean,
        //             session_expired: GenType.Number
        //         })
        //     }),          
        //     roles: GenType.Array,
        //     user: GenType.Array({
        //         username: GenType.String,
        //         password: GenType.String(null)
        //     }, null),
        //     abc: GenType.Array({
        //         username: GenType.String,
        //         password: GenType.String(null)
        //     }, [{
        //         username: 'thanh'
        //     }]),
        //     image: GenType.File({
        //         saveTo: '`assets/images`', // Upload file to physical path
        //         maxCount: 1, // Upload multiple file. If maxCount > 1 ? Array : Path image file
        //         isFull: false, // isFull ? details object image : only path
        //         returnPath: "`/images/${filename}`", // Path get after upload which is inserted into database (It's web path not physical path)
        //         limits: 10000, // limit file size
        //         resize: Native("global.appconfig.app.imageResize.product") // Auto resize image base on config in src/appconfig.js
        //     }),
        //     created_at: GenType.Date('auto-insert'),
        //     updated_at: GenType.Date('auto-insert|auto-update')
        // }
    },
    outdir: 'src'
};