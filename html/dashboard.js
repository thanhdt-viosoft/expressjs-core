let actions = document.querySelector('#actions');
let token = window.localStorage.token;
let theme = window.localStorage.theme;
let mainFrame = document.querySelector('#mainFrame');
mainFrame.setAttribute('src', `${window.config.plugins.project.link}?session=${token}&theme=${theme}&output=embed`);
window.logout = () => {
    mainFrame.setAttribute('src', `${window.config.plugins.logout.link}?session=${token}&theme=${theme}&output=embed`);
};
mainFrame.addEventListener('load', () => {
    mainFrame.contentWindow.postMessage(JSON.stringify({type: 'INIT', data: window.config.services}), '*');
});
window.handlerError = (res) => {
    if(res.error) {
        alert(res.error);
        location.href = `/?id=${window.localStorage.pj}`;
    }else if(res.currentProject) {        
        window.sessionStorage.currentProject = JSON.stringify(res.currentProject);
        let actionButtons = [];
        for(let k in window.config.plugins){
            if(!window.config.plugins[k].isMenu) continue;     
            if(k === 'project') {
                if(!(res.currentProject instanceof Array)) continue;
                else res.currentProject = res.currentProject[0];
            } 
            actionButtons.push(`<li><a href="${window.config.plugins[k].link}?session=${token}&theme=${theme}&output=embed" target="mainFrame">${window.config.plugins[k].name}</a></li>`);
        }        
        actions.innerHTML = actionButtons.join('');
        document.title = res.currentProject.name;
        document.querySelector('#projectInfo').innerText = res.currentProject.name;
    }else if(res.logout){
        location.href = `/?id=${window.localStorage.pj}`;
    }
}    