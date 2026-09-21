/* ==========================================================================
   SAGAR BHEDA - PREMIUM PERSONAL PORTFOLIO
   Main Application Logic, Navigation, Modals & UI Controls
   ========================================================================== */

(function () {
  'use strict';

  // 1. Mobile Menu Drawer Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileToggle.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', false);
      });
    });
  }

  // 2. Navbar Background on Scroll
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // 3. Scroll Spy for Active Navigation Highlight
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');

  function updateActiveNav() {
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // 4. Recruiter View vs Technical View Toggle (Queue Platform)
  const modeButtons = document.querySelectorAll('.mode-btn');
  modeButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      const parentCard = this.closest('.project-feature-card');
      if (!parentCard) return;

      const targetMode = this.getAttribute('data-mode');
      const siblings = parentCard.querySelectorAll('.mode-btn');
      siblings.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const panels = parentCard.querySelectorAll('.view-panel');
      panels.forEach(p => {
        p.classList.remove('active');
        if (p.getAttribute('data-view') === targetMode) {
          p.classList.add('active');
        }
      });
    });
  });

  // 5. Skills Matrix Tabs Filter
  const skillTabs = document.querySelectorAll('.skill-tab-btn');
  const skillCards = document.querySelectorAll('.skill-category-card');

  skillTabs.forEach(tab => {
    tab.addEventListener('click', function () {
      skillTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');

      const category = this.getAttribute('data-category');
      skillCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 6. Resume Modal Controls
  const openResumeBtns = document.querySelectorAll('.trigger-resume-modal');
  const resumeModal = document.getElementById('resumeModal');
  const closeResumeBtn = document.getElementById('closeResumeBtn');

  if (resumeModal) {
    openResumeBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        resumeModal.classList.add('active');
      });
    });

    if (closeResumeBtn) {
      closeResumeBtn.addEventListener('click', () => {
        resumeModal.classList.remove('active');
      });
    }

    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) {
        resumeModal.classList.remove('active');
      }
    });
  }

  // 7. Scroll Reveal Observer
  const observerOptions = {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal-init').forEach(el => {
    revealObserver.observe(el);
  });

})();
