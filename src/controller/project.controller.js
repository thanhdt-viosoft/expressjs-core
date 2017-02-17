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
		if(projectService.ROOT_PROJECT_ID.toString() !== req.auth.projectId.toString()) {
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
		if(projectService.ROOT_PROJECT_ID.toString() !== req.auth.projectId.toString()) throw Error.create(Error.AUTHORIZ);
		const key = db.uuid(req.params._id);
		const rs = await projectService.get(key);
		res.send(rs);
	} catch (err) {
		next(err);
	}
});

app.get('/project-config', utils.auth(`${global.appconfig.name}>project`, 'GET_CONFIG'), async(req, res, next) => {
	try {
		const rs = await projectService.getConfig(req.auth.projectId, req.query.plugin);
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
		if(projectService.ROOT_PROJECT_ID.toString() !== req.auth.projectId.toString()) throw Error.create(Error.AUTHORIZ);
		const rs = await projectService.insert(req.body);
		res.send(rs);
	} catch (err) {
		next(err);
	}
});

app.put('/project', bodyHandler.jsonHandler({
    name: String,
    plugins: Object
}), utils.auth(`${global.appconfig.name}>project`, 'UPDATE'), async(req, res, next) => {
	try {
		req.body._id = req.auth.projectId;
		const rs = await projectService.update(req.body);
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
		if(projectService.ROOT_PROJECT_ID.toString() !== req.auth.projectId.toString()) throw Error.create(Error.AUTHORIZ);
		req.body._id = db.uuid(req.params._id);
		const rs = await projectService.update(req.body);
		res.send(rs);
	} catch (err) {
		next(err);
	}
});

app.delete('/project/:_id', utils.auth(`${global.appconfig.name}>project`, 'DELETE'), async(req, res, next) => {
	try {
		if(projectService.ROOT_PROJECT_ID.toString() !== req.auth.projectId.toString()) throw Error.create(Error.AUTHORIZ);
		const key = db.uuid(req.params._id);
		const rs = await projectService.delete(key);
		res.send(rs);
	} catch (err) {
		next(err);
	}
});