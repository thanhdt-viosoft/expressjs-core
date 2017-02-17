const path = require('path');
const _ = require('lodash');

const db = require('../db');
const utils = require('../utils');
const checker = require('../checker');
const cachedService = require('./cached.service');

/************************************
 ** SERVICE:      projectController
 ** AUTHOR:       Unknown
 ** CREATED DATE: 2/17/2017, 9:42:40 AM
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
	ROOT_PROJECT_ID: db.uuid(global.appconfig.app.rootProjectId),
	validate(item, action) {
		switch (action) {
			case exports.VALIDATE.INSERT:
				item._id = db.uuid();
				checker.must('name', item.name, String);
				item.status = checker.must('status', item.status, Number, 0);
				checker.option('plugins', item.plugins, Object, (plugins) => {
					checker.option('oauthv2', item.plugins.oauthv2, Object, (oauthv2) => {
						checker.must('single_mode', item.plugins.oauthv2.single_mode, Boolean);
						checker.must('session_expired', item.plugins.oauthv2.session_expired, Number);	
					});					
					checker.option('mail', item.plugins.mail, Object);
				}, () => {
					item.plugins = {};
				});				
				item.created_at = new Date();
				item.updated_at = new Date();

				break;
			case exports.VALIDATE.UPDATE:
				checker.must('_id', item._id, db.Uuid);
				checker.option('name', item.name, String);
				checker.option('status', item.status, Number);
				checker.option('plugins', item.plugins, Object, (plugins) => {
					checker.option('oauthv2', item.plugins.oauthv2, Object, (oauthv2) => {
						checker.must('single_mode', item.plugins.oauthv2.single_mode, Boolean);
						checker.must('session_expired', item.plugins.oauthv2.session_expired, Number);	
					});					
					checker.option('mail', item.plugins.mail, Object);
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

	async getCached(projectId, cached){
		return await cached.get(`project.${projectId}`);
	},

	async getConfig(projectId, plugin){
		let cached = cachedService.open();
		try {			
			const rs = await exports.getCached(projectId, cached)
			if(plugin) return rs.plugins[plugin];
			return rs;
		} finally {
			await cached.close();
		}
	},

	async refeshCached(projectId, project, cached, dbo) {
		const roleService = require('./role.service');
		if(project) {
			await cached.set(`project.${projectId}`, project);			
			await roleService.refeshCached(projectId, cached, dbo, false);	
		}else {
			await cached.del(`project.${projectId}`);
			await roleService.refeshCached(projectId, cached, dbo, true);	
		}
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
		try {
			const rs = await dbo.insert(item);
			
			const roleService = require('./role.service');
			const eycrypt = require('../../lib/core/encrypt');
			const accountService = require('./account.service');

			const role = await roleService.insert({
				project_id: rs._id,
				name: 'Admin',
				api: [{
					path: '.*',
					actions: ['.*']
				}],
				web: [{
					path: '.*',
					actions: ['.*']
				}],
				mob: [{
					path: '.*',
					actions: ['.*']
				}]
			}, dbo);	
			const account = accountService.insert({
				project_id: rs._id,
				username: 'admin',
				password: eycrypt.md5('admin!@#$%'),
				status: 1,
				recover_by: 'admin@email.com',
				role_ids: [role._id],
				more: {}
			}, dbo);
			return rs;
		} finally{
			if(dbo.isnew) await dbo.close();
		}
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