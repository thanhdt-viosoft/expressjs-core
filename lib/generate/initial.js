const path = require('path');
module.exports = {
    tables: {
        mail: {
            _id: GenType.Key(GenType.Uuid),
            project_id: GenType.Uuid,
            title: GenType.String,
            content: GenType.String,
            html: GenType.String,
            from: GenType.Object({
                name: GenType.String,
                email: GenType.String
            }),
            to: GenType.Array,
            cc: GenType.Array,
            bcc: GenType.Array,
            attachments: GenType.Array,
            trying_time: GenType.Number(3),
            status: GenType.Number(0),
            created_at: GenType.Date('auto-insert'),
            updated_at: GenType.Date('auto-insert|auto-update')
        },
        test: {
            _id: GenType.Key(GenType.Uuid),
            attachments: GenType.File({
                saveTo: '`assets/attachments`', // Upload file to physical path
                maxCount: 1, // Upload multiple file. If maxCount > 1 ? Array : Path image file
                isFull: true, // isFull ? details object image : only path
                returnPath: "`/attachments/${filename}`", // Path get after upload which is inserted into database (It's web path not physical path)
                limits: 10000, // limit file size
            }),
        }
    },
    outdir: 'src'
};