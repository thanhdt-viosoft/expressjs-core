const path = require('path');

const utils = require('../utils');
const db = require('../db');
const projectService = require('../service/project.service');

/************************************
 ** CONTROLLER:   projectController
 ** AUTHOR:       Unknown
 ** CREATED DATE: 2/15/2017, 5:22:39 PM
 *************************************/

app.get('/project', utils.jsonHandler(), async(req, res, next) => {
	try {
		let where = {};
		const rs = await projectService.find({
			where: where
		});
		res.send(rs);
	} catch (err) {
		next(err);
	}
});

app.get('/project/:_id', utils.jsonHandler(), async(req, res, next) => {
	try {
		const rs = await projectService.get(db.uuid(req.params._id));
		res.send(rs);
	} catch (err) {
		next(err);
	}
});

app.post('/project', utils.jsonHandler(), async(req, res, next) => {
	try {
		let body = {};
		if (utils.has(req.body.name)) body.name = req.body.name;
		if (utils.has(req.body.status)) body.status = +req.body.status;
		if (utils.has(req.body.plugins)) body.plugins = utils.object(req.body.plugins);

		const rs = await projectService.insert(body);
		res.send(rs);
	} catch (err) {
		next(err);
	}
})

app.put('/project/:_id', utils.jsonHandler('name', 'plugin'), async(req, res, next) => {
	try {
		req.body._id = db.uuid(req.params._id);
		const rs = await projectService.update(req.body);
		res.send(rs);
	} catch (err) {
		next(err);
	}
})

app.delete('/project/:_id', utils.jsonHandler(), async(req, res, next) => {
	try {
		const rs = await projectService.delete(db.uuid(req.params._id));
		res.send(rs);
	} catch (err) {
		next(err);
	}
})