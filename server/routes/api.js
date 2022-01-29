var
  https = require('https'),
  express = require('express'),
  router = express.Router(),
  apiRoute = require('../src/api');

/* GET home page. */
router.get('/', (req, res,next)=>{
  res.redirect('/api/getData');
});

/** Query api  */
router.get('/getData/:limit', apiRoute.getData);

module.exports = router;
