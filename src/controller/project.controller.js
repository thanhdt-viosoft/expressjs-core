const path = require('path');

const utils = require('../utils');
const db = require('../db');
const bodyHandler = require('../body.handler');
const projectService = require('../service/project.service');

/************************************
 ** CONTROLLER:   projectController
 ** AUTHOR:       Unknown
 ** CREATED DATE: 2/16/2017, 2:09:50 PM
 *************************************/

app.get('/project', async(req, res, next) => {
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

app.get('/project/:_id', async(req, res, next) => {
	try {
		const key = db.uuid(req.params._id);
		const rs = await projectService.get(key);
		res.send(rs);
	} catch (err) {
		next(err);
	}
});

app.post('/project', bodyHandler.fileHandler({
	image: {
		saveTo: "`assets/images`",
		maxCount: true,
		returnPath: "`/images/${filename}`",
		limits: 10000,
		resize: global.appconfig.app.imageResize.product
	}
}), async(req, res, next) => {
	try {
		const rs = await projectService.insert(req.body);
		res.send(rs);
	} catch (err) {
		next(err);
	}
})

app.put('/project/:_id', bodyHandler.fileHandler({
	image: {
		saveTo: "`assets/images`",
		maxCount: true,
		returnPath: "`/images/${filename}`",
		limits: 10000,
		resize: global.appconfig.app.imageResize.product
	}
}), async(req, res, next) => {
	try {
		req.body._id = db.uuid(req.params._id);
		const rs = await projectService.update(req.body);
		res.send(rs);
	} catch (err) {
		next(err);
	}
})

app.delete('/project/:_id', async(req, res, next) => {
	try {
		const key = db.uuid(req.params._id);
		const rs = await projectService.delete(key);
		res.send(rs);
	} catch (err) {
		next(err);
	}
})