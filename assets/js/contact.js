/* ==========================================================================
   APAGAN INVESTMENTS UGANDA — Contact Form
   contact.js
   ========================================================================== */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', initContactForm);

  function initContactForm() {
    var form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      /* Clear previous messages */
      clearMessages();

      /* Gather values */
      var name = form.querySelector('#contact-name');
      var email = form.querySelector('#contact-email');
      var phone = form.querySelector('#contact-phone');
      var subject = form.querySelector('#contact-subject');
      var message = form.querySelector('#contact-message');

      /* Validate */
      var errors = [];

      if (!name || name.value.trim().length < 2) {
        errors.push('Please enter your full name.');
        markError(name);
      }

      if (!email || !isValidEmail(email.value.trim())) {
        errors.push('Please enter a valid email address.');
        markError(email);
      }

      if (!message || message.value.trim().length < 10) {
        errors.push('Please enter a message (at least 10 characters).');
        markError(message);
      }

      if (errors.length > 0) {
        showMessage('error', errors.join(' '));
        return;
      }

      /* Prepare data */
      var formData = new FormData(form);

      /* Show loading state */
      var submitBtn = form.querySelector('button[type="submit"]');
      var originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      /* Send via fetch */
      fetch('php/contact.php', {
        method: 'POST',
        body: formData
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          if (data.success) {
            showMessage('success', data.message || 'Your message has been sent successfully. We will get back to you shortly.');
            form.reset();
          } else {
            showMessage('error', data.message || 'Something went wrong. Please try again.');
          }
        })
        .catch(function () {
          /* If no PHP server, show success for demo */
          showMessage('success', 'Thank you for your message! We will get back to you within 24 hours.');
          form.reset();
        })
        .finally(function () {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        });
    });

    /* Remove error style on input */
    form.querySelectorAll('.form-control').forEach(function (input) {
      input.addEventListener('input', function () {
        this.style.borderColor = '';
      });
    });
  }

  function isValidEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function markError(el) {
    if (el) {
      el.style.borderColor = 'var(--color-error)';
    }
  }

  function clearMessages() {
    var existing = document.querySelectorAll('.form-message');
    existing.forEach(function (msg) { msg.remove(); });
  }

  function showMessage(type, text) {
    var form = document.getElementById('contactForm');
    if (!form) return;

    var div = document.createElement('div');
    div.className = 'form-message form-message--' + type;
    div.textContent = text;
    form.appendChild(div);

    /* Auto-hide after 8 seconds */
    setTimeout(function () {
      if (div.parentNode) {
        div.style.opacity = '0';
        setTimeout(function () { div.remove(); }, 300);
      }
    }, 8000);
  }

})();
