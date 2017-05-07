var $ = require("jquery");
var collide = require("./modules/_collide");
var _ = require("./modules/_arrow")();

$(window).scroll(hideHeaderOnCollision)
$(window).scroll(fixArrowInBody)

var lastScroll = 0;
var metaBottom = $('.body').offset().top
$('section[data-field="citation"]').addClass('js-detectCollision')

function fixArrowInBody() {
  if ($(window).scrollTop() > metaBottom) {
    $('.arrow').addClass('is-fixed')
  } else {
    $('.arrow').removeClass('is-fixed')
  }
}

function hideHeaderOnCollision() {
  if (lastScroll > $(window).scrollTop()) {
    $('.header.is-sticky').addClass('is-down')
  } else {
    $('.header.is-sticky').removeClass('is-down')
  }

  if ($(window).scrollTop() < metaBottom) {
    $('.header').addClass('is-down')
  }

  var colliding = false
  for (var el of $('.js-detectCollision')) {
    if (collide($('.header-nav'), $(el), 0)) {
      colliding = true
      break
    }
  }

  if (!colliding) {
    $('.header.is-sticky').removeClass('fadeOut')
    $('.header.is-sticky').addClass('fadeIn')
  } else {
    $('.header.is-sticky').removeClass('fadeIn')
    $('.header.is-sticky').addClass('fadeOut')
  }

  lastScroll = $(window).scrollTop()
}
