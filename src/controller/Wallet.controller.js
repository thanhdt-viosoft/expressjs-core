const _ = require('lodash');

const utils = require('../utils');
const db = require('../db');
const bodyHandler = require('../body.handler');
const WalletService = require('../service/wallet.service');

/************************************
 ** CONTROLLER:   WalletController
 ** AUTHOR:       Unknown
 ** CREATED DATE: 2/19/2017, 1:39:01 PM
 *************************************/

app.get('/wallet', utils.auth('Wallet', 'FIND'), async(req, res, next) => {
	try {
		if(!_.isNil(req.query.type)) where["wallets.type"] = +req.query.type;
		const rs = await WalletService.find({
			$where: where,
			$sort: {
				'wallets.type': -1,
				'wallets.oder': 1,
				'wallets.name': 1
			}
		}, req.auth);
		res.send(rs);
	} catch (err) {
		next(err);
	}
});

app.get('/wallet/:_id', utils.auth('Wallet', 'GET'), async(req, res, next) => {
	try {
		const key = db.uuid(req.params._id);
		const rs = await SpendingsService.get(key, req.auth);
		res.send(rs);
	} catch (err) {
		next(err);
	}
});

app.post('/wallet', utils.auth('Wallet', 'ADD'), bodyHandler.jsonHandler({
	icon: String,
	name: String,
	input_date: Date,
	isApplyToSpending: Boolean,
	des: true,
	money: Number,
	oder: Number,
	type: Number
}), async(req, res, next) => {
	try {
		const rs = await WalletService.insert(req.body, req.auth);
		res.send(rs);
	} catch (err) {
		next(err);
	}
});

app.put('/wallet/Transfer', utils.auth('Wallet', 'TRANSFER'), bodyHandler.jsonHandler({
	from: String,
	to: String,
	input_date: Date,
	des: true,
	money: Number	
}), async(req, res, next) => {
	try {
		req.body._id = db.uuid(req.params._id);
		const rs = await WalletService.transfer(req.body, req.auth);
		res.send(rs);
	} catch (err) {
		next(err);
	}
});

app.put('/wallet/:_id', utils.auth('Wallet', 'UPDATE'), bodyHandler.jsonHandler({
	icon: String,
	name: String,
	input_date: Date,
	isApplyToSpending: Boolean,
	des: true,
	money: Number,
	oder: Number,
	type: Number
}), async(req, res, next) => {
	try {
		req.body._id = db.uuid(req.params._id);
		const rs = await WalletService.update(req.body, req.auth);
		res.send(rs);
	} catch (err) {
		next(err);
	}
});

app.delete('/wallet/:_id', utils.auth('Wallet', 'DELETE'), async(req, res, next) => {
	try {
		const key = db.uuid(req.params._id);
		const rs = await WalletService.delete(key, req.auth);
		res.send(rs);
	} catch (err) {
		next(err);
	}
});