var Prismic = require('prismic-nodejs')
var api = require('../api')
var handleError = require('../util/handleError')
var injectCitations = require('../util/injectCitations')

module.exports = function(app) {
  app.get('/theses/:uid', function(req, res) {
     var uid = req.params.uid
     api(req, res).then(function(api) {
         return api.getByUID('thesis', uid)
     }).then(function(thesis) {
       if (thesis) {
         injectCitations(thesis)
         res.render('layouts/thesis', {
             thesis: thesis
         });
       } else {
         handleError({status: 404}, req, res)
       }
     })
  })
}
