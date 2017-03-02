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
		UPDATE_CONFIG: 5,
	},
	ROOT_PROJECT_ID: db.uuid(global.appconfig.app.rootProjectId),
	validate(item, action) {
		switch (action) {
			case exports.VALIDATE.INSERT:
				item._id = db.uuid();
				checker.must('name', item.name, String);
				checker.option('des', item.name, String);
				item.status = checker.must('status', item.status, Number, 0);
				item.plugins = {
					oauth: {
						single_mode: true,
						session_expired: 15*60,
						is_verify: true
					}
				};
				item.created_at = new Date();
				item.updated_at = new Date();

				break;
			case exports.VALIDATE.UPDATE:
				checker.must('_id', item._id, db.Uuid);
				checker.option('name', item.name, String);
				checker.option('des', item.name, String);
				checker.option('status', item.status, Number);
				checker.option('plugins', item.plugins, Object, (plugins) => {
					checker.option('oauth', item.plugins.oauth, Object, (oauth) => {
						checker.must('single_mode', item.plugins.oauth.single_mode, Boolean);						
						checker.must('session_expired', item.plugins.oauth.session_expired, Number);	
						checker.must('is_verify', item.plugins.oauth.single_mode, Boolean);
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

	async getCached(projectId){
		return await cachedService.get(`project.${projectId}`);
	},

	async getConfig(projectId, plugin){
		const rs = await exports.getCached(projectId)
		if(plugin) return rs.plugins[plugin];
		return rs;
	},

	async updateConfig(_id, config) {
		config = exports.validate(config, exports.VALIDATE.UPDATE_CONFIG);
		const oldItem = await db.get(exports.COLLECTION, {
			$where: {
				_id: _id
			},
			$fields: {
				_id: 1,
				plugins: 1
			}
		});
		oldItem.plugins = _.merge({}, oldItem.plugins, config);
		const rs = await db.update(exports.COLLECTION, oldItem);
		return rs;
	},

	async refeshCached(projectId, project) {
		const roleService = require('./role.service');
		if(project) {
			await cachedService.set(`project.${projectId}`, project);			
			await roleService.refeshCached(projectId, false);	
		}else {
			await cachedService.del(`project.${projectId}`);
			await roleService.refeshCached(projectId, true);	
		}
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

	async insert(item, auth) {
		const email = _.clone(item.email);
		delete item.email;
		item = exports.validate(item, exports.VALIDATE.INSERT);
		
		const rs = await db.insert(exports.COLLECTION, item);
		
		const roleService = require('./role.service');
		const eycrypt = require('../../lib/core/encrypt');
		const accountService = require('./account.service');

		const role = await roleService.insert({
			project_id: rs._id,
			name: 'Admin',
			is_nature: true,
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
		});	
		
		await exports.refeshCached(rs._id, rs);

		const randomPass = utils.uuid().toString().substr(0, 6);
		const username = 'admin';
		const account = await accountService.insert({
			project_id: rs._id,
			username: username,
			password0: randomPass,
			password: eycrypt.md5(eycrypt.md5(randomPass)),
			status: 1,
			recover_by: email,
			is_nature: true,
			role_ids: [role._id],
			more: {}
		}, auth);	

		return rs;
	},

	async update(item) {
		item = exports.validate(item, exports.VALIDATE.UPDATE);
		const rs = await db.update(exports.COLLECTION, item);
		const newItem = await db.get(exports.COLLECTION, item._id);
		await exports.refeshCached(newItem._id, newItem);
		return rs;
	},

	async delete(_id) {
		_id = exports.validate(_id, exports.VALIDATE.DELETE);
		const rs = await db.delete(exports.COLLECTION, _id);
		const roleService = require('./role.service');
		const accountService = require('./account.service');
		await roleService.deleteAll(_id);
		await accountService.deleteAll(_id);
		exports.refeshCached(_id, null);
		return rs;
	}

}