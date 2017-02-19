const _ = require('lodash');

const utils = require('../utils');
const db = require('../db');
const bodyHandler = require('../body.handler');
const SpendingsService = require('../service/Spendings.service');

/************************************
 ** CONTROLLER:   SpendingsController
 ** AUTHOR:       Unknown
 ** CREATED DATE: 2/19/2017, 1:39:01 PM
 *************************************/

app.get('/Spendings', async(req, res, next) => {
	try {
		let where = {};
		const rs = await SpendingsService.find({
			$where: where
		});
		res.send(rs);
	} catch (err) {
		next(err);
	}
});

app.get('/Spendings/:_id', async(req, res, next) => {
	try {
		const key = db.uuid(req.params._id);
		const rs = await SpendingsService.get(key);
		res.send(rs);
	} catch (err) {
		next(err);
	}
});

app.post('/Spendings', bodyHandler.jsonHandler({
	money: Number,
	des: String,
	type_spending_id: db.Uuid,
	wallet_id: db.Uuid,
	is_bookmark: Boolean,
	type: Number
}), async(req, res, next) => {
	try {
		const rs = await SpendingsService.insert(req.body);
		res.send(rs);
	} catch (err) {
		next(err);
	}
});

app.put('/Spendings/:_id', bodyHandler.jsonHandler({
	money: Number,
	des: String,
	type_spending_id: db.Uuid,
	wallet_id: db.Uuid,
	is_bookmark: Boolean,
	type: Number
}), async(req, res, next) => {
	try {
		req.body._id = db.uuid(req.params._id);
		const rs = await SpendingsService.update(req.body);
		res.send(rs);
	} catch (err) {
		next(err);
	}
});

app.delete('/Spendings/:_id', async(req, res, next) => {
	try {
		const key = db.uuid(req.params._id);
		const rs = await SpendingsService.delete(key);
		res.send(rs);
	} catch (err) {
		next(err);
	}
});