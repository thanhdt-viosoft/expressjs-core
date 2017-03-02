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

	async getCached(projectId){
		return await cachedService.get(`roles.${projectId}`);
	},

	async refeshCached(projectId, isRemove){
		if(isRemove){
			await cachedService.del(`roles.${projectId}`);
		}else {
			const roles = await db.find(exports.COLLECTION, {
				$where: { project_id: projectId }
			});
			if(roles.length > 0) await cachedService.set(`roles.${projectId}`, roles);
			else await cachedService.del(`roles.${projectId}`);
		}
	},

	async find(fil = {}) {
		fil = exports.validate(fil, exports.VALIDATE.FIND);
		return await db.find(exports.COLLECTION, fil);
	},

	async get(_id) {
		_id = exports.validate(_id, exports.VALIDATE.GET);
		return await db.get(exports.COLLECTION, _id);
	},

	async insert(item) {
		item = exports.validate(item, exports.VALIDATE.INSERT);
		const rs = await db.insert(exports.COLLECTION, item);
		await exports.refeshCached(item.project_id);
		return rs;
	},

	async update(item) {
		item = exports.validate(item, exports.VALIDATE.UPDATE);	
		const rs = await db.update(exports.COLLECTION, item);
		await exports.refeshCached(item._id.project_id);			
		return rs;
	},

	async deleteAll(projectId) {
		const rs = await db.delete(exports.COLLECTION, {
			project_id: projectId
		});
		await exports.refeshCached(projectId, true);
		return rs;
	},

	async delete(_id) {
		_id = exports.validate(_id, exports.VALIDATE.DELETE);
		const item = await db.get(exports.COLLECTION, _id);
		const rs = await db.delete(exports.COLLECTION, _id);
		await exports.refeshCached(item.project_id, true);
		return rs;
	}

}