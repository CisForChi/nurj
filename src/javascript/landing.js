var $ = require("jquery");
var collide = require("./modules/_collide");
var _ = require("./modules/_arrow")();

invertHeaderOnCollision()
$(window).scroll(invertHeaderOnCollision)
$('.feature-title').hover(setActiveOnMouseEnter, removeActiveOnMouseLeave)

$('.circle').click(function(e) {
  animating = false
  $('.feature-' + currentFeature).removeClass('is-shown')
  $('.circle-' + currentFeature).removeClass('is-shown')
  var i = parseInt($(this).attr('class').match(/circle-(\d*)/)[1])
  currentFeature = i
  $('.feature-' + currentFeature).addClass('is-shown')
  $('.circle-' + currentFeature).addClass('is-shown')
  setTimeout(function(){ animating = true }, 3000)
})

var numFeatures = $('.feature').length
var currentFeature = 0
var animating = true
function advanceFeature() {
  if (animating) {
    $('.feature-' + currentFeature).removeClass('is-shown')
    $('.circle-' + currentFeature).removeClass('is-shown')
    currentFeature = (currentFeature + 1) % numFeatures
    $('.feature-' + currentFeature).addClass('is-shown')
    $('.circle-' + currentFeature).addClass('is-shown')
  }
}

setInterval(advanceFeature, 4000)

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

function setActiveOnMouseEnter(e) {
  animating = false
  $(this).closest('.feature').addClass('is-active')
}

function removeActiveOnMouseLeave() {
  animating = true
  $(this).closest('.feature').removeClass('is-active')
}
