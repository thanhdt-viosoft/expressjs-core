exports = module.exports = class QueueHandler {
    constructor(fcGetObject, fcReleaseObject, timeout){
        this.queues = {default: []};
        this.timeout = timeout || 5000;
        this.getObject = fcGetObject;
        this.releaseObject = fcReleaseObject;
        if(!this.getObject || !this.releaseObject) throw 'Could not found init or destroy object method';
    }
    size(key="default") {
        return this.queues[key].length;
    }
    release(item, key="default"){
        this.queues[key].push(item.autoclose(true));
    }
    async get(key="default") {
        if(this.queues[key].length === 0) {
            const item = await this.getObject();       
            const self = this;                 
            item.autoclose = (isAutoClose) => {                
                if(!isAutoClose) {
                    clearTimeout(item.tm);
                } else {
                    item.tm = setTimeout(async () => {
                        self.queues[key].splice(self.queues[key].indexOf(item), 1);
                        await self.releaseObject(item);
                    }, self.timeout);
                }
                return item;
            }
            return item;
        }
        return this.queues[key].pop().autoclose(false);
    }
}