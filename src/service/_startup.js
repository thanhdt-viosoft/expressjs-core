const projectService = require('./project.service');
const db = require('../db');

var main = async () => {        
    const projects = await projectService.find({});
    for(let p of projects) {
        await projectService.refeshCached(p._id, p);
    }
    console.log('Loaded data into cached');
};

main();