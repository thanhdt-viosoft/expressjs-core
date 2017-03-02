const _ = require('lodash');

const db = require('../db');
const utils = require('../utils');
const checker = require('../checker');

/************************************
 ** SERVICE:      logController
 ** AUTHOR:       Unknown
 ** CREATED DATE: 2/16/2017, 3:49:05 PM
 *************************************/

exports = module.exports = {
	COLLECTION: "log",
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
				checker.must('project_id', item.project_id, db.Uuid);
				checker.must('account_id', item.account_id, db.Uuid);
				item.created_at = new Date();
				item.updated_at = new Date();

				break;
			case exports.VALIDATE.UPDATE:
				checker.must('_id', item._id._id, db.Uuid);
				checker.must('project_id', item._id.project_id, db.Uuid);
				item.updated_at = new Date();

				break;
			case exports.VALIDATE.GET:
				checker.must('_id', item._id, db.Uuid);
				checker.must('project_id', item.project_id, db.Uuid);

				break;
			case exports.VALIDATE.DELETE:
				checker.must('_id', item._id, db.Uuid);
				checker.must('project_id', item.project_id, db.Uuid);

				break;
			case exports.VALIDATE.FIND:

				break;
		}
		return item;
	},

	async find(fil = {}) {
		fil = exports.validate(fil, exports.VALIDATE.FIND);
		const rs = await db.find(exports.COLLECTION, fil);
		return rs;
	},

	async get(_id) {
		_id = exports.validate(_id, exports.VALIDATE.GET);
		const rs = await db.get(exports.COLLECTION, _id);
		return rs;
	},

	async insert(item) {
		item = exports.validate(item, exports.VALIDATE.INSERT);
		const rs = await db.insert(exports.COLLECTION, item);
		return rs;
	},

	async update(item) {
		item = exports.validate(item, exports.VALIDATE.UPDATE);
		const rs = await db.update(exports.COLLECTION, item);
		return rs;
	},

	async delete(_id) {
		_id = exports.validate(_id, exports.VALIDATE.DELETE);
		const rs = await db.delete(exports.COLLECTION, _id);
		return rs;
	}

}