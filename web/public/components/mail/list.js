module.exports = {
    name: 'mailList',
    template: require('./list.html'),
    controller: ['$config', 'Mail', '$window', function ($config, Mail, $window) {
        require('./list.scss');        
        let self = this;
        this.filterStatus = "";

        this.loadData = () => {
            Mail.find(this.filterStatus).then((resp) => {
                self.mails = resp.data;
            });
        }        
        
        this.details = (item) => {
            self.mail = item;
            self.open = true;
        }

        this.delete = (item) => {
            if(!$window.confirm('Are you sure to delete ?')) return;
            Mail.delete(item._id).then((resp) => {
               this.loadData(); 
            });
        }

        this.loadData();
    }]
}
