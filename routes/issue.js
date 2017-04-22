var Prismic = require('prismic-nodejs')
var api = require('../api')
var handleError = require('../util/handleError')

module.exports = function(app) {
  app.get('/issues/:uid', function(req, res) {
    var uid = req.params.uid
    var prismicApi

    api(req, res).then(api => {
      prismicApi = api
      return prismicApi.getByUID('issue', uid)
    }).then(issue => {
      if (issue) {
        res.render('layouts/issue', {
          issue: issue,
          content: responses.results
        })
      } else {
        handleError({status: 404}, req, res)
      }
    })
  })
}
