const _ = require('lodash');

const db = require('../db');
const utils = require('../utils');
const bodyHandler = require('../body.handler');
const logService = require('../service/log.service');

/************************************
 ** CONTROLLER:   logController
 ** AUTHOR:       Unknown
 ** CREATED DATE: 2/16/2017, 3:49:05 PM
 *************************************/

app.get('/log', utils.auth(`${global.appconfig.name}>log`, 'FIND'), async(req, res, next) => {
	try {
		let where = req.query.q ? JSON.parse(req.query.q) : {};		
		where.project_id = req.auth.projectId;		
		const rs = await logService.find({
			$where: where,
			$fields: {
				project_id: 0
			},
			$sort: {
				updated_at: -1
			}
		});
		res.send(rs);
	} catch (err) {
		next(err);
	}
});

app.get('/log/:_id', utils.auth(`${global.appconfig.name}>log`, 'GET'), async(req, res, next) => {
	try {
		const rs = await logService.get({
			$where: {
				_id: db.uuid(req.params._id),
				project_id: req.auth.projectId
			}, 
			$fields: {
				project_id: 0
			}
		});
		res.send(rs);
	} catch (err) {
		next(err);
	}
});

app.post('/log', bodyHandler.jsonHandler(), utils.auth(`${global.appconfig.name}>log`, 'ADD'), async(req, res, next) => {
	try {
		if(!_.isPlainObject(req.body) || Object.keys(req.body).length === 0) throw Error.create(Error.BAD_REQUEST, 'Data is required');
		delete req.body.created_at;
		delete req.body.updated_at;

		let body = {};
		body.project_id = req.auth.projectId;
		body.account_id = req.auth.accountId;
		body = _.merge({}, req.body, body);
		const rs = await logService.insert(body);
		res.send(rs);
	} catch (err) {
		next(err);
	}
});

app.put('/log/:_id', bodyHandler.jsonHandler(), utils.auth(`${global.appconfig.name}>log`, 'UPDATE'), async(req, res, next) => {
	try {
		if(!_.isPlainObject(req.body) || Object.keys(req.body).length === 0) throw Error.create(Error.BAD_REQUEST, 'Data is required');
		delete req.body.created_at;
		delete req.body.updated_at;

		let body = {};
		body._id = {
			_id: db.uuid(req.params._id),
			project_id: req.auth.projectId
		};
		body = _.merge({}, req.body, body);
		const rs = await logService.update(body);
		res.send(rs);
	} catch (err) {
		next(err);
	}
});

app.delete('/log/:_id', utils.auth(`${global.appconfig.name}>log`, 'DELETE'), async(req, res, next) => {
	try {
		const rs = await logService.delete({
			_id: db.uuid(req.params._id),
			project_id: req.auth.projectId			
		});
		res.send(rs);
	} catch (err) {
		next(err);
	}
});