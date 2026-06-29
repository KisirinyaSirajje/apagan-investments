/* ==========================================================================
   APAGAN INVESTMENTS UGANDA — Testimonials Slider
   slider.js
   ========================================================================== */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', initTestimonialsSlider);

  function initTestimonialsSlider() {
    var slider = document.querySelector('.testimonials-slider');
    if (!slider) return;

    var track = slider.querySelector('.testimonials__track');
    var slides = slider.querySelectorAll('.testimonial');
    var dots = slider.querySelectorAll('.testimonials__dot');
    var currentIndex = 0;
    var autoPlayInterval;
    var autoPlayDelay = 6000;

    function goToSlide(index) {
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
      currentIndex = index;

      track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';

      dots.forEach(function (dot, i) {
        dot.classList.toggle('active', i === currentIndex);
      });
    }

    /* Dot clicks */
    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        goToSlide(i);
        resetAutoPlay();
      });
    });

    /* Auto-play */
    function startAutoPlay() {
      autoPlayInterval = setInterval(function () {
        goToSlide(currentIndex + 1);
      }, autoPlayDelay);
    }

    function resetAutoPlay() {
      clearInterval(autoPlayInterval);
      startAutoPlay();
    }

    /* Touch / Swipe support */
    var touchStartX = 0;
    var touchEndX = 0;

    track.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', function (e) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      var diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          goToSlide(currentIndex + 1);
        } else {
          goToSlide(currentIndex - 1);
        }
        resetAutoPlay();
      }
    }

    /* Initialize */
    goToSlide(0);
    startAutoPlay();

    /* Pause on hover */
    slider.addEventListener('mouseenter', function () {
      clearInterval(autoPlayInterval);
    });

    slider.addEventListener('mouseleave', function () {
      startAutoPlay();
    });
  }
})();
