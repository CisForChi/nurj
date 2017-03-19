$(window).scroll(hideHeaderOnCollision)
$(window).scroll(fixArrowInBody)

var lastScroll = 0;
var metaBottom = $('.meta').offset().top + $('.meta').height()
$('section[data-field="citation"]').addClass('js-detect-collision')

$('.arrow').click(function() {
  $('body').animate({scrollTop: 0}, '300')
})

function fixArrowInBody() {
  if ($(window).scrollTop() > metaBottom) {
    $('.arrow').addClass('is-fixed')
  } else {
    $('.arrow').removeClass('is-fixed')
  }
}

function hideHeaderOnCollision() {
  if ($(window).scrollTop() > metaBottom) {
    $('.header').addClass('is-sticky')
  } else {
    $('.header').removeClass('is-sticky')
  }

  if (lastScroll > $(window).scrollTop()) {
    $('.header.is-sticky').addClass('is-down')
  } else {
    $('.header.is-sticky').removeClass('is-down')
  }

  var colliding = false
  for (var el of $('.js-detect-collision')) {
    if (collide($('.header-nav'), $(el), 20)) {
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

function collide(a, b, margin) {
  margin = margin || 0
  aPos = a.offset()
  bPos = b.offset()

  return !(
    ((aPos.top + a.height() + margin) < (bPos.top)) ||
    (aPos.top > (bPos.top + b.height() + margin)) ||
    ((aPos.left + a.width() + margin) < bPos.left) ||
    (aPos.left > (bPos.left + b.width() + margin))
  );
}
