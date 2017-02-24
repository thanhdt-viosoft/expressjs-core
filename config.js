module.exports = {
    listen: 9599,
    theme: 'http://localhost:9599/theme.css',
    plugins: {        
        login: { name: 'Login', link: 'http://localhost:9600/dist/index.htm#!/login' },
        logout: { name: 'Logout', link: 'http://localhost:9600/dist/index.htm#!/logout' },
        project: { name: 'Project', link: 'http://localhost:9600/dist/index.htm#!/projects', isMenu: true },
        config: { name: 'Config', link: `http://localhost:9600/dist/index.htm#!/config`, isMenu: true},
        account: { name: 'Account', link: `http://localhost:9600/dist/index.htm#!/account`, isMenu: true},
        role: { name: 'Role', link: `http://localhost:9600/dist/index.htm#!/role`, isMenu: true},
        mail: { name: 'Mail', link: `http://localhost:9602/dist/index.htm#!/`, isMenu: true}
    }
};