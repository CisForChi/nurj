var api = require('../api')
var handleError = require('../util/handleError')

module.exports = function(app) {
  app.get('/:uid', function(req, res) {
    var uid = req.params.uid

    api(req, res).then(api => {
      return api.getByUID('page', uid)
    }).then(page => {
      if (page) {
        res.render('layouts/page', {
          page: page
        })
      } else {
        handleError({status: 404}, req, res)
      }
    })
  })
}
