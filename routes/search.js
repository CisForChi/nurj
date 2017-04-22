var Prismic = require('prismic-nodejs')
var api = require('../api')
var handleError = require('../util/handleError')

module.exports = function(app) {
  app.get('/search/:keyword', function(req, res) {
    var prismicApi
    var keyword = req.params.keyword

    api(req, res).then(api => {
      api.query(
        [ Prismic.Predicates.fulltext("document", keyword) ]
      ).then(posts => {
        if (posts) {
          res.render('layouts/results', {
            query: keyword,
            results: posts.results
          })
        } else {
          handleError({status: 404}, req, res)
        }
      })
    })
  })
}
