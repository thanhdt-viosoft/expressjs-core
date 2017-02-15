const path = require('path');
module.exports = {
    tables: {
        project: {
            _id: GenType.Key(GenType.Uuid),
            name: GenType.String,
            status: GenType.Number(0),  
            plugins: GenType.Object({
                oauthv2: GenType.Object({
                    _id: GenType.Uuid,
                    single_mode: GenType.Boolean,
                    session_expired: GenType.Number
                })
            }),          
            created_at: GenType.Date('auto-insert'),
            updated_at: GenType.Date('auto-insert|auto-update')
        }
    },
    outdir: 'src'
};