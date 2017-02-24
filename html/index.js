let login = document.querySelector('#login');
window.handlerError = (res) => {
    if(!res.error) {
        window.localStorage.pj = location.query.id;
        window.localStorage.token = res.token;
        window.localStorage.theme = res.theme;
        window.location.href = 'dashboard.html';
    }else {
        alert(res.msg);
    }
}
login.src=`${window.config.plugins.login.link}?id=${location.query.id}&theme=${window.location.query.theme || window.config.theme}`;         