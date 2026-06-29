/* ==========================================================================
   APAGAN INVESTMENTS UGANDA — Animations JS (FAQ accordion, parallax, etc.)
   animations.js
   ========================================================================== */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initAccordion();
    initParallax();
    initPartnerCarousel();
  });

  /* ── FAQ Accordion ───────────────────────────────────────────────── */
  function initAccordion() {
    var headers = document.querySelectorAll('.accordion-header');
    if (headers.length === 0) return;

    headers.forEach(function (header) {
      header.addEventListener('click', function () {
        var item = this.closest('.accordion-item');
        var body = item.querySelector('.accordion-body');
        var inner = body.querySelector('.accordion-body__inner');
        var isActive = item.classList.contains('active');

        /* Close all others */
        var parent = item.parentElement;
        parent.querySelectorAll('.accordion-item').forEach(function (otherItem) {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            otherItem.querySelector('.accordion-body').style.maxHeight = '0';
          }
        });

        /* Toggle current */
        if (isActive) {
          item.classList.remove('active');
          body.style.maxHeight = '0';
        } else {
          item.classList.add('active');
          body.style.maxHeight = inner.scrollHeight + 24 + 'px';
        }
      });
    });

    /* Open first item by default */
    var first = document.querySelector('.accordion-item');
    if (first) {
      first.classList.add('active');
      var firstBody = first.querySelector('.accordion-body');
      var firstInner = firstBody.querySelector('.accordion-body__inner');
      if (firstBody && firstInner) {
        firstBody.style.maxHeight = firstInner.scrollHeight + 24 + 'px';
      }
    }
  }

  /* ── Simple Parallax ─────────────────────────────────────────────── */
  function initParallax() {
    var elements = document.querySelectorAll('[data-parallax]');
    if (elements.length === 0) return;

    /* Respect prefers-reduced-motion */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    window.addEventListener('scroll', function () {
      var scrollY = window.pageYOffset;

      elements.forEach(function (el) {
        var speed = parseFloat(el.getAttribute('data-parallax')) || 0.3;
        var rect = el.getBoundingClientRect();
        var inView = rect.top < window.innerHeight && rect.bottom > 0;

        if (inView) {
          var offset = scrollY * speed;
          el.style.transform = 'translateY(' + offset + 'px)';
        }
      });
    }, { passive: true });
  }

  /* ── Partner Logo Carousel Duplication ────────────────────────────── */
  function initPartnerCarousel() {
    var track = document.querySelector('.partners-track');
    if (!track) return;

    /* Duplicate logos for seamless loop */
    var items = track.innerHTML;
    track.innerHTML = items + items;
  }

})();
