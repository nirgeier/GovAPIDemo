var utils = require('./utils');

/**
 * Query the Dataset
 */
function getData(req, res, next) {

  utils.queryDataSet({
    limit: req.params.limit || 10
  })
    .then((data) => {
      res.render('api_results', {
        data: data,
        headers: data.result.fields

      });
    })


}

module.exports = {
  getData
}