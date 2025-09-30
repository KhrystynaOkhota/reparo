
jQuery(function ($) {
  "use strict";
  $('.comparison-slider-container').each(function (index, sliderContainer) {
    let $slider = $(sliderContainer),
        $sliderLeft = $slider.find('.slider-left'),
        $handle = $slider.find('.handle'),
        $caption = $slider.find('.slider-caption'),
        $captionLeft = $slider.find('.slider-caption-left'),
        $captionRight = $slider.find('.slider-caption-right'),

        $sliderWidth = $slider.width(),
        $startPosition = ($sliderWidth / 100) * 50,

        $btnContainer = $slider.next('.btn-container'),
        $btnExpandLeft = $btnContainer.find('.btn-expand-left'),
        $btnExpandCenter = $btnContainer.find('.btn-expand-center'),
        $btnExpandRight = $btnContainer.find('.btn-expand-right'),

        tl = new TimelineMax({delay: 0.5});

    // Initial animation
    tl.set($caption, {autoAlpha: 0, yPercent: -100}, 0);
    tl.to($sliderLeft, 0.7, {width: $startPosition, ease: Back.easeOut.config(1.7)}, 0);
    tl.to($handle, 0.7, {x: $startPosition, ease: Back.easeOut.config(1.7)}, 0);
    tl.staggerTo($caption, 0.7, {autoAlpha: 1, yPercent: 0, ease: Back.easeInOut.config(3)}, -0.3, 0);

    // Drag handler
    Draggable.create($handle, {
      bounds: {minX: 0, maxX: $sliderWidth},
      type: 'x',
      edgeResistance: 1,
      throwProps: true,
      onDrag: function () {
        TweenMax.set($sliderLeft, {width: this.endX});

        if (this.endX >= (this.maxX / 2) && this.getDirection() === 'right') {
          showLeftCaption();
        }
        if (this.endX <= (this.maxX / 2) && this.getDirection() === 'left') {
          showRightCaption();
        }
      }
    });

    // Caption functions
    function showLeftCaption() {
      TweenMax.to($captionLeft, 0.3, {autoAlpha: 1, yPercent: 0});
      TweenMax.to($captionRight, 0.3, {autoAlpha: 0, yPercent: -100});
    }

    function showRightCaption() {
      TweenMax.to($captionLeft, 0.3, {autoAlpha: 0, yPercent: -100});
      TweenMax.to($captionRight, 0.3, {autoAlpha: 1, yPercent: 0});
    }

    function showBothCaptions() {
      TweenMax.to($captionLeft, 0.3, {autoAlpha: 1, yPercent: 0});
      TweenMax.to($captionRight, 0.3, {autoAlpha: 1, yPercent: 0});
    }

    function slideHandleTo(pos) {
      let newPos = ($sliderWidth / 100) * pos;
      TweenMax.to($sliderLeft, 0.7, {width: newPos, ease: Power2.easeOut});
      TweenMax.to($handle, 0.7, {x: newPos, ease: Power2.easeOut});
    }

    // Button click handlers
    $btnExpandLeft.on('click', function () {
      slideHandleTo(100);
      showLeftCaption();
    });

    $btnExpandCenter.on('click', function () {
      slideHandleTo(50);
      showBothCaptions();
    });

    $btnExpandRight.on('click', function () {
      slideHandleTo(0);
      showRightCaption();
    });
  });
});
