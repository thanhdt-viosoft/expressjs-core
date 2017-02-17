const _ = require('lodash');

const utils = require('../utils');
const db = require('../db');
const bodyHandler = require('../body.handler');
const projectService = require('../service/project.service');

/************************************
 ** CONTROLLER:   projectController
 ** AUTHOR:       Unknown
 ** CREATED DATE: 2/17/2017, 9:42:39 AM
 *************************************/

app.get('/project', utils.auth(`${global.appconfig.name}>project`, 'FIND'), async(req, res, next) => {
	try {		
		if(projectService.ROOT_PROJECT_ID !== req.auth.projectId) {
			const rs = await projectService.get({
				_id: req.auth.projectId
			});
			res.send(rs);
		} else {
			const where = {};
			const rs = await projectService.find({
				$where: where,
				$sort: {
					status: -1,
					updated_at: -1
				}
			});
			res.send(rs);
		}
	} catch (err) {
		next(err);
	}
});

app.get('/project/:_id', utils.auth(`${global.appconfig.name}>project`, 'GET'), async(req, res, next) => {	
	try {
		if(projectService.ROOT_PROJECT_ID !== req.auth.projectId) throw Error.create(ERROR.AUTHORIZ);
		const key = db.uuid(req.params._id);
		const rs = await projectService.get(key);
		res.send(rs);
	} catch (err) {
		next(err);
	}
});

app.post('/project', utils.auth(`${global.appconfig.name}>project`, 'ADD'), bodyHandler.jsonHandler({
	name: String,
	status: Number,
	plugins: Object
}), async(req, res, next) => {
	try {
		if(projectService.ROOT_PROJECT_ID !== req.auth.projectId) throw Error.create(ERROR.AUTHORIZ);
		const rs = await projectService.insert(req.body);
		res.send(rs);
	} catch (err) {
		next(err);
	}
});

app.put('/project/:_id', utils.auth(`${global.appconfig.name}>project`, 'UPDATE'), bodyHandler.jsonHandler({
	name: String,
	status: Number,
	plugins: Object
}), async(req, res, next) => {
	try {
		if(projectService.ROOT_PROJECT_ID !== req.auth.projectId) throw Error.create(ERROR.AUTHORIZ);
		req.body._id = db.uuid(req.params._id);
		const rs = await projectService.update(req.body);
		res.send(rs);
	} catch (err) {
		next(err);
	}
});

app.delete('/project/:_id', utils.auth(`${global.appconfig.name}>project`, 'DELETE'), async(req, res, next) => {
	try {
		if(projectService.ROOT_PROJECT_ID !== req.auth.projectId) throw Error.create(ERROR.AUTHORIZ);
		const key = db.uuid(req.params._id);
		const rs = await projectService.delete(key);
		res.send(rs);
	} catch (err) {
		next(err);
	}
});