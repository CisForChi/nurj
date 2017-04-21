const fl = require('first-letter')
const titleSort = require('title-sort')
const isAlphanumeric = require('is-alphanumeric')
const sortKeys = require('sort-keys')

module.exports = function sortFeatures(features) {
  let classifiedTheses = {}

  for (let feature of features) {
    let firstLetter = fl(feature.getText('feature.title')).toUpperCase()

    if (!isNaN(firstLetter)) {
      firstLetter = '0-9'
    } else if (!isAlphanumeric(firstLetter)) {
      firstLetter = '*'
    }

    if (classifiedTheses.hasOwnProperty(firstLetter)) {
      classifiedTheses[firstLetter].push(feature)
    } else {
      classifiedTheses[firstLetter] = [feature]
    }
  }

  for (let key of Object.keys(classifiedTheses)) {
    classifiedTheses[key] = classifiedTheses[key].sort(function(a, b) {
      return titleSort(a.getText('feature.title'), b.getText('feature.title'))
    })
  }

  return sortKeys(classifiedTheses)
}
