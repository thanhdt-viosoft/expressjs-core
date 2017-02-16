const path = require('path');
const _ = require('lodash');

const db = require('../db');
const utils = require('../utils');
const checker = require('../checker');

/************************************
 ** SERVICE:      projectController
 ** AUTHOR:       Unknown
 ** CREATED DATE: 2/16/2017, 2:09:50 PM
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
				checker.must('roles', item.roles, Array);
				checker.must('abc', item.abc, Array, [{
					username: "thanh"
				}]);
				for (abc of item.abc) {
					checker.must('username', abc.username, String);
					checker.option('password', abc.password, String);
				}
				checker.must('image', item.image, String);
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
				checker.option('roles', item.roles, Array);
				checker.option('abc', item.abc, Array, (abc) => {
					for (abc of item.abc) {
						checker.option('username', abc.username, String);
						checker.option('password', abc.password, String);
					}
				});
				checker.option('image', item.image, String);
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
		try {
			item = exports.validate(item, exports.VALIDATE.INSERT);

			dbo = await db.open(exports.COLLECTION, dbo);
			const rs = await dbo.insert(item, dbo.isnew ? db.DONE : db.FAIL);
			return rs;
		} catch (err) {
			utils.deleteFiles(utils.getAbsoluteUpload(item.image, `assets/images`), global.appconfig.app.imageResize.product);
			throw err;
		}
	},

	async update(item, dbo) {
		try {
			item = exports.validate(item, exports.VALIDATE.UPDATE);

			dbo = await db.open(exports.COLLECTION, dbo);
			try {
				const oldItem = await dbo.get(item._id);
				const rs = await dbo.update(item);
				utils.deleteFiles(utils.getAbsoluteUpload(oldItem.image, `assets/images`), global.appconfig.app.imageResize.product);
				return rs;
			} finally {
				if (dbo.isnew) await dbo.close();
			}
		} catch (err) {
			utils.deleteFiles(utils.getAbsoluteUpload(item.image, `assets/images`), global.appconfig.app.imageResize.product);
			throw err;
		}
	},

	async delete(_id, dbo) {
		_id = exports.validate(_id, exports.VALIDATE.DELETE);

		dbo = await db.open(exports.COLLECTION, dbo);
		try {
			const item = await dbo.get(_id);
			const rs = await dbo.delete(_id);
			utils.deleteFiles(utils.getAbsoluteUpload(item.image, `assets/images`), global.appconfig.app.imageResize.product);
			return rs;
		} finally {
			if (dbo.isnew) await dbo.close();
		}
	}

}