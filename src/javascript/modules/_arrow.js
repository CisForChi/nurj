var $ = require('jquery');

module.exports = function() {
  $('.arrow').click(function() {
    $('body').animate({scrollTop: 0}, '300')
  })
}
