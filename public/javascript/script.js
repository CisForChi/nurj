$('section[data-field="citation"]').addClass('js-detect-collision')

var lastScroll = 0;

var metaBottom = $('.meta-container').position().top + $('.meta-container').height()

$(window).scroll(function() {
  if ($(window).scrollTop() > metaBottom) {
    $('.header').addClass('header-sticky')
  } else {
    $('.header').removeClass('header-sticky')
  }

  if (lastScroll < $(window).scrollTop()) {
    $('.header-sticky').removeClass('show')
  }

  if (lastScroll > $(window).scrollTop()) {
    $('.header-sticky').addClass('show')
  }

  $('.header-sticky').removeClass('collide')
  for (var el of $('.js-detect-collision')) {
    if (collide($('.nav'), $(el), 20)) {
      $('.header-sticky').addClass('collide')
      break
    }
  }

  lastScroll = $(window).scrollTop()
})

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
