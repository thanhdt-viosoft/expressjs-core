const _ = require('lodash');

const utils = require('../utils');
const db = require('../db');
const encrypt = require('../../lib/core/encrypt');
const bodyHandler = require('../body.handler');

/************************************
 ** CONTROLLER:   clientController
 ** AUTHOR:       Unknown
 ** CREATED DATE: 2/6/2017, 2:46:21 PM
 *************************************/

app.post('/login', bodyHandler.jsonHandler({
    username: String,
    password: encrypt.md5
}), async(req, res, next) => {
	try {
		req.body.project_id = db.uuid(req.headers.pj);
		if (req.headers.app) req.body.app = req.headers.app;		
		const accountService = require('../service/account.service');
		const token = await accountService.login(req.body);
		res.header('token', token);
		res.end();
	} catch (err) {
		next(err);
	}
});

app.head('/authoriz', utils.authHandler(), async(req, res, next) => {
	try {
		if(req.headers.path) req.auth.path = req.headers.path;
		if(req.headers.actions) req.auth.actions = req.headers.actions.split(',');
		const accountService = require('../service/account.service');
		await accountService.authoriz(req.auth);
		res.header('token', `${req.auth.projectId}-${req.auth.accountId}-${req.auth.secretToken}`);
		res.end();
	} catch (error) {
		next(error);
	}
});

app.head('/ping', utils.authHandler(), async(req, res, next) => {
	try {				
		const accountService = require('../service/account.service');
		await accountService.ping(req.auth);
		res.end();
	} catch (err) {
		next(err);
	}
});

app.post('/upload-image', async (req, res, next) => {
	if(!req.headers.pj) return next(Error.create(Error.AUTHORIZ, 'Got no permission to upload'));
	const projectService = require('../service/project.service');
	const project = await projectService.get(db.uuid(req.headers.pj));
	if(!project) return next(Error.create(Error.AUTHORIZ, 'Got no permission to upload.'));
	next();
}, bodyHandler.fileHandler({
	file: {
		saveTo: "`assets/upload/${req.headers.pj}/`",
		maxCount: 1,
		isFull: false,
		returnPath: "`/upload/${req.headers.pj}/${filename}`",
		limits: 10000
	}
}), async(req, res, next) => {
	try {
		res.send(req.file.file);
	} catch (err) {
		next(err);
	}
});

app.get('/me', utils.authHandler(true), async(req, res, next) => {
	try {
		const accountService = require('../service/account.service');
		const rs = await accountService.getMe({
			$where: {
				_id: req.auth.accountId,
                project_id: req.auth.projectId
			},
			$fields: {
				_id: 1,
				username: 1,
				recover_by: 1,
				more: 1
			}
		});
		res.send(rs);
	} catch (err) {
		next(err);
	}
});

app.put('/me', bodyHandler.jsonHandler({
    password: encrypt.md5,
    recover_by: String,
    more: Object
}), utils.authHandler(true), async(req, res, next) => {
	try {
		req.body._id = {
            _id: req.auth.accountId,
            project_id: req.auth.project_id
        };
		const accountService = require('../service/account.service');
		const rs = await accountService.update(body);
		res.send(rs);
	} catch (err) {
		next(err);
	}
});

app.post('/register', bodyHandler.jsonHandler({
    role_ids: Array,
    app: String,
    username: String,
    password: encrypt.md5,
    status: Number,
    recover_by: String,
    more: Object
}), async(req, res, next) => {
	try {
		let body = {};
		req.body.project_id = db.uuid(req.headers.pj);
		const accountService = require('../service/account.service');
		const rs = await accountService.insert(req.body);
		if(req.query.auto_login){
			const token = await accountService.login(req.body);
			res.header('token', token);
		}
		res.send(rs);
	} catch (err) {
		next(err);
	}
});