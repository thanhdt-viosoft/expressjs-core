const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const _ = require('lodash');

/************************************
 ** DATABASE ADAPTER FOR MONGODB
 ** Installation
 ** `npm install mongodb --save`
 *************************************/

const QueueHandler = require('./queue.handler');

const RELEASE_TIMEOUT = 5000;

const queue = new QueueHandler((url=global.appconfig.db.url) => {
    return MongoClient.connect(url);
}, (db) => {
    return db.close();
}, RELEASE_TIMEOUT);

exports = module.exports = {
    NONE: 0,
    DONE: 2,
    SUCCESS: 1,
    FAIL: -1,
    Uuid: ObjectID,
    size: () => {
        return queue.size();
    },
    uuid(id) {
        if(id instanceof Array){
            for(let i in id){
                id[i] = exports.uuid(id[i]);
            }
            return id;
        }
        if(!id) return new ObjectID();
        return typeof id === 'string' ? ObjectID(id) : id;
    },
    async find(tableName, {
        $where,
        $fields,
        $sort,
        $page = 1,
        $recordsPerPage = 20
    }) {
        const db = await queue.get();
        const collection = db.collection(tableName);        
        try {
            let query = collection.find($where, $fields);
            if ($sort) query = query.sort($sort);
            if ($page) query = query.skip(($page - 1) * $recordsPerPage);
            if ($recordsPerPage) query = query.limit($recordsPerPage);
            return await query.toArray();
        }finally{
            queue.release(db);
        }
    },  
    async get(tableName, fil) {
        const db = await queue.get();
        const collection = db.collection(tableName);
        if(!_.isPlainObject(fil)) fil = { $where: { _id: exports.uuid(fil) } };
        else if(!fil.$where) fil = { $where: fil };
        try {
            return await collection.findOne(fil.$where, fil.$fields);
        }finally{
            queue.release(db);
        }        
    },
    async insert(tableName, obj) {
        const db = await queue.get();
        const collection = db.collection(tableName);        
        try {
            let rs;
            if(!(obj instanceof Array)) {
                rs = await collection.insertOne(obj);        
                if(rs.ops) rs = rs.ops[0];
            }
            else rs = await collection.insertMany(obj).ops;                
            return rs;        
        }finally{
            queue.release(db);
        }      
    },
    async manual(tableName, fcManual){
        const db = await queue.get();
        const collection = db.collection(tableName);        
        try {
            return await fcManual(collection, db);
        }finally{
            queue.release(db);
        }    
    },
    async update(tableName, obj0) {
        const obj = _.cloneDeep(obj0);
        delete obj._id;
        let where;
        if(!_.isPlainObject(obj0._id)) where = {_id: exports.uuid(obj0._id)};
        else where = obj0._id;
        const db = await queue.get();
        const collection = db.collection(tableName);        
        try {
            return await collection.updateOne(where, {
                $set: obj
            });
        }finally{
            queue.release(db);
        }    
    },
    async delete(tableName, where) {
        const db = await queue.get();
        const collection = db.collection(tableName);
        if(!_.isPlainObject(where)) where = { _id: exports.uuid(where) };        
        try {
            return await collection.deleteOne(where);
        }finally{
            queue.release(db);
        }    
    },
    async count(tableName, where){
        const db = await queue.get();
        const collection = db.collection(tableName);        
        try {
            return await collection.count(where);            
        }finally{
            queue.release(db);
        }  
    },
    async aggregate(tableName, $aggregate, opts = exports.NONE) {
        const db = await queue.get();
        const collection = db.collection(tableName);        
        try {
            const query = collection.aggregate($aggregate);
            return await query.toArray();         
        }finally{
            queue.release(db);
        }
    }
}

// const rs = await dbo.manual(async(collection, dbo) => {
//     return await collection.findOne({
//         _id: auth.projectId,
//         'accounts._id': auth.accountId
//     }, {
//         'accounts.$': 1,
//     });
// }, dboType);