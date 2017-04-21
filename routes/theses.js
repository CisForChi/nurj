var Prismic = require('prismic-nodejs')
var api = require('../api')
var handleError = require('../util/handleError')
var sortPosts = require('../util/sortPosts')

module.exports = function(app) {
  app.get('/theses', function(req, res) {
    api(req, res).then(api => {
      api.query(
        Prismic.Predicates.at('document.type', 'thesis'),
        { orderings: '[my.thesis.title]', pageSize: 100 }
      ).then(function (response) {
        res.render('layouts/index', {
          results: sortPosts(response.results)
        })
      })
    })
  })
}
