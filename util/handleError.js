var api = require('../api')
var Prismic = require('prismic-nodejs')

module.exports = function handleError(err, req, res) {
  if (err.status == 404) {
    var prismicApi

    api(req, res).then(api => {
      prismicApi = api
      return prismicApi.getSingle('landing')
    }).then(landing => {
      prismicApi.query(
        [
          Prismic.Predicates.at("document.type", "thesis"),
        ],
        {
          orderings: '[my.thesis.publish-date desc]',
          pageSize: 5
        }
      ).then(function(response) {
        res.render('error/404', {
          pages: response.results
        })
      })
    })
  } else {
    res.status(500).send('Error 500: ' + err.message);
  }
}
