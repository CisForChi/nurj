var Prismic = require('prismic-nodejs')
var api = require('../api')
var handleError = require('../util/handleError')

module.exports = function(app) {
  /**
  * preconfigured prismic preview
  */
  app.get('/preview', function(req, res) {
    api(req, res).then(function(api) {
      return Prismic.preview(api, PConfig.linkResolver, req, res);
    }).catch(function(err) {
      handleError(err, req, res);
    })
  })
}
