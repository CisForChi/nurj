var Prismic = require('prismic-nodejs')
var PConfig = require('../prismic-configuration')
var api = require('../api')
var handleError = require('../util/handleError')

module.exports = function(app) {
  /**
  * preconfigured prismic preview
  */
  app.get('/preview', function(req, res) {
    api(req, res).then(api => {
      return Prismic.preview(api, PConfig.linkResolver, req, res);
    }).catch(err => {
      handleError(err, req, res);
    })
  })
}
