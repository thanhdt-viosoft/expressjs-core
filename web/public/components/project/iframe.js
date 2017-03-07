module.exports = {
    name: 'ifrm',
    template: require('./iframe.html'),
    controller: ['$config', function ($config) {
        require('./iframe.scss');
        this.$routerOnActivate = (next) => {
            
        }
        
        let self = this;
        self._temp = {};
        self.count = 4;
        self.data = [
            {
                'id':'1',
                'isbn' : '7821',
                'title': 'Book of earth',
                'author':'Kalou',
                'category':'Magic book',
            },
            {
                'id':'2',
                'isbn' : '7822',
                'title': 'Book of Fire',
                'author':'Kalou',
                'category':'Magic book',
            },
            {
                'id':'3',
                'isbn' : '7823',
                'title': 'Book of Water',
                'author':'Kalou',
                'category':'Magic book',
            },
            {
                'id':'4',
                'isbn' : '7824',
                'title': 'Book of Air',
                'author':'Kalou',
                'category':'Magic book',
            }
        ];
        
        this.save = () => {
            self.count += 1;
            self._temp.id = self.count;
            self.data.splice(0,0,self._temp);
            self._temp = {};
        }
        
    }]
}
