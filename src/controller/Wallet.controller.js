const _ = require('lodash');

const utils = require('../utils');
const db = require('../db');
const bodyHandler = require('../body.handler');
const WalletService = require('../service/Wallet.service');

/************************************
 ** CONTROLLER:   WalletController
 ** AUTHOR:       Unknown
 ** CREATED DATE: 2/19/2017, 1:39:01 PM
 *************************************/

app.get('/Wallet', async(req, res, next) => {
	try {
		let where = {};
		const rs = await WalletService.find({
			$where: where
		});
		res.send(rs);
	} catch (err) {
		next(err);
	}
});

app.get('/Wallet/:_id', async(req, res, next) => {
	try {
		const key = db.uuid(req.params._id);
		const rs = await WalletService.get(key);
		res.send(rs);
	} catch (err) {
		next(err);
	}
});

app.post('/Wallet', bodyHandler.jsonHandler({
	icon: String,
	name: String,
	money: Number,
	oder: Number,
	type: Number
}), async(req, res, next) => {
	try {
		const rs = await WalletService.insert(req.body);
		res.send(rs);
	} catch (err) {
		next(err);
	}
});

app.put('/Wallet/:_id', bodyHandler.jsonHandler({
	icon: String,
	name: String,
	money: Number,
	oder: Number,
	type: Number
}), async(req, res, next) => {
	try {
		req.body._id = db.uuid(req.params._id);
		const rs = await WalletService.update(req.body);
		res.send(rs);
	} catch (err) {
		next(err);
	}
});

app.delete('/Wallet/:_id', async(req, res, next) => {
	try {
		const key = db.uuid(req.params._id);
		const rs = await WalletService.delete(key);
		res.send(rs);
	} catch (err) {
		next(err);
	}
});