var Prismic = require('prismic-nodejs');
var app = require('./config');
var PORT = app.get('port');
var PConfig = require('./prismic-configuration');
var request = require('request');

function handleError(err, req, res) {
  if (err.status == 404) {
    res.status(404).send('404 not found');
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
          orderings : '[my.thesis.last_publication_date]',
          pageSize: 10
        }
      ).then(function(responses) {
        var posts = responses.results.reverse()
        prismicApi.query(
          [
            Prismic.Predicates.at("document.tags", ["featured"]),
          ],
          {
            orderings : '[my.thesis.last_publication_date]',
            pageSize: 6
          }
        ).then(function(responses) {
          res.render('layouts/landing', {
            features: responses.results,
            posts
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
       res.render('layouts/thesis', {
           thesis: thesis
       });
     } else {
       handleError(404, req, res)
     }
   });
});

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
      handleError(404, req, res)
    }
  })
})
