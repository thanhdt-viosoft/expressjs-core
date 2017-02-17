const _ = require('lodash');

const utils = require('../utils');
const db = require('../db');
const bodyHandler = require('../body.handler');
const mailService = require('../service/mail.service');

/************************************
 ** CONTROLLER:   mailController
 ** AUTHOR:       Unknown
 ** CREATED DATE: 2/16/2017, 4:42:00 PM
 *************************************/

app.get('/mail', utils.auth(`${global.appconfig.name}>mail`, 'FIND'), async(req, res, next) => {
	try {
		let where = req.query.q ? JSON.parse(req.query.q) : {};
		where.project_id = req.auth.projectId;
		const rs = await mailService.find({
			$where: where,
			$sort: {
				updated_at: 1
			}
		});
		res.send(rs);
	} catch (err) {
		next(err);
	}
});

app.get('/mail/:_id', utils.auth(`${global.appconfig.name}>mail`, 'GET'), async(req, res, next) => {
	try {
		const key = {
			_id: db.uuid(req.params._id),
			project_id: req.auth.projectId
		};
		const rs = await mailService.get(key);
		res.send(rs);
	} catch (err) {
		next(err);
	}
});

app.post('/attachments', bodyHandler.fileHandler({
	attachments: {
		saveTo: "`assets/attachments`",
		maxCount: 5,
		isFull: true,
		returnPath: "`/attachments/${filename}`",
		limits: 10000
	}
}), async(req, res, next) => {
	try {
		res.send(req.body.attachments.map((e) => {
			return {
				name: e.originalname,
				path: e.filename
			};
		}));
	} catch (err) {
		next(err);
	}
})

app.post('/mail', bodyHandler.jsonHandler({
	title: String,
	content: String,
	html: Boolean,
	from: Object,
	to: Array,
	cc: Array,
	bcc: Array,
	attachments: Array,
	config_name: String
}), utils.auth(`${global.appconfig.name}>mail`, 'ADD'), async(req, res, next) => {
	try {
		req.body.project_id = req.auth.projectId;
		const rs = await mailService.insert(req.body, req.body.config_name, req.auth);
		res.send(rs);
	} catch (err) {
		next(err);
	}
})

app.delete('/mail/:_id', utils.auth(`${global.appconfig.name}>mail`, 'DELETE'), async(req, res, next) => {
	try {
		const key = {
			_id: db.uuid(req.params._id),
			project_id: req.auth.projectId
		};
		const rs = await mailService.delete(key);
		res.send(rs);
	} catch (err) {
		next(err);
	}
})