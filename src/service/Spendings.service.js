const path = require('path');
const _ = require('lodash');

const db = require('../db');
const utils = require('../utils');
const checker = require('../checker');

/************************************
 ** SERVICE:      SpendingsController
 ** AUTHOR:       Unknown
 ** CREATED DATE: 2/19/2017, 1:39:01 PM
 *************************************/

exports = module.exports = {
	COLLECTION: "Spendings",
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
				checker.must('money', item.money, Number);
				checker.must('input_date', item.input_date, Date);
				checker.must('des', item.des, String);
				checker.must('type_spending_id', item.type_spending_id, db.Uuid);
				checker.must('wallet_id', item.wallet_id, db.Uuid);
				checker.must('is_bookmark', item.is_bookmark, Boolean);
				checker.must('type', item.type, Number);
				item.created_at = new Date();
				item.updated_at = new Date();

				break;
			case exports.VALIDATE.UPDATE:
				checker.must('_id', item._id, db.Uuid);
				checker.option('money', item.money, Number);
				checker.option('input_date', item.input_date, Date);
				checker.option('des', item.des, String);
				checker.option('type_spending_id', item.type_spending_id, db.Uuid);
				checker.option('wallet_id', item.wallet_id, db.Uuid);
				checker.option('is_bookmark', item.is_bookmark, Boolean);
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