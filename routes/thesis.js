var Prismic = require('prismic-nodejs')
var PConfig = require('../prismic-configuration')
var api = require('../api')
var handleError = require('../util/handleError')
var injectCitations = require('../util/injectCitations')

module.exports = function(app) {
  app.get('/theses/:uid', function(req, res) {
    var uid = req.params.uid
    api(req, res).then(function(api) {
      return api.getByUID('thesis', uid)
    }).then(thesis => {
      if (thesis) {
        injectCitations(thesis, PConfig.linkResolver)
        res.render('layouts/thesis', {
          thesis: thesis
        });
      } else {
        handleError({status: 404}, req, res)
      }
    })
  })
}
