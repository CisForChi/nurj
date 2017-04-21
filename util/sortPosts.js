const fl = require('first-letter')
const titleSort = require('title-sort')
const isAlphanumeric = require('is-alphanumeric')
const sortKeys = require('sort-keys')

module.exports = function sortPosts(posts) {
  let classifiedPosts = {}
  let postType = posts[0].type

  for (let post of posts) {
    let firstLetter = fl(post.getText(postType + '.title')).toUpperCase()

    if (!isNaN(firstLetter)) {
      firstLetter = '0-9'
    } else if (!isAlphanumeric(firstLetter)) {
      firstLetter = '*'
    }

    if (classifiedPosts.hasOwnProperty(firstLetter)) {
      classifiedPosts[firstLetter].push(post)
    } else {
      classifiedPosts[firstLetter] = [post]
    }
  }

  for (let key of Object.keys(classifiedPosts)) {
    classifiedPosts[key] = classifiedPosts[key].sort(function(a, b) {
      return titleSort(a.getText(postType + '.title'), b.getText(postType + '.title'))
    })
  }

  return sortKeys(classifiedPosts)
}
