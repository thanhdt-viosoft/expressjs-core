const path = require('path');
const _ = require('lodash');

const db = require('../db');
const utils = require('../utils');
const checker = require('../checker');
const cachedService = require('./cached.service');

/************************************
 ** SERVICE:      roleController
 ** AUTHOR:       Unknown
 ** CREATED DATE: 2/17/2017, 10:01:49 AM
 *************************************/

exports = module.exports = {
	COLLECTION: "role",
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
				checker.must('name', item.name, String);
				checker.option('api', item.api, Array, (apis) => {
					for(let api of apis){
						checker.must('api.path', api.path, String);
						checker.must('api.actions', api.actions, Array);
					}
				});
				checker.option('web', item.web, Array, (webs) => {
					for(let web of webs){
						checker.must('web.path', web.path, String);
						checker.must('web.actions', web.actions, Array);
					}
				});
				checker.option('mob', item.mob, Array, (mobs) => {
					for(let mob of mobs){
						checker.must('mob.path', mob.path, String);
						checker.must('mob.actions', mob.actions, Array);
					}
				});
				item.created_at = new Date();
				item.updated_at = new Date();

				break;
			case exports.VALIDATE.UPDATE:
				checker.must('_id', item._id._id, db.Uuid);
				checker.must('project_id', item._id.project_id, db.Uuid);
				checker.option('name', item.name, String);
				checker.option('api', item.api, Array, (apis) => {
					for(let api of apis){
						checker.must('api.path', api.path, String);
						checker.must('api.actions', api.actions, Array);
					}
				});
				checker.option('web', item.web, Array, (webs) => {
					for(let web of webs){
						checker.must('web.path', web.path, String);
						checker.must('web.actions', web.actions, Array);
					}
				});
				checker.option('mob', item.mob, Array, (mobs) => {
					for(let mob of mobs){
						checker.must('mob.path', mob.path, String);
						checker.must('mob.actions', mob.actions, Array);
					}
				});
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

	async getCached(projectId, cached){
		return await cached.get(`roles.${projectId}`);
	},

	async refeshCached(projectId, cached, dbo, isRemove){
		if(isRemove){
			await cached.del(`roles.${projectId}`);
		}else {
			const roles = await exports.find({
				$where: { project_id: projectId }
			}, dbo);
			if(roles.length > 0) await cached.set(`roles.${projectId}`, roles);
			else await cached.del(`roles.${projectId}`);
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

		let cached;
		dbo = await db.open(exports.COLLECTION, dbo);		
		try {
			const rs = await dbo.insert(item);

			cached = cachedService.open();
			await exports.refeshCached(item.project_id, cached, dbo);

			return rs;
		} finally {
			if(cached) await cached.close();
			if(dbo.isnew) await dbo.close();
		}
	},

	async update(item, dbo) {
		item = exports.validate(item, exports.VALIDATE.UPDATE);

		let cached;
		dbo = await db.open(exports.COLLECTION, dbo);		
		try {
			const rs = await dbo.update(item);

			cached = cachedService.open();
			await exports.refeshCached(item._id.project_id, cached, dbo);
			
			return rs;
		} finally {
			if(cached) await cached.close();
			if(dbo.isnew) await dbo.close();
		}		

		return rs;
	},

	async delete(_id, dbo) {
		_id = exports.validate(_id, exports.VALIDATE.DELETE);

		let cached;
		dbo = await db.open(exports.COLLECTION, dbo);		
		try {
			const item = await exports.get(_id, dbo);
			const rs = await dbo.delete(_id);

			cached = cachedService.open();
			await exports.refeshCached(item.project_id, cached, dbo);
			
			return rs;
		} finally {
			if(cached) await cached.close();
			if(dbo.isnew) await dbo.close();
		}		

		return rs;
	}

}