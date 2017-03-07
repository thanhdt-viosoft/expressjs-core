let fs = require('fs');
let path = require('path');
let _ = require('lodash');

module.exports = (tbl, fieldsKeyType, fieldsType, auth) => {
    auth = auth ? (auth + ', ') : '';
    let self = this;
    this.find = (fieldsKeyType, fieldsType) => {
        return `app.get('/${tbl}', ${auth.replace('${action}', 'FIND')}async (req, res, next) => {                    
                    try {
                        let where = {};
                        const rs = await ${tbl}Service.find({$where: where});
                        res.send(rs);    
                    } catch (err) {
                        next(err);
                    }
                });`;
    };
    this.get = (fieldsKeyType, fieldsType) => {
        return `app.get('/${tbl}/:${fieldsKeyType.fieldName}', ${auth.replace('${action}', 'GET')}async (req, res, next) => {
                try {                        
                    const key = db.uuid(${fieldsKeyType.sign}req.params.${fieldsKeyType.fieldName});
                    const rs = await ${tbl}Service.get(key);
                    res.send(rs);
                } catch (err) {
                    next(err);
                }
            });`
    }
    this.post = (fieldsKeyType, fieldsType) => {
        let assignIValue = new MyArray();
        let jsonBodyParser;
        let bodyFileParser = new MyArray();
        assignIValue.push(fieldsKeyType.assignInController);
        const bodyFileParserLoad = (fieldsType, isFirst) => {
            fieldsType.forEach((fieldType, i) => {
                if(fieldType.name !== 'Key'){
                    if(isFirst) assignIValue.push(fieldType.assignInController);
                    if(fieldType.declareMiddleInController){
                        bodyFileParser.push(fieldType.declareMiddleInController);
                    }
                    if(fieldType.schema) {
                        let fieldsType0 = []; 
                        _.forOwn(fieldType.schema, (props, fieldName) => {
                            fieldsType0.push(props);
                        });
                        bodyFileParserLoad(fieldsType0);
                    }
                }
            });    
        }
        bodyFileParserLoad(fieldsType, true);
        if(bodyFileParser.length > 0){            
            jsonBodyParser = `bodyHandler.fileHandler({
                                  ${bodyFileParser.join(',\n')}
                              })`;
        }else {
            jsonBodyParser = `bodyHandler.jsonHandler(${assignIValue.length > 0 ? ("{" + assignIValue.join(", ") + "}") : ''})`;
        }
        assignIValue = assignIValue.join('\n');
        return `app.post('/${tbl}', ${auth.replace('${action}', 'ADD')}${jsonBodyParser}, async (req, res, next) => {
                    try { ${fieldsKeyType.assignInController ? ('\n' + fieldsKeyType.assignInController) : ''}
                        const rs = await ${tbl}Service.insert(req.body);
                        res.send(rs);
                    } catch (err) {
                        next(err);
                    }
                });`;
    }
    this.put = (fieldsKeyType, fieldsType) => {
        let assignUValue = new MyArray();
        let jsonBodyParser = 'bodyHandler.jsonHandler()';
        let bodyFileParser = new MyArray();
        // assignUValue.push(fieldsKeyType.assignUpController);
        const bodyFileParserLoad = (fieldsType, isFirst) => {
            fieldsType.forEach((fieldType, i) => {
                if(fieldType.name !== 'Key'){
                    if(isFirst) assignUValue.push(fieldType.assignUpController);
                    if(fieldType.declareMiddleInController){
                        bodyFileParser.push(fieldType.declareMiddleInController);
                    }
                    if(fieldType.schema) {
                        let fieldsType0 = []; 
                        _.forOwn(fieldType.schema, (props, fieldName) => {
                            fieldsType0.push(props);
                        });
                        bodyFileParserLoad(fieldsType0);
                    }
                }
            });    
        }
        bodyFileParserLoad(fieldsType, true);
        if(bodyFileParser.length > 0){            
            jsonBodyParser = `bodyHandler.fileHandler({
                                  ${bodyFileParser.join(',\n')}
                              })`;
        }else {
            jsonBodyParser = `bodyHandler.jsonHandler(${assignUValue.length > 0 ? ("{" + assignUValue.join(", ") + "}") : ''})`;
        }
        assignUValue = assignUValue.join('\n\t');
        return `app.put('/${tbl}/:${fieldsKeyType.fieldName}', ${auth.replace('${action}', 'UPDATE')}${jsonBodyParser}, async (req, res, next) => {
                    try { ${fieldsKeyType.assignUpController ? ('\n' + fieldsKeyType.assignUpController) : ''}
                        const rs = await ${tbl}Service.update(req.body);
                        res.send(rs);
                    } catch (err) {
                        next(err);
                    }
                });`;
    }
    this.delete = (fieldsKeyType, fieldsType) => {
        return `app.delete('/${tbl}/:${fieldsKeyType.fieldName}', ${auth.replace('${action}', 'DELETE')}async (req, res, next) => {
                    try{
                        const key = db.uuid(${fieldsKeyType.sign}req.params.${fieldsKeyType.fieldName});
                        const rs = await ${tbl}Service.delete(key);
                        res.send(rs);
                    } catch (err) {
                        next(err);
                    }
                });`;
    }
    this.writeTo = (outdir) => {
        let genContent = new MyArray();    
        genContent.push(self.find(fieldsKeyType, fieldsType));
        genContent.push(self.get(fieldsKeyType, fieldsType));
        genContent.push(self.post(fieldsKeyType, fieldsType));
        genContent.push(self.put(fieldsKeyType, fieldsType));
        genContent.push(self.delete(fieldsKeyType, fieldsType));
        let fcontroller = path.join(__dirname, '..', '..', outdir, 'controller', `${tbl}.controller.js`);
        try {
            fs.statSync(fcontroller);
            console.warn(`#WARN\t${fcontroller} is existed`);
        } catch (e) {
            let cnt = new String(fs.readFileSync(path.join(__dirname, '[name].controller.js')));
            cnt = cnt
                .replace(/\$\{tbl\}/g, tbl)
                .replace(/\$\{GEN_CONTENT\}/g, genContent.join('\n\n'))
                .replace(/\$\{tblDeco\}/g, tbl.toUpperCase().split('').join('-'))
                .replace(/\$\{createdDate\}/g, new Date().toLocaleString());            
            let beautify = require('js-beautify').js_beautify;
            cnt = beautify(cnt.toString('binary'), { "indent_size": 1, "indent_char": "\t"});
            fs.writeFileSync(fcontroller, cnt);
        }
    }
    return this;
}