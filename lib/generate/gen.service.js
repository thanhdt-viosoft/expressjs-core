let fs = require('fs');
let path = require('path');
let _ = require('lodash');

module.exports = (tbl, fieldsKeyType, fieldsType) => {
    let self = this;
    this.validate = (fieldsKeyType, fieldsType) => {
        let ivalidation = new MyArray();
        let uvalidation = new MyArray();
        let gvalidation = new MyArray();
        let dvalidation = new MyArray();
        let fvalidation = new MyArray();
        ivalidation.push(fieldsKeyType.validateInService ? fieldsKeyType.validateInService('item') : null);
        uvalidation.push(fieldsKeyType.validateUpService ? fieldsKeyType.validateUpService('item') : null);
        gvalidation.push(fieldsKeyType.validateGeService ? fieldsKeyType.validateGeService('item') : null);
        dvalidation.push(fieldsKeyType.validateDeService ? fieldsKeyType.validateDeService('item') : null);
        fvalidation.push(fieldsKeyType.validateFiService ? fieldsKeyType.validateFiService('item') : null);
        fieldsType.forEach((fieldType, i) => {
           if(fieldType.name !== 'Key'){
                ivalidation.push(fieldType.validateInService ? fieldType.validateInService('item') : null);
                uvalidation.push(fieldType.validateUpService ? fieldType.validateUpService('item') : null);
                gvalidation.push(fieldType.validateGeService ? fieldType.validateGeService('item') : null);
                dvalidation.push(fieldType.validateDeService ? fieldType.validateDeService('item') : null);
                fvalidation.push(fieldType.validateFiService ? fieldType.validateFiService('item') : null);
            } 
        });
        return `validate(item, action) {
        switch (action) {
            case exports.VALIDATE.INSERT:
                ${ivalidation.join('\n\t\t\t\t')}

                break;
            case exports.VALIDATE.UPDATE:
                ${uvalidation.join('\n\t\t\t\t')}

                break;
            case exports.VALIDATE.GET:
                ${gvalidation.join('\n\t\t\t\t')}

                break;
            case exports.VALIDATE.DELETE:
                ${dvalidation.join('\n\t\t\t\t')}

                break;
            case exports.VALIDATE.FIND:
                ${fvalidation.join('\n\t\t\t\t')}

                break;
        }
        return item;
    },`;
    };
    this.find = () => {
        return `async find(fil={}) {
                    fil = exports.validate(fil, exports.VALIDATE.FIND);
                    return await db.find(exports.COLLECTION, fil);
                },`;
    };
    this.get = (fieldsKeyType) => {
        return `async get(${fieldsKeyType.fieldName}) {
                    ${fieldsKeyType.fieldName} = exports.validate(${fieldsKeyType.fieldName}, exports.VALIDATE.GET);
                    return await db.get(exports.COLLECTION, ${fieldsKeyType.fieldName});
                },`;
    }
    this.post = (fieldsKeyType, fieldsType) => {
        let deleteFiles = [];
        fieldsType.forEach((fieldType, i) => {
            if(fieldType.name === 'File'){
                deleteFiles.push(`utils.deleteFiles(utils.getAbsoluteUpload(item.${fieldType.fieldName}, ${fieldType.config.saveTo}), ${JSON.ostringify(fieldType.config.resize)});`);                
            }
        });
        deleteFiles = deleteFiles.join('\n\t\t\t\t');        
        if(deleteFiles.length > 0) {
            return `async insert(item) {
                    try {
                        item = exports.validate(item, exports.VALIDATE.INSERT);
                        return await db.insert(exports.COLLECTION, item);
                    } catch(err){
                        ${deleteFiles}
                        throw err;
                    }
                },`;
        }
        return `async insert(item) {
                    item = exports.validate(item, exports.VALIDATE.INSERT);
                    return await db.insert(exports.COLLECTION, item);
                },`;
    }
    this.put = (fieldsKeyType, fieldsType) => {
        let deleteFiles = [];
        let deleteOldFiles = [];
        fieldsType.forEach((fieldType, i) => {
            if(fieldType.name === 'File'){
                deleteFiles.push(`utils.deleteFiles(utils.getAbsoluteUpload(item.${fieldType.fieldName}, ${fieldType.config.saveTo}), ${JSON.ostringify(fieldType.config.resize)});`);
                deleteOldFiles.push(`utils.deleteFiles(utils.getAbsoluteUpload(oldItem.${fieldType.fieldName}, ${fieldType.config.saveTo}), ${JSON.ostringify(fieldType.config.resize)});`);           
            }
        });
        deleteFiles = deleteFiles.join('\n\t\t\t\t');
        deleteOldFiles = deleteOldFiles.join('\n\t\t\t\t\t\t\t');
        if(deleteFiles.length > 0)
            return `async update(item) {
                        try {
                            item = exports.validate(item, exports.VALIDATE.UPDATE);
                            const oldItem = await db.get(exports.COLLECTION, item.${fieldsKeyType.fieldName});
                            const rs = await db.update(exports.COLLECTION, item);
                            ${deleteOldFiles}
                            return rs;
                        } catch (err) {
                            ${deleteFiles}
                            throw err;
                        }
                    },`;
        return `async update(item) {
                    item = exports.validate(item, exports.VALIDATE.UPDATE);                         
                    return await db.update(exports.COLLECTION, item);
                },`;
    }
    this.delete = (fieldsKeyType, fieldsType) => {
        let deleteFiles = [];
        fieldsType.forEach((fieldType, i) => {
            if(fieldType.name === 'File'){
                deleteFiles.push(`utils.deleteFiles(utils.getAbsoluteUpload(item.${fieldType.fieldName}, ${fieldType.config.saveTo}), ${JSON.ostringify(fieldType.config.resize)});`);           
            }
        });
        deleteFiles = deleteFiles.join('\n\t\t\t\t\t\t\t');
        if(deleteFiles.length > 0)
            return `async delete(${fieldsKeyType.fieldName}) {
                        ${fieldsKeyType.fieldName} = exports.validate(${fieldsKeyType.fieldName}, exports.VALIDATE.DELETE);
                        const item = await db.get(exports.COLLECTION, ${fieldsKeyType.fieldName});                                                              
                        const rs = await db.delete(exports.COLLECTION, ${fieldsKeyType.fieldName});   
                        ${deleteFiles}
                        return rs;
                    }`;
        return `async delete(${fieldsKeyType.fieldName}) {
                    ${fieldsKeyType.fieldName} = exports.validate(${fieldsKeyType.fieldName}, exports.VALIDATE.DELETE);
                    return await db.delete(exports.COLLECTION, ${fieldsKeyType.fieldName});
                }`;
    }
    this.writeTo = (outdir) => {
        let genContent = new MyArray();
        genContent.push(self.validate(fieldsKeyType, fieldsType));
        genContent.push(self.find(fieldsType, fieldsType));
        genContent.push(self.get(fieldsKeyType, fieldsType));
        genContent.push(self.post(fieldsKeyType, fieldsType));
        genContent.push(self.put(fieldsKeyType, fieldsType));
        genContent.push(self.delete(fieldsKeyType, fieldsType));
        let fservice = path.join(__dirname, '..', '..', outdir, 'service', `${tbl}.service.js`);
        try {
            fs.statSync(fservice);
            console.warn(`#WARN\t${fservice} is existed`);
        } catch (e) {
            let cnt = new String(fs.readFileSync(path.join(__dirname, '[name].service.js')));
            cnt = cnt
                .replace(/\$\{tbl\}/g, tbl)
                .replace(/\$\{GEN_CONTENT\}/g, genContent.join('\n\n\t'))
                .replace(/\$\{tblDeco\}/g, tbl.toUpperCase().split('').join('-'))
                .replace(/\$\{createdDate\}/g, new Date().toLocaleString());
            let beautify = require('js-beautify').js_beautify;
            cnt = beautify(cnt.toString('binary'), { "indent_size": 1, "indent_char": "\t"});
            cnt = cnt.replace('asyncget', 'async get');
            fs.writeFileSync(fservice, cnt);
        }
    }
    return this;
}