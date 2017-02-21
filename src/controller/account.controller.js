const _ = require('lodash');

const utils = require('../utils');
const db = require('../db');
const encrypt = require('../../lib/core/encrypt');
const bodyHandler = require('../body.handler');
const accountService = require('../service/account.service');

/************************************
 ** CONTROLLER:   accountController
 ** AUTHOR:       Unknown
 ** CREATED DATE: 2/17/2017, 10:36:37 AM
 *************************************/

app.get('/account', utils.auth(`${global.appconfig.name}>account`, 'FIND'), async(req, res, next) => {
	try {
		let where = req.query.q ? JSON.parse(req.query.q) : {};
		where.project_id = req.auth.projectId;
		const rs = await accountService.find({
			$where: where,
			$sort: {
				updated_at: -1
			}
		});
		res.send(rs);
	} catch (err) {
		next(err);
	}
});

app.get('/account/:_id', utils.auth(`${global.appconfig.name}>account`, 'GET'), async(req, res, next) => {
	try {
		const rs = await accountService.get({
			_id: db.uuid(req.params._id),
			project_id: req.auth.projectId
		});
		res.send(rs);
	} catch (err) {
		next(err);
	}
});

app.post('/account', utils.auth(`${global.appconfig.name}>account`, 'ADD'), bodyHandler.jsonHandler({
	role_ids: (role_ids) => {
		return role_ids.map(db.uuid);
	},
	app: String,
	username: String,
	password: encrypt.md5,
	status: Number,
	recover_by: String,
	more: Object
}), async(req, res, next) => {
	try {
		req.body.project_id = req.auth.projectId;
		const rs = await accountService.insert(req.body);
		res.send(rs);
	} catch (err) {
		next(err);
	}
});

app.put('/account/:_id', utils.auth(`${global.appconfig.name}>account`, 'UPDATE'), bodyHandler.jsonHandler({
	project_id: db.Uuid,
	role_ids: (role_ids) => {
		return role_ids.map(db.uuid);
	},
	app: String,
	username: String,
	password: encrypt.md5,
	secret_key: Boolean,
	status: Number,
	recover_by: String,
	more: Object
}), async(req, res, next) => {
	try {
		req.body._id = {
			_id: db.uuid(req.params._id),
			project_id: req.auth.projectId
		};
		const rs = await accountService.update(req.body);
		res.send(rs);
	} catch (err) {
		next(err);
	}
});

app.delete('/account/:_id', utils.auth(`${global.appconfig.name}>account`, 'DELETE'), async(req, res, next) => {
	try {
		const rs = await accountService.delete({
			_id: db.uuid(req.params._id),
			project_id: req.auth.projectId
		});
		res.send(rs);
	} catch (err) {
		next(err);
	}
});