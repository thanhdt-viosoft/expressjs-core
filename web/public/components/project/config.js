module.exports = {
    name: 'config',
    template: require('./config.html'),
    controller: ['$config', '$location', '$window', 'Project', function ($config, $location, $window, Project) {
        require('./config.scss');
        let self = this;
        this.ourService = {};
        for(let k in $config.services){
            if(k === 'theme') continue;
            this.ourService[k] = $config.services[k];
        }
        this.loadConfig = (key) => {
            self.key = key;
            if(!self._project.plugins[key]) {
                Project.initConfig(key).then((resp) => {
                    if(!resp || !resp.data) delete self._project.plugins[key];
                    else self._project.plugins[key] = JSON.stringify(resp.data, null, '  ');
                });
            }
        }
        this.storeConfig = () => {            
            if(!self.key) return;
            try {
                JSON.parse(self._project.plugins);
            }catch(e) {
                console.log('Config file is wrong format');
            }
        }

        this.save = () => {
            let value = {};
            try {
                for(var k in self._project.plugins) {
                    eval(`value[k] = ${self._project.plugins[k]}`);
                }
                Project.update({
                    _id: self._project._id,
                    plugins: value
                }).then((res) => {
                    // success
                });
            }catch(e){
                console.log('Config file is wrong format');
            }
        };        

        Project.get().then((res) => {
            self._project = res.data instanceof Array ? res.data[0] : res.data;
            for(var k in self._project.plugins) {                
                self._project.plugins[k] = JSON.stringify(self._project.plugins[k], null, '  ');
                if(k==='oauth') self._project.plugins['oauth'] = self._project.plugins[k];
            }            
        });
    }]
}