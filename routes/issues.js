var Prismic = require('prismic-nodejs')
var api = require('../api')
var handleError = require('../util/handleError')

module.exports = function(app) {
  app.get('/issues', function(req, res) {
    api(req, res).then(api => {
      api.query(
        Prismic.Predicates.at('document.type', 'issue'),
        { orderings: '[my.issue.publish-date desc]'}
      ).then(response => {
        res.render('layouts/issues', {
          issues: response.results
        })
      })
    })
  })
}
