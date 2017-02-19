const path = require('path');
module.exports = {
    tables: {
        Spendings: {
            _id: GenType.Key(GenType.Uuid),
            money: GenType.Number,
            input_date: GenType.Date,
            des: GenType.String,
            type_spending_id: GenType.Uuid,
            wallet_id: GenType.Uuid,
            is_bookmark: GenType.Boolean,
            type: GenType.Number,
            created_at: GenType.Date('auto-insert'),
            updated_at: GenType.Date('auto-insert|auto-update')
        },
        Wallet: {
            _id: GenType.Key(GenType.Uuid),
            icon: GenType.String,
            name: GenType.String,
            money: GenType.Number,
            oder: GenType.Number,
            type: GenType.Number,
            created_at: GenType.Date('auto-insert'),
            updated_at: GenType.Date('auto-insert|auto-update')            
        },
        TypeSpendings: {
            _id: GenType.Key(GenType.Uuid),
            icon: GenType.String,
            name: GenType.String,
            oder: GenType.Number,
            type: GenType.Number,
            parent_id: GenType.Uuid(null),
            created_at: GenType.Date('auto-insert'),
            updated_at: GenType.Date('auto-insert|auto-update')   
        }
    },
    outdir: 'src'
};