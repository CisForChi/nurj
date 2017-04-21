var PConfig = require('./prismic-configuration')
var Prismic = require('prismic-nodejs')

/**
* initialize prismic context and api
*/
module.exports = function api(req, res) {
  res.locals.ctx = { // So we can use this information in the views
    endpoint: PConfig.apiEndpoint,
    linkResolver: PConfig.linkResolver
  };
  return Prismic.api(PConfig.apiEndpoint, {
    accessToken: PConfig.accessToken,
    req: req
  });
}
