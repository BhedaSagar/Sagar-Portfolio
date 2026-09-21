/* ==========================================================================
   SAGAR BHEDA - PREMIUM PERSONAL PORTFOLIO
   Contact Form, Copy Actions & Toast Feedback
   ========================================================================== */

(function () {
  'use strict';

  const contactForm = document.getElementById('contactForm');
  const toast = document.getElementById('toastNotice');
  const toastText = document.getElementById('toastText');

  // Copy buttons
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const copyPhoneBtn = document.getElementById('copyPhoneBtn');

  function showToast(message) {
    if (!toast || !toastText) return;
    toastText.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3800);
  }

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('sagarbheda2004@gmail.com').then(() => {
        showToast('Email copied: sagarbheda2004@gmail.com');
      }).catch(() => {
        showToast('Direct email: sagarbheda2004@gmail.com');
      });
    });
  }

  if (copyPhoneBtn) {
    copyPhoneBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('+91 9875000720').then(() => {
        showToast('Phone number copied: +91 9875000720');
      }).catch(() => {
        showToast('Phone: +91 9875000720');
      });
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('senderName').value.trim();
      const email = document.getElementById('senderEmail').value.trim();
      const message = document.getElementById('senderMessage').value.trim();

      if (!name || !email || !message) {
        showToast('Please fill out all required fields.');
        return;
      }

      // Prepare direct mailto action
      const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
      const mailtoUrl = `mailto:sagarbheda2004@gmail.com?subject=${subject}&body=${body}`;

      showToast('Opening your email client to send message...');

      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 700);

      contactForm.reset();
    });
  }
})();
