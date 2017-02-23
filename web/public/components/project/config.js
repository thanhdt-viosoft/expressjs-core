module.exports = {
    name: 'config',
    template: require('./config.html'),
    controller: ['$config', '$location', '$window', 'Project', function ($config, $location, $window, Project) {
        require('./config.scss');
        let self = this;
        this.ourService = $config.services; 
        this.loadConfig = (key) => {
            self.key = key;
            if(!self._project.plugins[key]) {
                Project.config(key).then((resp) => {
                    self._project.plugins[key] = JSON.stringify(resp.data, null, '  ');
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
                }).catch((err) => {
                    console.log(err);
                });
            }catch(e){
                console.log('Config file is wrong format');
            }
        };

        this.sendRedirect = () => {
            $location.path('/');
        }

        Project.get().then((res) => {
            self._project = res.data;
            for(var k in self._project.plugins) {
                self._project.plugins[k] = JSON.stringify(self._project.plugins[k], null, '  ');
            }            
        }).catch((err) => {
            console.log(err);
        });
    }]
}