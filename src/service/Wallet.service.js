const path = require('path');
const _ = require('lodash');

const db = require('../db');
const utils = require('../utils');
const checker = require('../checker');

/************************************
 ** SERVICE:      WalletController
 ** AUTHOR:       Unknown
 ** CREATED DATE: 2/19/2017, 1:39:01 PM
 *************************************/

exports = module.exports = {
	COLLECTION: "Wallet",
	VALIDATE: {
		INSERT: 0,
		UPDATE: 1,
		GET: 2,
		DELETE: 3,
		FIND: 4,
	},
	validate(item, action) {
		switch (action) {
			case exports.VALIDATE.INSERT:
				item._id = db.uuid();
				checker.must('icon', item.icon, String);
				checker.must('name', item.name, String);
				checker.must('money', item.money, Number);
				checker.must('oder', item.oder, Number);
				checker.must('type', item.type, Number);
				item.created_at = new Date();
				item.updated_at = new Date();

				break;
			case exports.VALIDATE.UPDATE:
				checker.must('_id', item._id, db.Uuid);
				checker.option('icon', item.icon, String);
				checker.option('name', item.name, String);
				checker.option('money', item.money, Number);
				checker.option('oder', item.oder, Number);
				checker.option('type', item.type, Number);
				item.updated_at = new Date();

				break;
			case exports.VALIDATE.GET:
				checker.must('_id', item, db.Uuid);

				break;
			case exports.VALIDATE.DELETE:
				checker.must('_id', item, db.Uuid);

				break;
			case exports.VALIDATE.FIND:


				break;
		}
		return item;
	},

	async find(fil = {}, dbo) {
		fil = exports.validate(fil, exports.VALIDATE.FIND);

		dbo = await db.open(exports.COLLECTION, dbo);
		const rs = await dbo.find(fil, dbo.isnew ? db.DONE : db.FAIL);
		return rs;
	},

	async get(_id, dbo) {
		_id = exports.validate(_id, exports.VALIDATE.GET);

		dbo = await db.open(exports.COLLECTION, dbo);
		const rs = await dbo.get(_id, dbo.isnew ? db.DONE : db.FAIL);
		return rs;
	},

	async insert(item, dbo) {
		item = exports.validate(item, exports.VALIDATE.INSERT);

		dbo = await db.open(exports.COLLECTION, dbo);
		const rs = await dbo.insert(item, dbo.isnew ? db.DONE : db.FAIL);
		return rs;
	},

	async update(item, dbo) {
		item = exports.validate(item, exports.VALIDATE.UPDATE);

		dbo = await db.open(exports.COLLECTION, dbo);
		const rs = await dbo.update(item, dbo.isnew ? db.DONE : db.FAIL);

		return rs;
	},

	async delete(_id, dbo) {
		_id = exports.validate(_id, exports.VALIDATE.DELETE);

		dbo = await db.open(exports.COLLECTION, dbo);
		const rs = await dbo.delete(_id, dbo.isnew ? db.DONE : db.FAIL);

		return rs;
	}

}