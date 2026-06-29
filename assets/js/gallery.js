/* ==========================================================================
   APAGAN INVESTMENTS UGANDA — Gallery & Lightbox
   gallery.js
   ========================================================================== */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    initGalleryFilters();
    initLightbox();
  });

  /* ── Gallery Filtering ───────────────────────────────────────────── */
  function initGalleryFilters() {
    var buttons = document.querySelectorAll('.gallery-filter-btn');
    var items = document.querySelectorAll('.gallery-item');
    if (buttons.length === 0 || items.length === 0) return;

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = this.getAttribute('data-filter');

        /* Update active button */
        buttons.forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');

        /* Filter items */
        items.forEach(function (item) {
          var category = item.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            item.style.display = '';
            setTimeout(function () {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.9)';
            setTimeout(function () {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  /* ── Lightbox ────────────────────────────────────────────────────── */
  function initLightbox() {
    var lightbox = document.querySelector('.lightbox');
    if (!lightbox) return;

    var lightboxImg = lightbox.querySelector('.lightbox__img');
    var closeBtn = lightbox.querySelector('.lightbox__close');

    /* Open lightbox */
    document.querySelectorAll('[data-lightbox]').forEach(function (item) {
      item.addEventListener('click', function () {
        var src = this.getAttribute('data-lightbox');
        if (src && lightboxImg) {
          lightboxImg.setAttribute('src', src);
          lightboxImg.setAttribute('alt', this.getAttribute('data-lightbox-alt') || 'Gallery image');
          lightbox.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    /* Close lightbox */
    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', closeLightbox);
    }

    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

})();
