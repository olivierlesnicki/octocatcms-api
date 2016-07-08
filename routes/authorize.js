var express = require('express');
var request = require('request-promise');
var env = require('var');
var router = express.Router();

router.get('/', function(req, res, next) {
  request({
    uri: 'https://github.com/login/oauth/access_token',
    method: 'POST',
    body: {
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code: req.query.code
    }
  }).then(body => {
    res.redirect(req.query.redirect_uri);
  });
});

module.exports = router;
