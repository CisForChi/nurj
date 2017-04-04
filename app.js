var Prismic = require('prismic-nodejs');
var app = require('./config');
var PORT = app.get('port');
var PConfig = require('./prismic-configuration');
var request = require('request');
var injectCitations = require('./util/injectCitations')

function handleError(err, req, res) {
  if (err.status == 404) {
    var prismicApi

    api(req, res).then(api => {
      prismicApi = api
      return prismicApi.getSingle('landing')
    }).then(landing => {
      prismicApi.query(
        [
          Prismic.Predicates.at("document.type", "thesis"),
        ],
        {
          orderings: '[my.thesis.publish-date desc]',
          pageSize: 5
        }
      ).then(function(response) {
        res.render('error/404', {
          pages: response.results
        })
      })
    })
  } else {
    res.status(500).send('Error 500: ' + err.message);
  }
}

app.listen(PORT, function() {
  const repoEndpoint = PConfig.apiEndpoint.replace('/api', '');
  request.post(repoEndpoint + '/app/settings/onboarding/run', {form: {language: 'node', framework: 'express'}});
  console.log('Point your browser to: http://localhost:' + PORT);
});

/**
* initialize prismic context and api
*/
function api(req, res) {
  res.locals.ctx = { // So we can use this information in the views
    endpoint: PConfig.apiEndpoint,
    linkResolver: PConfig.linkResolver
  };
  return Prismic.api(PConfig.apiEndpoint, {
    accessToken: PConfig.accessToken,
    req: req
  });
}

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
      ).then(function(responses) {
        var posts = responses.results
        prismicApi.query(
          [
            Prismic.Predicates.at("document.type", "feature"),
          ],
          {
            orderings : '[my.feature.publish-date desc]',
            pageSize: 5
          }
        ).then(function(responses) {
          posts = posts.concat(responses.results)
          prismicApi.query(
            [
              Prismic.Predicates.at("document.tags", ["featured"]),
            ],
            {
              orderings : '[my.thesis.publish-date desc]',
              pageSize: 6
            }
          ).then(function(responses) {
            res.render('layouts/landing', {
              features: responses.results,
              posts: posts
            })
          })
        })
      })
    } else {
      handleError(404, req, res)
    }
  })
});

/**
* preconfigured prismic preview
*/
app.get('/preview', function(req, res) {
  api(req, res).then(function(api) {
    return Prismic.preview(api, PConfig.linkResolver, req, res);
  }).catch(function(err) {
    handleError(err, req, res);
  });
});

app.get('/thesis/:uid', function(req, res) {
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
   });
});

app.get('/feature/:uid', function(req, res) {
   var uid = req.params.uid
   api(req, res).then(function(api) {
       return api.getByUID('feature', uid)
   }).then(function(feature) {
     if (feature) {
       res.render('layouts/feature', {
           feature: feature
       });
     } else {
       handleError({status: 404}, req, res)
     }
   });
});

app.get('/index', function(req, res) {
  api(req, res).then(api => {
    api.query(
      Prismic.Predicates.at('document.type', 'thesis'),
      { orderings: '[my.thesis.title]'}
    ).then(function (response) {
      var sortedResults = []

      for (var result of response.results) {
        var i = 0
        var firstChar = result.getText('thesis.title')[i].toUpperCase()

        if (sortedResults[firstChar] == undefined) {
          sortedResults[firstChar] = []
        }

        sortedResults[firstChar].push(result)
      }

      res.render('layouts/index', {
        results: sortedResults
      })
    })
  })
})

app.get('/issues/:uid', function(req, res) {
  var uid = req.params.uid

  api(req, res).then(api => {
    return api.getByUID('issue', uid)
  }).then(function(issue) {
    if (issue) {
      res.render('layouts/issue', {
        issue: issue
      })
    } else {
      handleError({status: 404}, req, res)
    }
  })
})

app.get('/issues', function(req, res) {
  api(req, res).then(api => {
    api.query(
      Prismic.Predicates.at('document.type', 'issue'),
      { orderings: '[my.issue.publish-date desc]'}
    ).then(function (response) {
      res.render('layouts/issues', {
        results: response.results
      })
    })
  })
})

app.get('/search/:keyword', function(req, res) {
  var prismicApi
  var keyword = req.params.keyword

  api(req, res).then(api => {
    prismicApi = api
    return prismicApi.getSingle('landing')
  }).then(landing => {
    if (landing) {
      prismicApi.query(
        [ Prismic.Predicates.fulltext("document", keyword) ]
      ).then(function(posts) {
        res.render('layouts/results', {
          query: keyword,
          results: posts.results
        })
      })
    } else {
      handleError(404, req, res)
    }
  })
})


app.get('/:uid', function(req, res) {
  var uid = req.params.uid

  api(req, res).then(api => {
    return api.getByUID('page', uid)
  }).then(function(page) {
    if (page) {
      res.render('layouts/page', {
        page: page
      })
    } else {
      handleError({status: 404}, req, res)
    }
  })
})
