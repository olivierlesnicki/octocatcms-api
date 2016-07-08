var express = require('express');
var request = require('request-promise');
var router = express.Router();

router.get('/', function(req, res, next) {
  request.post('https://github.com/login/oauth/access_token', {
    body: {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code: req.query.code
    },
    json: true
  }).then(body => {
    if (!body.error) {
      res.redirect(req.query.redirect_uri + '?access_token=' + body.access_token);
    } else {
      next(body.error);
    }
  }, response => {
    next(response.error);
  });
});

module.exports = router;
