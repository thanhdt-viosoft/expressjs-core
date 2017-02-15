const _ = require('lodash');

const utils = require('../utils');
const testService = require('../service/TestService');

app.get('/test/:name', (req, res, next) => {
  res.json({a: req.params.name});
});

app.post('/test', utils.jsonHandler(), async (req, res, next) => {
  const msg = await testService.sayHello(req.body);
  res.send(msg);
});