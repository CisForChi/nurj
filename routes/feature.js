var Prismic = require('prismic-nodejs')
var api = require('../api')
var handleError = require('../util/handleError')

module.exports = function(app) {
  app.get('/features/:uid', function(req, res) {
     var uid = req.params.uid
     api(req, res).then(function(api) {
         return api.getByUID('feature', uid)
     }).then(feature => {
       if (feature) {
         res.render('layouts/feature', {
             feature: feature
         });
       } else {
         handleError({status: 404}, req, res)
       }
     })
  })
}
