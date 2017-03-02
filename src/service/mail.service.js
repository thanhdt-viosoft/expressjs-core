const _ = require('lodash');
const nodemailer = require('nodemailer');

const db = require('../db');
const utils = require('../utils');
const checker = require('../checker');
const encrypt = require('../../lib/core/encrypt');
const microService = require('./micro.service');

/************************************
 ** SERVICE:      mailController
 ** AUTHOR:       Unknown
 ** CREATED DATE: 2/16/2017, 4:42:00 PM
 *************************************/

exports = module.exports = {
	COLLECTION: "mail",
	VALIDATE: {
		INSERT: 0,
		UPDATE: 1,
		GET: 2,
		DELETE: 3,
		FIND: 4,
	},
	STATUS: {
		PENDING: 0,
		DONE: 3,
		ERROR: 1,
		FAILED: 2
	},
	validate(item, action) {
		switch (action) {
			case exports.VALIDATE.INSERT:
				item._id = db.uuid();
				checker.must('project_id', item.project_id, db.Uuid);
				checker.must('title', item.title, String);
				checker.option('content', item.content, String);
				item.html = checker.must('html', item.html, Boolean, false);
				checker.must('from', item.from, Object);
				checker.must('name', item.from.name, String);
				checker.must('email', item.from.email, String);
				checker.must('to', item.to, Array);
				checker.option('cc', item.cc, Array);
				checker.option('bcc', item.bcc, Array);
				checker.must('mail_config', item.mail_config, Object);
				checker.option('attachments', item.attachments, Array, (attachments) => {
					const fs = require('fs');
					const path = require('path');
					for (let attachment of attachments) {
						checker.must('attachment.name', attachment.name, String);
						checker.must('attachment.path', attachment.path, String);
						try {
							fs.statSync(path.join(__dirname, '..', '..', 'assets', attachment.path));
						} catch (e) {
							throw Error.create(Error.BAD_REQUEST, `Could not found this file ${attachment.name}`);
						}
					}
				});
				checker.must('trying_time', item.trying_time, Number);
				item.status = checker.must('status', item.status, Number, exports.STATUS.PENDING);
				item.created_at = new Date();
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

	async schedule() {
		try {
			const listEmail = await db.find(exports.COLLECTION, {
				$where: {
					$or: [{
							status: exports.STATUS.PENDING
						},
						{
							status: exports.STATUS.ERROR
						}
					]
				},
				$sort: {
					updated_at: 1
				}
			});
			if (listEmail.length > 0) {
				for (let e of listEmail) {
					if (!e.mail_config) {
						e.status = exports.STATUS.FAILED;
						e.msg = 'Could not found mail config';
					} else {
						try {
							await exports.send(e);
							e.status = exports.STATUS.DONE;
						} catch (err) {
							if (err.status === Error.LOCKED) {
								e.status = exports.STATUS.FAILED;
								e.msg = 'Some thing error in mail before send';
							} else {
								e.trying_time--;
								if (e.trying_time === 0) e.status = exports.STATUS.FAILED;
								else if (e.status !== exports.STATUS.ERROR) e.status = exports.STATUS.ERROR;
								e.msg = err.toString();
							}
						}
					}
					await db.update(exports.COLLECTION, e);
				}
			}
		} catch (err) {
			console.error('Schedule mail sending got problem', err);
			throw err;
		}
		setTimeout(exports.schedule, global.appconfig.app.timeout_scan_email);
	},

	async send(email) {
		return new Promise((resolve, reject) => {
			try {
				const mailOptionConfig = _.cloneDeep(email.mail_config);
				mailOptionConfig.auth.pass = encrypt.base64(mailOptionConfig.auth.pass, true);
				delete mailOptionConfig.name;
				const transporter = nodemailer.createTransport(mailOptionConfig);
				const mailOptions = {
					from: `"${email.from.name}" <${email.from.email}>`,
					to: email.to.join(', '),
					subject: email.title
				};
				if (email.attachments) {
					const path = require('path');
					mailOptions.attachments = [];
					for (let a of email.attachments) {
						mailOptions.attachments.push({
							filename: a.name,
							path: path.join(__dirname, '..', '..', 'assets', a.path)
						});
					}
				}
				if (email.cc) mailOptions.cc = email.cc.join(', ');
				if (email.bcc) mailOptions.bcc = email.bcc.join(', ');
				if (email.html) mailOptions.html = email.content;
				else mailOptions.text = email.content;
				try {
					transporter.sendMail(mailOptions, (error, info) => {
						if (error) return reject(error);
						resolve(info);
					});
				} catch (e) {
					reject(Error.create(Error.INTERNAL));
				}
			} catch (e) {
				reject(Error.create(Error.LOCKED));
			}
		});
	},

	async config(auth) {
		return await microService.updateConfig(auth, {
			mail: {
				"trying_time": 3,
				"accounts": {
					"admin": {
						"auth": {
							"user": "your email@gmail.com",
							"pass": "base64 password"
						},
						"service": "gmail",
						"tls": {
							"rejectUnauthorized": false
						},
						"name": "Administrator"
					}
				}
			}
		});
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

	async insert(item, config_name, auth) {
		const projectConfig = await microService.getConfig(auth, 'mail');
		item.trying_time = projectConfig.trying_time;
		item.mail_config = projectConfig.accounts[config_name];
		item.from = {
			name: item.mail_config.name,
			email: item.mail_config.auth.user
		};
		item = exports.validate(item, exports.VALIDATE.INSERT);
		const rs = await db.insert(exports.COLLECTION, item);
		return rs;
	},

	async resend(item) {
		item.trying_time = 1;
		item.status = exports.STATUS.PENDING;
		const rs = await db.update(exports.COLLECTION, item);
		return rs;
	},

	async delete(_id) {
		_id = exports.validate(_id, exports.VALIDATE.DELETE);
		const item = await db.get(exports.COLLECTION, _id);
		if (item.status !== exports.STATUS.PENDING) throw Error.create(Error.CONDITION, "Could not delete email with status != pending");
		const rs = await db.delete(exports.COLLECTION, _id);
		if (item.attachments && item.attachments.length > 0) {
			utils.deleteFiles(utils.getAbsoluteUpload(item.attachments.map((e) => {
				return e.path;
			}), `assets/attachments`));
		}
		return rs;
	}

}