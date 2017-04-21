var app = require('./config')
var PORT = app.get('port')
var PConfig = require('./prismic-configuration')
var request = require('request')
var registerRoutes = require('./routes')
var api = require('./api')

app.listen(PORT, function() {
  const repoEndpoint = PConfig.apiEndpoint.replace('/api', '');
  request.post(repoEndpoint + '/app/settings/onboarding/run', {form: {language: 'node', framework: 'express'}});
  console.log('Point your browser to: http://localhost:' + PORT);
});

registerRoutes(app)
