exports.listen = 9599;
exports.services = {
    theme: 'http://localhost:9599',
    oauth: 'http://localhost:9600',
    mail: 'http://localhost:9602',
    log: 'http://localhost:9603',
};
exports.theme = `${exports.services.theme}/theme.css`,
exports.plugins = {        
    login: { name: 'Login', link: `${exports.services.oauth}/dist/index.htm#!/login` },
    logout: { name: 'Logout', link: `${exports.services.oauth}/dist/index.htm#!/logout` },
    project: { name: 'Project', link: `${exports.services.oauth}/dist/index.htm#!/projects`, isMenu: true },
    config: { name: 'Config', link: `${exports.services.oauth}/dist/index.htm#!/config`, isMenu: true},
    account: { name: 'Account', link: `${exports.services.oauth}/dist/index.htm#!/account`, isMenu: true},
    role: { name: 'Role', link: `${exports.services.oauth}/dist/index.htm#!/role`, isMenu: true},
    mail: { name: 'Mail', link: `${exports.services.mail}/dist/index.htm#!/`, isMenu: true},
    log: { name: 'Log', link: `${exports.services.log}/dist/index.htm#!/`, isMenu: true}
};