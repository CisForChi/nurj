var lastScroll = 0;

$(window).scroll(function() {
  if ($(window).scrollTop() > 300) {
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

  lastScroll = $(window).scrollTop()
})
