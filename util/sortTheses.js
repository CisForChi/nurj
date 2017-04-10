const fl = require('first-letter')
const titleSort = require('title-sort')
const isAlphanumeric = require('is-alphanumeric')
const sortKeys = require('sort-keys')

module.exports = function sortTheses(theses) {
  let classifiedTheses = {}

  for (let thesis of theses) {
    let firstLetter = fl(thesis.getText('thesis.title')).toUpperCase()

    if (!isNaN(firstLetter)) {
      firstLetter = '0-9'
    } else if (!isAlphanumeric(firstLetter)) {
      firstLetter = '*'
    }

    if (classifiedTheses.hasOwnProperty(firstLetter)) {
      classifiedTheses[firstLetter].push(thesis)
    } else {
      classifiedTheses[firstLetter] = [thesis]
    }
  }

  for (let key of Object.keys(classifiedTheses)) {
    classifiedTheses[key] = classifiedTheses[key].sort(function(a, b) {
      return titleSort(a.getText('thesis.title'), b.getText('thesis.title'))
    })
  }

  return sortKeys(classifiedTheses)
}
