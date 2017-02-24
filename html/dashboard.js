let actions = document.querySelector('#actions');
let token = window.localStorage.token;
let theme = window.localStorage.theme;
document.querySelector('#mainFrame').setAttribute('src', `${window.config.plugins.project.link}?session=${token}&theme=${theme}`);
window.logout = () => {
    document.querySelector('#mainFrame').setAttribute('src', `${window.config.plugins.logout.link}?session=${token}&theme=${theme}`);
};
window.handlerError = (res) => {
    if(res.error) {
        alert(res.error);
        location.href = `/?id=${window.localStorage.pj}`;
    }else if(res.currentProject) {
        window.sessionStorage.currentProject = JSON.stringify(res.currentProject);
        document.querySelector('#projectInfo').innerText = res.currentProject.name;
        let actionButtons = [];
        for(let k in window.config.plugins){
            if(!window.config.plugins[k].isMenu) continue;     
            if(!(window.sessionStorage.currentProject instanceof Array) && k === 'project') continue;
            else window.sessionStorage.currentProject[0];
            actionButtons.push(`<li><a href="${window.config.plugins[k].link}?session=${token}&theme=${theme}" target="mainFrame">${window.config.plugins[k].name}</a></li>`);
        }        
        actions.innerHTML = actionButtons.join('');
    }else if(res.logout){
        location.href = `/?id=${window.localStorage.pj}`;
    }
}    