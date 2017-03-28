invertHeaderOnCollision()
$(window).scroll(invertHeaderOnCollision)

function invertHeaderOnCollision() {
  var colliding = false
  for (var el of $('.js-invertHeaderColor')) {
    if (collide($('.header'), $(el), 0)) {
      colliding = true
      break
    }
  }

  if (!colliding) {
    $('.header').removeClass('inverted')
  } else {
    $('.header').addClass('inverted')
  }
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
