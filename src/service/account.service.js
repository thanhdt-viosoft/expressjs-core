const path = require('path');
const _ = require('lodash');

const db = require('../db');
const utils = require('../utils');
const checker = require('../checker');
const cachedService = require('./cached.service');

/************************************
 ** SERVICE:      accountController
 ** AUTHOR:       Unknown
 ** CREATED DATE: 2/17/2017, 10:51:32 AM
 *************************************/

exports = module.exports = {
	COLLECTION: "account",
	VALIDATE: {
		INSERT: 0,
		UPDATE: 1,
		GET: 2,
		DELETE: 3,
		FIND: 4,
		LOGIN: 5,
		AUTHORIZ: 6
	},
	STATUS: {
		ACTIVE: 1,
		INACTIVE: 0
	},
	validate(item, action) {
		switch (action) {
			case exports.VALIDATE.LOGIN:
				checker.must('login infor', item.userClient, Object);	
				checker.must('project_id', item.userClient.project_id, db.Uuid);
				checker.must('username', item.userClient.username, String);					
				checker.option('app', item.userClient.app, String, (app) => {
					if(!item.userServer.app.includes(item.userClient.app)) throw Error.create(Error.AUTHEN, 'Login via social error');
				}, () => {
					checker.must('password', item.userClient.password, String);
					if(item.userServer.password !== item.userClient.password) throw Error.create(Error.AUTHEN, 'Password not match');
				});
				if(item.userServer.status !== exports.STATUS.ACTIVE) throw Error.create(Error.LOCKED, 'You have not been actived yet');
				break;
			case exports.VALIDATE.AUTHORIZ:
				checker.must('path', item.path, String);	
				checker.must('actions', item.actions, Array);	
				break;
			case exports.VALIDATE.INSERT:
				item._id = db.uuid();
				item.secret_key = db.uuid();				
				checker.option('app', item.app, String);								
				if(!item.app) checker.must('password', item.password, String);
				checker.must('username', item.username, String);				
				checker.must('project_id', item.project_id, db.Uuid);												
				checker.must('status', item.status, Number, 0);
				checker.must('recover_by', item.recover_by, String);
				checker.must('role_ids', item.role_ids, Array);
				for (role_ids of item.role_ids) {
					checker.must('role_ids', role_ids, db.Uuid);
				}				
				item.more = checker.must('more', item.more, Object, {});
				item.created_at = new Date();
				item.updated_at = new Date();

				break;
			case exports.VALIDATE.UPDATE:
				checker.must('_id', item._id._id, db.Uuid);
				checker.option('project_id', item._id.project_id, db.Uuid);
				checker.option('role_ids', item.role_ids, Array, (role_ids) => {
					for (role_ids of item.role_ids) {
						checker.must('role_ids', role_ids, db.Uuid);
					}
				});
				checker.option('app', item.app, String);
				checker.option('password', item.password, String);
				checker.option('secret_key', item.secret_key, db.Uuid);
				checker.option('status', item.status, Number);
				checker.option('recover_by', item.recover_by, String);
				checker.option('more', item.more, Object);

				if(item.secret_key === true) item.secret_key = db.uuid();

				item.updated_at = new Date();

				break;
			case exports.VALIDATE.GET:
				checker.option('_id', item._id, db.Uuid);
				checker.option('project_id', item.project_id, db.Uuid);
				checker.option('is_nature', item.is_nature, Boolean);

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

	async getCached(token){
		return await cachedService.get(`login.${token}`);
	},

	async authBySecretKey(secretKey){
		let user = await cachedService.get(`login.${secretKey}`);
		if(!user) {
			user = await db.get(exports.COLLECTION, {
				$where: { secret_key: secretKey, status: exports.STATUS.ACTIVE },
				$fields: { token: 1, status: 1, _id: 1, project_id: 1, role_ids: 1 }
			});
			if(!user) throw Error.create(Error.AUTHEN, "Secret key is not correct");
			await cachedService.set(`login.${secretKey}`, user);
		}
		return `${user.project_id}-${user._id}-${secretKey}`;
	},

	async login(item = {}) {		
		let where = {
			username: item.username,
			project_id: item.project_id
		};
		const user = await db.get(exports.COLLECTION, {
			$where: where,
			$fields: { password: 1, app: 1, token: 1, status: 1, _id: 1, project_id: 1, role_ids: 1 }
		});
		if(!user) throw Error.create(Error.NOT_FOUND, `Could not found username ${item.username}`);
		exports.validate({userClient: item, userServer: user}, exports.VALIDATE.LOGIN);			
		delete user.password;
		delete user.api;
		const projectService = require('./project.service');
		const project = await projectService.getCached(user.project_id);			
		if(!project.plugins.oauth) throw Error.create(Error.INTERNAL, 'oauth plugin not config yet');
		if(project.plugins.oauth.single_mode === true) await cachedService.del(`login.${user.token}`);
		user.token = db.uuid();
		await db.update(exports.COLLECTION, user);
		await cachedService.set(`login.${user.token}`, user, project.plugins.oauth.session_expired);
		return `${user.project_id}-${user._id}-${user.token}`;
	},

	async logout(token){
		cachedService.del(`login.${token}`);
	},

	async authoriz(auth) {
		auth = exports.validate(auth, exports.VALIDATE.AUTHORIZ);
		const user = await exports.getCached(auth.secretToken);
		if(!user) throw Error.create(Error.EXPIRED, 'Session was expired');
		const roleService = require('./role.service');auth.projectId.toString()
		const roles = await roleService.getCached(auth.projectId) || [];
		for(let role of roles.filter((e) => {
			return user.role_ids.map((id) => {
				return id.toString();
			}).indexOf(e._id.toString()) !== -1;
		})){
			for(let r of role.api) {
				if(new RegExp(`^${r.path}$`, 'gi').test(auth.path) && _.some(auth.actions, (a) => {
					for(var auAction of r.actions){
						if(new RegExp(`^${auAction}$`, 'gi').test(a)){
							return true;
						}
					}
					return false;
				})){
					return;
				}
			}
		}	
		throw Error.create(Error.AUTHORIZ, 'Not allow access');
	},

	async ping(auth) {
		const user = await exports.getCached(auth.secretToken);
		if(!user) throw Error.create(Error.EXPIRED, 'Session was expired');
		const projectService = require('./project.service');
		const project = await projectService.getCached(user.project_id);
		await cachedService.touch(`login.${auth.secretToken}`, project.plugins.oauth.session_expired);
	},

	async find(fil = {}) {
		fil = exports.validate(fil, exports.VALIDATE.FIND);
		const rs = await db.find(exports.COLLECTION, fil);
		return rs;
	},

	async get(_id) {
		_id = exports.validate(_id, exports.VALIDATE.GET);
		return await db.get(exports.COLLECTION, _id);
	},

	async getMe(_id) {
		return await db.get(exports.COLLECTION, _id);
	},

	async insert(item, auth) {
		item = exports.validate(item, exports.VALIDATE.INSERT);
		const existedUser = await db.get(exports.COLLECTION, {
			username: item.username,
			project_id: item.project_id
		});
		if(existedUser) throw Error.create(Error.BAD_REQUEST, `User ${item.username} was existed`);
		const projectService = require('./project.service');	
		const defaultAdmin = await db.get(exports.COLLECTION, {is_nature: true});
		if(!defaultAdmin) throw Error.create(Error.INTERNAL, 'Could not found default admin');
		const project = await projectService.getCached(item.project_id);			
		if(item.is_nature) {
			const microService = require('../service/micro.service');
			await microService.sendMail({
				title: `You are assigned in project ${project.name}`,
				content: `This is your account information which allow you <a href="${global.appconfig.manager.url}/?id=${item.project_id}">login</a> and use some our service
<br/>Username: ${item.username}
<br/>Password: ${item.password0}
<br/>`,
				config_name: 'admin',
				html: true,
				to: [item.recover_by]
			}, auth);
		}else {
			item.status = project.plugins.oauth.is_verify === false ? exports.STATUS.ACTIVE : exports.STATUS.INACTIVE;
		}
		delete item.password0;
		return await db.insert(exports.COLLECTION, item);
	},

	async update(item) {
		item = exports.validate(item, exports.VALIDATE.UPDATE);
		let oldItem;
		if(item.secret_key || item.role_ids) {
			oldItem = await db.get(exports.COLLECTION, item._id);
			if(_.isEqual(item.role_ids.sort(), oldItem.role_ids.sort())) {
				delete oldItem;
			}
		}
		const rs = await db.update(exports.COLLECTION, item);
		if(oldItem) {
			if(item.secret_key) await cachedService.del(`login.${oldItem.secret_key}`);					
						
			const user = await db.get(exports.COLLECTION, {
				$where: { _id: oldItem._id },
				$fields: { token: 1, status: 1, _id: 1, project_id: 1, role_ids: 1 }
			});
			const secretKey = await cachedService.get(`login.${user.secret_key}`);					
			const token = await cachedService.get(`login.${user.token}`);
			if(secretKey) await cachedService.set(`login.${user.secret_key}`, user);
			if(token) await cachedService.set(`login.${user.token}`, user);
		}
		return rs;
	},

	async deleteAll(projectId) {
		const oldUsers = await db.find(exports.COLLECTION, {
			$where: {
				project_id: projectId
			},
			$fields: {
				secret_key: 1, 
				token: 1
			}
		});
		const rs = await db.delete(exports.COLLECTION, {
			project_id: projectId
		});
		for(let oldUser of oldUsers) {
			await cachedService.del(`login.${oldUser.secret_key}`);
			await cachedService.del(`login.${oldUser.token}`);
		}
		return rs;
	},

	async delete(_id) {
		_id = exports.validate(_id, exports.VALIDATE.DELETE);
		const oldItem = db.get(exports.COLLECTION, _id);
		const rs = await db.delete(exports.COLLECTION, _id);
		await cachedService.del(`login.${oldItem.secret_key}`);
		await cachedService.del(`login.${oldItem.token}`);
		return rs;
	}

}