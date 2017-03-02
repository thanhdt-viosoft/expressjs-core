const fs = require('fs');
let path = require('path');
let _ = require('lodash');

JSON.ostringify = (a, b, c) => {
    if(_.isNil(a)) return a;
    return JSON.stringify(a, b, c).replace(/\"([^(\")"]+)\":/g, "$1:").replace(/"?\$Native\(([^\)]+)\)"?/g, '$1');
}
global.MyArray = class MyArray extends Array {
    push(data) {
        if (data !== undefined && data !== null) {
            super.push(data);
        }
    }
}
global.Native = (value) => {
    return `$Native(${value})`;
}
global.GenType = {
        Uuid(mode='db', defaultValue) {
            const Uuid = class Uuid {};
            Uuid.type = 'String';
            Uuid.sign = Uuid.name === 'Number' ? '+' : '';
            Uuid.mode = mode;
            Uuid.defaultValue = defaultValue;
            Uuid.gen = (fieldName) => {
                Uuid.fieldName = fieldName;
                
                // Uuid.validateFiService = (item) => {
                //     return null;
                // };                
                Uuid.upHttp = Uuid.inHttp = `${fieldName}: `;
                Uuid.assignUpController = Uuid.assignInController = `${fieldName}: db.Uuid`;
                if (defaultValue === undefined) {
                    Uuid.validateInService = (item) => {
                        return `checker.must('${fieldName}', ${item ? `${item}.` : ''}${fieldName}, db.Uuid);`;
                    }                    
                    Uuid.validateUpService = (item) => {
                        return `checker.option('${fieldName}', ${item ? `${item}.` : ''}${fieldName}, db.Uuid);`;
                    }                    
                } else if (defaultValue === null) {
                    Uuid.validateInService = Uuid.validateUpService = (item) => {
                        return `checker.option('${fieldName}', ${item ? `${item}.` : ''}${fieldName}, db.Uuid);`;
                    }      
                } else {
                    Uuid.validateInService = Uuid.validateUpService = (item) => {
                        return `checker.must('${fieldName}', ${item ? `${item}.` : ''}${fieldName}, db.Uuid, db.uuid(${defaultValue !== 'uuid' ? JSON.ostringify(defaultValue) : ''}));`;
                    }                    
                    
                }
            }            
            return Uuid;
        },
        Key(type = GenType.Uuid, defaultValue) {   
            if(!type.prototype) type = Reflect.apply(type, undefined, []);
            let Key = class Key {};         
            Key.type = type;   
            Key.defaultValue = defaultValue;
            type.defaultValue = defaultValue;
            Key.sign = type.name === 'Number' ? '+' : '';
            Key.gen = (fieldName) => {
                Key.fieldName = fieldName;
                Key.validateInService = (item) => {
                    return `${item ? `${item}.` : ''}${fieldName} = db.uuid();`;
                }
                Key.validateDeService = Key.validateGeService = (item) => {
                    return `checker.must('${fieldName}', ${item}, db.Uuid);`;
                }
                Key.validateUpService = (item) => {
                    return `checker.must('${fieldName}', ${item ? `${item}.` : ''}${fieldName}, db.Uuid);`;
                }
                Key.upHttp = Key.inHttp = `${fieldName}: `;
                if (defaultValue === undefined) {

                } else if (defaultValue === null) {

                }         
                Key.assignUpController = `req.body.${fieldName} = db.uuid(${Key.sign}req.params.${fieldName});`;
            }  
            return Key;
        },
        String(defaultValue) {
            const String = class String {};
            String.defaultValue = defaultValue;
            String.gen = (fieldName) => {
                String.fieldName = fieldName;
                String.assignUpController = String.assignInController = `${fieldName}: String`;
                if (defaultValue === undefined) {
                    String.upHttp = String.inHttp = `${fieldName}: ''`;
                    String.validateInService = (item) => {
                        return `checker.must('${fieldName}', ${item ? `${item}.` : ''}${fieldName}, String);`;
                    }
                    String.validateUpService = (item) => {
                        return `checker.option('${fieldName}', ${item ? `${item}.` : ''}${fieldName}, String);`;
                    }
                } else if (defaultValue === null) {
                    String.validateInService = String.validateUpService = (item) => {
                        return `checker.option('${fieldName}', ${item ? `${item}.` : ''}${fieldName}, String);`;
                    }
                    String.upHttp = String.inHttp = `${fieldName}: null`;
                } else {
                    String.upHttp = String.inHttp = `${fieldName}: ${JSON.ostringify(defaultValue)}`;
                    String.validateUpService = String.validateInService = (item) => {
                        return `checker.must('${fieldName}', ${item ? `${item}.` : ''}${fieldName}, String, ${JSON.ostringify(defaultValue)});`;
                    }
                }

            }
            return String;
        },
        Number(defaultValue) {
            let Number = class Number {};
            Number.defaultValue = +defaultValue;
            Number.gen = (fieldName) => {
                Number.fieldName = fieldName;
                Number.assignUpController = Number.assignInController = `${fieldName}: Number`;
                if (defaultValue === undefined) {
                    Number.upHttp = Number.inHttp = `${fieldName}: 0`;
                    Number.validateInService = (item) => {
                        return `checker.must('${fieldName}', ${item ? `${item}.` : ''}${fieldName}, Number);`;
                    }
                    Number.validateUpService = (item) => {
                        return `checker.option('${fieldName}', ${item ? `${item}.` : ''}${fieldName}, Number);`;
                    }
                } else if (defaultValue === null) {
                    Number.validateInService = Number.validateUpService = (item) => {
                        return `checker.option('${fieldName}', ${item ? `${item}.` : ''}${fieldName}, Number);`;
                    }
                    Number.upHttp = Number.inHttp = `${fieldName}: null`;
                } else {
                    Number.upHttp = Number.inHttp = `${fieldName}: ${JSON.ostringify(defaultValue)}`;
                    Number.validateInService = (item) => {
                        return `checker.must('${fieldName}', ${item ? `${item}.` : ''}${fieldName}, Number, ${JSON.ostringify(defaultValue)});`;
                    }
                    Number.validateUpService = (item) => {
                        return `checker.option('${fieldName}', ${item ? `${item}.` : ''}${fieldName}, Number);`;
                    }
                }

            }
            return Number;
        },
        Boolean(defaultValue) {
            let Boolean = class Boolean {};
            Boolean.defaultValue = +defaultValue;
            Boolean.gen = (fieldName) => {
                Boolean.fieldName = fieldName;
                Boolean.assignUpController = Boolean.assignInController = `${fieldName}: Boolean`;
                if (defaultValue === undefined) {
                    Boolean.upHttp = Boolean.inHttp = `${fieldName}: 0`;
                    Boolean.validateInService = (item) => {
                        return `checker.must('${fieldName}', ${item ? `${item}.` : ''}${fieldName}, Boolean);`;
                    }
                    Boolean.validateUpService = (item) => {
                        return `checker.option('${fieldName}', ${item ? `${item}.` : ''}${fieldName}, Boolean);`;
                    }
                } else if (defaultValue === null) {
                    Boolean.validateInService = Boolean.validateUpService = (item) => {
                        return `checker.option('${fieldName}', ${item ? `${item}.` : ''}${fieldName}, Boolean);`;
                    }
                    Boolean.upHttp = Boolean.inHttp = `${fieldName}: null`;
                } else {
                    Boolean.upHttp = Boolean.inHttp = `${fieldName}: ${JSON.ostringify(defaultValue)}`;
                    Boolean.validateInService = (item) => {
                        return `checker.must('${fieldName}', ${item ? `${item}.` : ''}${fieldName}, Boolean, ${JSON.ostringify(defaultValue)});`;
                    }
                    Boolean.validateUpService = (item) => {
                        return `checker.option('${fieldName}', ${item ? `${item}.` : ''}${fieldName}, Boolean);`;
                    }
                }
            }
            return Boolean;
        },
        Date(...yyyy) {
            let Date = class Date {};
            let defaultValue = yyyy.length === 0 ? undefined : (yyyy[0] === null ? null : yyyy.join(','));
            if (!_.isNil(defaultValue) && defaultValue.indexOf('auto') === -1) {
                defaultValue = defaultValue === 'now' ? 'new Date()' : `new Date(${defaultValue})`;
            }
            Date.defaultValue = defaultValue;
            Date.gen = (fieldName) => {
                Date.fieldName = fieldName;
                if (defaultValue === undefined) {
                    Date.validateInService = (item) => {
                        return `checker.must('${fieldName}', ${item ? `${item}.` : ''}${fieldName}, Date);`;
                    }
                    Date.validateUpService = (item) => {
                        return `checker.option('${fieldName}', ${item ? `${item}.` : ''}${fieldName}, Date);`;
                    }
                    Date.upHttp = Date.inHttp = `${fieldName}: new Date()`;
                } else if (defaultValue === null) {
                    Date.validateInService = Date.validateUpService = (item) => {
                        return `checker.option('${fieldName}', ${item ? `${item}.` : ''}${fieldName}, Date);`;
                    }
                    Date.upHttp = Date.inHttp = `${fieldName}: null`;
                } else {
                    if(defaultValue.indexOf('auto') === -1) {
                        Date.assignUpController = Date.assignInController = `${fieldName}: Date`;
                        Date.upHttp = Date.inHttp = `${fieldName}: ${defaultValue}`;
                    }
                    Date.validateUpService = (item) => {
                        if(defaultValue.indexOf('auto') === -1) return `checker.option('${fieldName}', ${item ? `${item}.` : ''}${fieldName}, Date, ${defaultValue});`;
                        if(defaultValue.indexOf('auto-update') !== -1) return `${item ? `${item}.` : ''}${fieldName} = new Date();`;
                        return null;
                    }
                    Date.validateInService = (item) => {
                        if(defaultValue.indexOf('auto') === -1) return `checker.must('${fieldName}', ${item ? `${item}.` : ''}${fieldName}, Date, ${defaultValue});`;
                        if(defaultValue.indexOf('auto-insert') !== -1) return `${item ? `${item}.` : ''}${fieldName} = new Date();`;
                        return null;
                    }
                }

            }
            return Date;
        },
        Object(schema, defaultValue) {
            let Object = class Object {};
            Object.schema = schema;
            Object.defaultValue = defaultValue;
            Object.gen = (fieldName) => {
                Object.fieldName = fieldName;
                Object.assignUpController = Object.assignInController = `${fieldName}: Object`;
                let checkWhenHas = (item, fieldName, type) => {
                    let rs = new MyArray();
                    _.forOwn(schema, (fieldType, fieldName1) => {
                        if (!fieldType.prototype) {
                            fieldType = Reflect.apply(fieldType, undefined, []);
                        }
                        fieldType.gen(fieldName1);
                        if(type === 0) {                            
                            rs.push(fieldType.validateInService ? fieldType.validateInService(`${item}${fieldName}`) : null);
                        } else {
                            rs.push(fieldType.validateUpService ? fieldType.validateUpService(`${item}${fieldName}`) : null);
                        }
                    });
                    if(rs.length > 0) {
                        return `${rs.join('\n')}`;
                    }
                    return '';
                }
                let assignPropsHttp = (type) => {
                    let rs = new MyArray();
                    _.forOwn(schema, (fieldType, fieldName1) => {
                        if (!fieldType.prototype) {
                            fieldType = Reflect.apply(fieldType, undefined, []);
                        }
                        fieldType.gen(fieldName1);
                        if(type === 0) {
                            rs.push(fieldType.inHttp);
                        }
                        else {
                            rs.push(fieldType.upHttp);
                        }
                    });
                    return `${rs.length > 0 ? rs.join('\n') : ''}`;
                }
                if(!_.isNil(defaultValue)){
                    Object.upHttp = Object.inHttp = `${fieldName}: ${JSON.ostringify(defaultValue)}`;
                }else {
                    Object.upHttp = `${fieldName}: {${assignPropsHttp(1)}}`;
                    Object.inHttp = `${fieldName}: {${assignPropsHttp(0)}}`;
                }
                if (defaultValue === undefined) {                    
                    const validate = (item, type) => {
                        let cnt = '';
                        if(type === 1) {
                            if(!schema) cnt = `checker.option('${fieldName}', ${item ? `${item}.` : ''}${fieldName}, Object);`;
                            else cnt = `checker.option('${fieldName}', ${item ? `${item}.` : ''}${fieldName}, Object, (${fieldName})=>{${checkWhenHas('', fieldName, type)}});`;
                        } else {
                            cnt = `checker.must('${fieldName}', ${item ? `${item}.` : ''}${fieldName}, Object);`;
                            if(schema) cnt += checkWhenHas(`${item}.`, fieldName, type);
                        }
                        return cnt;
                    };
                    Object.validateUpService = (item) => {
                        return validate(item, 1);
                    };
                    Object.validateInService = (item) => {
                        return validate(item, 0);
                    };
                } else if (defaultValue === null) {
                    // Object.upHttp = Object.inHttp = `${fieldName}: null`;
                } else {                
                    const validate = (item, type) => {
                        let cnt = '';
                        if(type === 1) {
                            if(!schema) cnt = `checker.option('${fieldName}', ${item ? `${item}.` : ''}${fieldName}, Object);`;
                            else cnt = `checker.option('${fieldName}', ${item ? `${item}.` : ''}${fieldName}, Object, (${fieldName})=>{${checkWhenHas('', fieldName, type)}});`;
                        } else {
                            cnt = `checker.must('${fieldName}', ${item ? `${item}.` : ''}${fieldName}, Object, ${JSON.ostringify(defaultValue, null, '\t').replace(/\n/g, '\n')});`;
                            if(schema) cnt += checkWhenHas(`${item}.`, fieldName, type);
                        }
                        return cnt;
                    };
                    Object.validateUpService = (item) => {
                        return validate(item, 1);
                    };
                    Object.validateInService = (item) => {
                        return validate(item, 0);
                    };
                }

            }
            return Object;
        },
        Array(schema, defaultValue) {
            let Array = class Array {};
            Array.schema = schema;
            Array.defaultValue = defaultValue;
            Array.gen = (fieldName) => {
                Array.fieldName = fieldName;
                Array.assignUpController = Array.assignInController = `${fieldName}: Array`;
                let checkWhenHas = (item, type) => {                    
                    let rs = new MyArray();
                    if(typeof schema === 'function'){
                        let fieldType = schema;
                        let fieldName1 = fieldName;
                        if (!fieldType.prototype) {
                            fieldType = Reflect.apply(fieldType, undefined, []);
                        }
                        fieldType.gen(fieldName1);
                        if(type === 0) rs.push(fieldType.validateInService ? fieldType.validateInService() : null);
                        else rs.push(fieldType.validateUpService ? fieldType.validateUpService() : null);
                    }else {                        
                        _.forOwn(schema, (fieldType, fieldName1) => {
                            if (!fieldType.prototype) {
                                fieldType = Reflect.apply(fieldType, undefined, []);
                            }
                            fieldType.gen(fieldName1);
                            if(type === 0) rs.push(fieldType.validateInService ? fieldType.validateInService(`${fieldName}`) : null);
                            else rs.push(fieldType.validateUpService ? fieldType.validateUpService(`${fieldName}`) : null);
                        });                        
                    }
                    if(rs.length > 0)
                        return `${item ? `${item}.` : ''}${fieldName}.forEach((${fieldName}, i) => {
                            ${rs.join('\n')}
                        });`;
                    return '';
                }
                let assignPropsHttp = (schema, type) => {
                    let rs = new MyArray();
                    _.forOwn(schema, (fieldType, fieldName1) => {
                        if (!fieldType.prototype) {
                            fieldType = Reflect.apply(fieldType, undefined, []);
                        }
                        fieldType.gen(fieldName1);
                        if(type === 0) {
                            rs.push(fieldType.inHttp);
                        }
                        else {
                            rs.push(fieldType.upHttp);
                        }
                    });
                    return `${rs.length > 0 ? rs.join('\n') : ''}`;
                }
                if(!_.isNil(defaultValue)){
                    Array.upHttp = Array.inHttp = `${fieldName}: ${JSON.ostringify(defaultValue)}`;
                }else {
                    if(Array.schema) {
                        Array.upHttp = `${fieldName}: [{${assignPropsHttp(schema, 1)}}]`;
                        Array.inHttp = `${fieldName}: [{${assignPropsHttp(schema, 0)}}]`;
                    }else {
                        Array.upHttp = `${fieldName}: [${assignPropsHttp(schema, 1)}]`;
                        Array.inHttp = `${fieldName}: [${assignPropsHttp(schema, 0)}]`;
                    }
                }
                if (defaultValue === undefined) {
                    const validate = (item, type) => {
                        let cnt = '';
                        if(type === 1) {
                            if(!schema) cnt = `checker.option('${fieldName}', ${item ? `${item}.` : ''}${fieldName}, Array);`;
                            else cnt = `checker.${typeof schema === 'function' ? 'must' : 'option'}('${fieldName}', ${item ? `${item}.` : ''}${fieldName}, ${typeof schema === 'function' ? 'Array' : 'Object'}, (${fieldName})=>{${checkWhenHas(item, type)}});`;
                        } else {
                            cnt = `checker.must('${fieldName}', ${item ? `${item}.` : ''}${fieldName}, Array);`;
                            if(schema) cnt += checkWhenHas(item, type);
                        }
                        return cnt;
                    }
                    Array.validateUpService = (item) => {
                        return validate(item, 1);
                    }
                    Array.validateInService = (item) => {
                        return validate(item, 0);
                    }
                    // Array.upHttp = Array.inHttp = `${fieldName}: []`;

                } else if (defaultValue === null) {
                    // Array.upHttp = Array.inHttp = `${fieldName}: null`;
                } else {
                    const validate = (item, type) => {
                        let cnt = '';
                        if(type === 1) {
                            if(!schema) cnt = `checker.option('${fieldName}', ${item ? `${item}.` : ''}${fieldName}, Array);`;
                            else cnt = `checker.option('${fieldName}', ${item ? `${item}.` : ''}${fieldName}, Array, (${fieldName})=>{${checkWhenHas(item, type)}});`;
                        } else {
                            cnt = `checker.must('${fieldName}', ${item ? `${item}.` : ''}${fieldName}, Array, ${JSON.ostringify(defaultValue, null, '\t')});`;
                            if(schema) cnt += checkWhenHas(item, type);
                        }
                        return cnt;
                    };
                    Array.validateUpService = (item) => {
                        return validate(item, 1);
                    }
                    Array.validateInService = (item) => {
                        return validate(item, 0);
                    }
                    // Array.upHttp = Array.inHttp = `${fieldName}: ${JSON.ostringify(defaultValue)}`;
                }

            }
            return Array;
        },
        File(config, defaultValue) {
            let File = class File {};
            if (!config) throw 'Not config upload path yet';
            File.config = config;
            File.gen = (fieldName) => {
                    File.fieldName = fieldName;
                    let dir = path.join(__dirname, '..', '..', eval(config.saveTo));
                    if (!fs.existsSync(dir)) {
                        fs.mkdirSync(dir);
                    }
                    File.assignUpController = File.assignInController = `${fieldName}: File`;
                    if (defaultValue === undefined) {
                        File.validateInService = (item) => {
                            return `checker.must('${fieldName}', ${item ? `${item}.` : ''}${fieldName}, ${config.multiples ? 'Array' : 'String'});`;
                        }
                        File.validateUpService = (item) => {
                            return `checker.option('${fieldName}', ${item ? `${item}.` : ''}${fieldName}, ${config.multiples ? 'Array' : 'String'});`;
                        }
                        File.upHttp = File.inHttp = `'file:${fieldName}': ''`;
                    } else if (defaultValue === null) {
                        File.validateInService = File.validateUpService = (item) => {
                            return `checker.option('${fieldName}', ${item ? `${item}.` : ''}${fieldName}, ${config.multiples ? 'Array' : 'String'});`;
                        }
                        File.upHttp = File.inHttp = `'file:${fieldName}': null`;
                    } else {
                        File.validateInService = (item) => {
                            return `checker.must('${fieldName}', ${item ? `${item}.` : ''}${fieldName}, ${config.multiples ? 'Array' : 'String'}, ${JSON.ostringify(defaultValue)});`;
                        }
                        File.validateUpService = (item) => {
                            return `checker.option('${fieldName}', ${item ? `${item}.` : ''}${fieldName}, ${config.multiples ? 'Array' : 'String'});`;
                        }
                        File.upHttp = File.inHttp = `'file:${fieldName}': ${defaultValue}`;
                    }
                    File.declareMiddleInController = `${fieldName}: ${Object.keys(config).length === 1 ? `'${config.saveTo}'` : JSON.ostringify(config)}`;
            }
        return File;
    }
};