exports = module.exports = class QueueHandler {
    constructor(fcGetObject, fcReleaseObject, timeout){
        this.queues = [];
        this.timeout = timeout || 5000;
        this.getObject = fcGetObject;
        this.releaseObject = fcReleaseObject;
        if(!this.getObject || !this.releaseObject) throw 'Could not found init or destroy object method';
    }
    size() {
        return this.queues.length;
    }
    release(item){
        this.queues.push(item.autoclose(true));
    }
    async get() {
        if(this.queues.length === 0) {
            const item = await this.getObject();       
            const self = this;                 
            item.autoclose = (isAutoClose) => {                
                if(!isAutoClose) {
                    clearTimeout(item.tm);
                } else {
                    item.tm = setTimeout(async () => {
                        self.queues.splice(self.queues.indexOf(item), 1);
                        await self.releaseObject(item);
                    }, self.timeout);
                }
                return item;
            }
            return item;
        }
        return this.queues.pop().autoclose(false);
    }
}