var Prismic = require('prismic-nodejs')
var api = require('../api')
var handleError = require('../util/handleError')

module.exports = function(app) {
  app.get('/', function(req, res) {
    var prismicApi
    api(req, res).then(api => {
      prismicApi = api
      return prismicApi.getSingle('landing')
    }).then(landing => {
      if (landing) {
        prismicApi.query(
          [
            Prismic.Predicates.at("document.type", "thesis"),
          ],
          {
            orderings : '[my.thesis.publish-date desc]',
            pageSize: 5
          }
        ).then(responses => {
          var posts = responses.results
          prismicApi.query(
            [
              Prismic.Predicates.at("document.type", "feature"),
            ],
            {
              orderings : '[my.feature.publish-date desc]',
              pageSize: 5
            }
          ).then(responses => {
            posts = posts.concat(responses.results)
            prismicApi.query(
              [
                Prismic.Predicates.at("document.tags", [landing.getText('landing.current-issue-id')]),
              ],
              {
                orderings : '[my.thesis.publish-date desc]'
              }
            ).then(responses => {
              res.render('layouts/landing', {
                landing: landing,
                features: responses.results,
                posts: posts
              })
            })
          })
        })
      } else {
        handleError({status: 404}, req, res)
      }
    })
  })
};
