/* ==========================================================================
   APAGAN INVESTMENTS UGANDA — Main JavaScript
   main.js
   ========================================================================== */

(function () {
  'use strict';

  /* ── DOM Ready ───────────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initLoader();
    initScrollProgress();
    initStickyNav();
    initMobileMenu();
    initBackToTop();
    initSmoothScroll();
    initScrollReveal();
    initLazyImages();
    initCurrentNavLink();
  }

  /* ── Loading Screen ──────────────────────────────────────────────── */
  function initLoader() {
    var loader = document.querySelector('.loader');
    if (!loader) return;

    window.addEventListener('load', function () {
      setTimeout(function () {
        loader.classList.add('loaded');
      }, 600);
    });

    /* Safety fallback: hide after 4 seconds regardless */
    setTimeout(function () {
      if (loader) loader.classList.add('loaded');
    }, 4000);
  }

  /* ── Scroll Progress Bar ─────────────────────────────────────────── */
  function initScrollProgress() {
    var bar = document.querySelector('.scroll-progress');
    if (!bar) return;

    window.addEventListener('scroll', function () {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = progress + '%';
    }, { passive: true });
  }

  /* ── Sticky Navigation ──────────────────────────────────────────── */
  function initStickyNav() {
    var header = document.querySelector('.header');
    if (!header) return;

    var threshold = 80;

    function onScroll() {
      if (window.pageYOffset > threshold) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); /* Run once on load */
  }

  /* ── Mobile Menu ─────────────────────────────────────────────────── */
  function initMobileMenu() {
    var toggle = document.querySelector('.header__toggle');
    var nav = document.querySelector('.header__nav');
    var overlay = document.querySelector('.header__overlay');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.contains('open');
      nav.classList.toggle('open');
      toggle.classList.toggle('active');
      if (overlay) overlay.classList.toggle('active');
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });

    if (overlay) {
      overlay.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    /* Close on nav link click */
    var links = nav.querySelectorAll('a');
    links.forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── Back to Top ─────────────────────────────────────────────────── */
  function initBackToTop() {
    var btn = document.querySelector('.back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', function () {
      if (window.pageYOffset > 600) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }, { passive: true });

    btn.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── Smooth Scroll for Anchor Links ──────────────────────────────── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;
        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          var offset = 80;
          var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      });
    });
  }

  /* ── Scroll Reveal ───────────────────────────────────────────────── */
  function initScrollReveal() {
    var elements = document.querySelectorAll('[data-reveal]');
    if (elements.length === 0) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    elements.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ── Lazy Load Images ────────────────────────────────────────────── */
  function initLazyImages() {
    var images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(function (img) {
      if (img.complete) {
        img.classList.add('loaded');
      } else {
        img.addEventListener('load', function () {
          img.classList.add('loaded');
        });
      }
    });
  }

  /* ── Highlight Current Nav Link ──────────────────────────────────── */
  function initCurrentNavLink() {
    var path = window.location.pathname.split('/').pop() || 'index.html';
    var links = document.querySelectorAll('.header__nav a');
    links.forEach(function (link) {
      var href = link.getAttribute('href');
      if (href === path) {
        link.classList.add('active');
      }
    });
  }

})();
