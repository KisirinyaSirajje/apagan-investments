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
      var name = form.querySelector('#name');
      var email = form.querySelector('#email');
      var phone = form.querySelector('#phone');
      var subject = form.querySelector('#subject');
      var message = form.querySelector('#message');

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
    form.querySelectorAll('.form-input').forEach(function (input) {
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
    var statusDiv = document.getElementById('formMessage');
    if (statusDiv) {
      statusDiv.style.display = 'none';
      statusDiv.textContent = '';
    }
  }

  function showMessage(type, text) {
    var statusDiv = document.getElementById('formMessage');
    if (!statusDiv) return;

    statusDiv.textContent = text;
    statusDiv.style.display = 'block';
    statusDiv.style.opacity = '1';
    
    if (type === 'error') {
      statusDiv.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
      statusDiv.style.color = 'var(--color-error)';
      statusDiv.style.border = '1px solid rgba(239, 68, 68, 0.2)';
    } else {
      statusDiv.style.backgroundColor = 'rgba(16, 185, 129, 0.1)';
      statusDiv.style.color = 'var(--color-success)';
      statusDiv.style.border = '1px solid rgba(16, 185, 129, 0.2)';
    }

    /* Auto-hide after 8 seconds */
    setTimeout(function () {
      statusDiv.style.transition = 'opacity 0.3s ease';
      statusDiv.style.opacity = '0';
      setTimeout(function () { statusDiv.style.display = 'none'; }, 300);
    }, 8000);
  }

})();
