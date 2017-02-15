const path = require('path');
const _ = require('lodash');

const db = require('../db');
const utils = require('../utils');
const checker = require('../checker');

/************************************
 ** SERVICE:      projectController
 ** AUTHOR:       Unknown
 ** CREATED DATE: 2/16/2017, 12:50:30 AM
 *************************************/

exports = module.exports = {
	COLLECTION: "project",
	VALIDATE: {
		INSERT: 0,
		UPDATE: 1,
		GET: 2,
		DELETE: 3,
		FIND: 4,
	},
	validate(item, action) {
		let msg;
		switch (action) {
			case exports.VALIDATE.INSERT:
				item._id = db.uuid();
				checker.must('name', item.name, String);
				checker.must('status', item.status, Number, 0);
				checker.must('plugins', item.plugins, Object);
				checker.must('oauthv2', item.plugins.oauthv2, Object);
				checker.must('_id', item.plugins.oauthv2._id, db.Uuid);
				checker.must('single_mode', item.plugins.oauthv2.single_mode, Boolean);
				checker.must('session_expired', item.plugins.oauthv2.session_expired, Number);
				checker.must('mustbe', item.mustbe, Object, {
					oauthv2: {}
				});
				checker.must('oauthv2', item.mustbe.oauthv2, Object);
				checker.must('_id', item.mustbe.oauthv2._id, db.Uuid);
				checker.must('single_mode', item.mustbe.oauthv2.single_mode, Boolean);
				checker.must('session_expired', item.mustbe.oauthv2.session_expired, Number);
				item.created_at = new Date();
				item.updated_at = new Date();

				break;
			case exports.VALIDATE.UPDATE:
				checker.must('_id', item._id, db.Uuid);
				checker.option('name', item.name, String);
				checker.option('status', item.status, Number);
				checker.option('plugins', item.plugins, Object, (plugins) => {
					checker.option('oauthv2', plugins.oauthv2, Object, (oauthv2) => {
						checker.option('_id', oauthv2._id, db.Uuid);
						checker.option('single_mode', oauthv2.single_mode, Boolean);
						checker.option('session_expired', oauthv2.session_expired, Number);
					});
				});
				checker.option('mustbe', item.mustbe, Object, (mustbe) => {
					checker.option('oauthv2', mustbe.oauthv2, Object, (oauthv2) => {
						checker.option('_id', oauthv2._id, db.Uuid);
						checker.option('single_mode', oauthv2.single_mode, Boolean);
						checker.option('session_expired', oauthv2.session_expired, Number);
					});
				});
				item.updated_at = new Date();

				break;
			case exports.VALIDATE.GET:
				item = checker.must('_id', item, db.Uuid);

				break;
			case exports.VALIDATE.DELETE:
				item = checker.must('_id', item, db.Uuid);

				break;
			case exports.VALIDATE.FIND:


				break;
		}
		return item;
	},

	async find(fil = {}, dbo) {
		fil = exports.validate(fil, exports.VALIDATE.FIND);

		const dboType = dbo ? db.FAIL : db.DONE;
		dbo = dbo ? await dbo.change(exports.COLLECTION) : await db.open(exports.COLLECTION);
		const rs = await dbo.find(fil, dboType);
		return rs;
	},

	async get(_id, dbo) {
		_id = exports.validate(_id, exports.VALIDATE.GET);

		const dboType = dbo ? db.FAIL : db.DONE;
		dbo = dbo ? await dbo.change(exports.COLLECTION) : await db.open(exports.COLLECTION);
		const rs = await dbo.get(_id, dboType);
		return rs;
	},

	async insert(item, dbo) {
		item = exports.validate(item, exports.VALIDATE.INSERT);

		const dboType = dbo ? db.FAIL : db.DONE;
		dbo = dbo ? await dbo.change(exports.COLLECTION) : await db.open(exports.COLLECTION);
		const rs = await dbo.insert(item, dboType);
		return rs;
	},

	async update(item, dbo) {
		item = exports.validate(item, exports.VALIDATE.UPDATE);

		const dboType = dbo ? db.FAIL : db.DONE;
		dbo = dbo ? await dbo.change(exports.COLLECTION) : await db.open(exports.COLLECTION);
		const rs = await dbo.update(item, dboType);

		return rs;
	},

	async delete(_id, dbo) {
		_id = exports.validate(_id, exports.VALIDATE.DELETE);

		const dboType = dbo ? db.FAIL : db.DONE;
		dbo = dbo ? await dbo.change(exports.COLLECTION) : await db.open(exports.COLLECTION);
		const rs = await dbo.delete(_id, dboType);

		return rs;
	}

}