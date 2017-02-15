const path = require('path');

const utils = require('../utils');
const db = require('../db');
const projectService = require('../service/project.service');

/************************************
 ** CONTROLLER:   projectController
 ** AUTHOR:       Unknown
 ** CREATED DATE: 2/15/2017, 11:52:24 PM
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
		const key = db.uuid(req.params._id);
		const rs = await projectService.get(key);
		res.send(rs);
	} catch (err) {
		next(err);
	}
});

app.post('/project', utils.jsonHandler({
	name: String,
	status: Number,
	plugins: Object
}), async(req, res, next) => {
	try {
		const rs = await projectService.insert(req.body);
		res.send(rs);
	} catch (err) {
		next(err);
	}
})

app.put('/project/:_id', utils.jsonHandler({
	name: String,
	status: Number,
	plugins: Object
}), async(req, res, next) => {
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
		const key = db.uuid(req.params._id);
		const rs = await projectService.delete(key);
		res.send(rs);
	} catch (err) {
		next(err);
	}
})