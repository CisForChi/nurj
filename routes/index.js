var registerFeature = require('./feature')
var registerFeatures = require('./features')
var registerIssue = require('./issue')
var registerIssues = require('./issues')
var registerLanding = require('./landing')
var registerPage = require('./page')
var registerPreview = require('./preview')
var registerSearch = require('./search')
var registerTheses = require('./theses')
var registerThesis = require('./thesis')

module.exports = function(app) {
  registerPreview(app)
  registerSearch(app)
  registerLanding(app)

  registerFeature(app)
  registerFeatures(app)
  registerIssue(app)
  registerIssues(app)
  registerThesis(app)
  registerTheses(app)

  registerPage(app)
}
