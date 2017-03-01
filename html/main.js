require('./index.html');
require('./dashboard.html');

Error.BAD_REQUEST = 400;
Error.NOT_FOUND = 404;
Error.EXPIRED = 440;
Error.AUTHEN = 401;
Error.AUTHORIZ = 403;
Error.INTERNAL = 500;
Error.CONDITION = 412;
Error.LOCKED = 423;

window.config = require('../config');

window.location.query = (function(a) {
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i)
    {
        var p=a[i].split('=', 2);
        if (p.length == 1)
            b[p[0]] = "";
        else
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
})(window.location.search.substr(1).split('&'));

window.onmessage = function(e){
    let data = JSON.parse(e.data);
    if(data.type !== 'ERROR') return;
    let res = data.data;
    if(res.status !== 200) {           
        if(res.status === Error.EXPIRED) {
            delete window.localStorage.token;
            res.error = 'Session was expired';
        }else if(res.status === Error.AUTHEN) {
            delete window.localStorage.token;
            res.error = 'You have not login yet';
        }else if(res.status === Error.AUTHORIZ) {
            delete window.localStorage.token;
            res.error = 'Your permission is denied';
        }else if(res.status === Error.LOCKED) {
            delete window.localStorage.token;
            res.error = 'Your account have been not actived yet';
        }else {
            res.error = res.data || res.statusText;        
        }
    }
    if(window.handlerError) window.handlerError(res);
};