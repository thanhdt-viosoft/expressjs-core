const _ = require('lodash');

const utils = require('../utils');
const db = require('../db');
const bodyHandler = require('../body.handler');
const roleService = require('../service/role.service');

/************************************
 ** CONTROLLER:   roleController
 ** AUTHOR:       Unknown
 ** CREATED DATE: 2/17/2017, 10:01:49 AM
 *************************************/

app.get('/role', utils.auth(`${global.appconfig.name}>role`, 'FIND'), async(req, res, next) => {
	try {
		let where = req.query.q ? JSON.parse(req.query.q) : {};
		let fields = req.query.f ? JSON.parse(req.query.f) : undefined;
		where.project_id = req.auth.projectId;
		const rs = await roleService.find({
			$where: where,
			$fields: fields
		});
		res.send(rs);
	} catch (err) {
		next(err);
	}
});

app.get('/role/:_id', utils.auth(`${global.appconfig.name}>role`, 'GET'), async(req, res, next) => {
	try {
		const rs = await roleService.get({
			_id: db.uuid(req.params._id),
			project_id: req.auth.projectId
		});
		res.send(rs);
	} catch (err) {
		next(err);
	}
});

app.post('/role', utils.auth(`${global.appconfig.name}>role`, 'ADD'), bodyHandler.jsonHandler({
	name: String,
	api: Array,
	web: Array,
	mob: Array
}), async(req, res, next) => {
	try {
		req.body.project_id = req.auth.projectId;
		const rs = await roleService.insert(req.body);
		res.send(rs);
	} catch (err) {
		next(err);
	}
});

app.put('/role/:_id', utils.auth(`${global.appconfig.name}>role`, 'UPDATE'), bodyHandler.jsonHandler({
	name: String,
	api: Array,
	web: Array,
	mob: Array
}), async(req, res, next) => {
	try {
		req.body._id = {
			_id: db.uuid(req.params._id),
			project_id: req.auth.projectId
		};
		const rs = await roleService.update(req.body);
		res.send(rs);
	} catch (err) {
		next(err);
	}
});

app.delete('/role/:_id', utils.auth(`${global.appconfig.name}>role`, 'DELETE'), async(req, res, next) => {
	try {
		const rs = await roleService.delete({
			_id: db.uuid(req.params._id),
			project_id: req.auth.projectId
		});
		res.send(rs);
	} catch (err) {
		next(err);
	}
});