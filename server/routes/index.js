var https = require('https'),
  express = require('express'),
  router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  //res.render('index', { title2: 'Express 45676' });
  res.redirect('api');
});

module.exports = router;
