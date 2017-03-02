module.exports = {
    name: 'logList',
    template: require('./list.html'),
    controller: ['$config', 'Log', '$window', function ($config, Log, $window) {
        let self = this;        
        this.fields = [];
        this.filterStatus = "";

        this.loadData = () => {
            Log.find(this.filterStatus).then((resp) => {
                self.logs = resp.data;
                if(self.logs.length > 0){
                    let i=0;
                    for(let k in self.logs[0]){
                        if(k === '_id') continue;
                        if(i++ < 5) {
                            self.fields.push(k);
                        }
                    }
                }
            });
        }        
        
        this.details = (item) => {
            self.log = item;
            self.open = true;
        }

        this.loadData();
    }]
}
