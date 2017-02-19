const _ = require('lodash');

const utils = require('../utils');
const db = require('../db');
const bodyHandler = require('../body.handler');
const TypeSpendingsService = require('../service/TypeSpendings.service');

/************************************
 ** CONTROLLER:   TypeSpendingsController
 ** AUTHOR:       Unknown
 ** CREATED DATE: 2/19/2017, 1:39:01 PM
 *************************************/

app.get('/TypeSpendings', async(req, res, next) => {
	try {
		let where = {};
		const rs = await TypeSpendingsService.find({
			$where: where
		});
		res.send(rs);
	} catch (err) {
		next(err);
	}
});

app.get('/TypeSpendings/:_id', async(req, res, next) => {
	try {
		const key = db.uuid(req.params._id);
		const rs = await TypeSpendingsService.get(key);
		res.send(rs);
	} catch (err) {
		next(err);
	}
});

app.post('/TypeSpendings', bodyHandler.jsonHandler({
	icon: String,
	name: String,
	oder: Number,
	type: Number,
	parent_id: db.Uuid
}), async(req, res, next) => {
	try {
		const rs = await TypeSpendingsService.insert(req.body);
		res.send(rs);
	} catch (err) {
		next(err);
	}
});

app.put('/TypeSpendings/:_id', bodyHandler.jsonHandler({
	icon: String,
	name: String,
	oder: Number,
	type: Number,
	parent_id: db.Uuid
}), async(req, res, next) => {
	try {
		req.body._id = db.uuid(req.params._id);
		const rs = await TypeSpendingsService.update(req.body);
		res.send(rs);
	} catch (err) {
		next(err);
	}
});

app.delete('/TypeSpendings/:_id', async(req, res, next) => {
	try {
		const key = db.uuid(req.params._id);
		const rs = await TypeSpendingsService.delete(key);
		res.send(rs);
	} catch (err) {
		next(err);
	}
});