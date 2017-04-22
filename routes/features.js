var Prismic = require('prismic-nodejs')
var api = require('../api')
var handleError = require('../util/handleError')
var sortPosts = require('../util/sortPosts')

module.exports = function(app) {
  app.get('/features', function(req, res) {
    api(req, res).then(api => {
      api.query(
        Prismic.Predicates.at('document.type', 'feature'),
        { orderings: '[my.feature.title]', pageSize: 100 }
      ).then(response => {
        res.render('layouts/features', {
          results: sortPosts(response.results)
        })
      })
    })
  })
}
