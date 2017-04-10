const fl = require('first-letter')
const cleanFront = require('./cleanFront')
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
      let aTitle = cleanFront(a.getText('thesis.title'))
      let bTitle = cleanFront(b.getText('thesis.title'))
      return aTitle.localeCompare(bTitle)
    })
  }

  return sortKeys(classifiedTheses)
}
