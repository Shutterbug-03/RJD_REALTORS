/**
 * RJD REALTORS — PRIVATE WEALTH & STRATEGIC LAND ADVISORY
 * Interactive Engine: Dynamic Advisory Profile Router, Location Intelligence & WhatsApp Desk
 */

(function () {
  'use strict';

  // Configured Advisory WhatsApp Number (+91 99000 98736)
  const ADVISOR_WHATSAPP = "919900098736";

  // State Management
  let activeProfile = "Independent Agent";
  let enteredLocation = "";

  /**
   * Helper: Generate direct WhatsApp Link
   */
  function buildWhatsAppUrl(message) {
    const encoded = encodeURIComponent(message.trim());
    return `https://wa.me/${ADVISOR_WHATSAPP}?text=${encoded}`;
  }

  /**
   * Profile Pill Selection Logic
   */
  function initProfileSelector() {
    const profilePills = document.querySelectorAll('.profile-pill');
    const locationInput = document.getElementById('propertyLocationInput');
    const launchBtn = document.getElementById('launchWhatsappAction');

    if (!profilePills.length || !launchBtn) return;

    profilePills.forEach(pill => {
      pill.addEventListener('click', function () {
        profilePills.forEach(p => p.classList.remove('active'));
        this.classList.add('active');
        activeProfile = this.getAttribute('data-profile') || "Independent Agent";
      });
    });

    if (locationInput) {
      locationInput.addEventListener('input', function (e) {
        enteredLocation = e.target.value.trim();
      });
    }

    launchBtn.addEventListener('click', function () {
      let message = `Hello RJD Realtors, I am an agent/broker (${activeProfile}) and would like to partner with your advisory desk for my clients' title audits`;
      if (enteredLocation) {
        message += ` in ${enteredLocation}`;
      }
      message += `. Looking forward to your clinical due diligence guidance.`;

      const targetUrl = buildWhatsAppUrl(message);
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    });
  }

  /**
   * Deliverables Links - Smooth connection to consultation desk
   */
  function initDeliverablesLinks() {
    const deliverableLinks = document.querySelectorAll('.deliverable-link');
    const locationInput = document.getElementById('propertyLocationInput');

    deliverableLinks.forEach(link => {
      link.addEventListener('click', function (e) {
        const deliverableName = this.getAttribute('data-deliverable') || "Institutional Title Audit";
        const consultCard = document.getElementById('consultation');
        
        if (locationInput && !enteredLocation) {
          locationInput.placeholder = `Focus: ${deliverableName}`;
        }

        if (consultCard) {
          consultCard.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  /**
   * Smooth Anchor Scrolling with header offset
   */
  function initSmoothScroll() {
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#' || !targetId) return;

        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          const headerOffset = 90;
          const elementPosition = targetEl.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  function initNavbarScroll() {
    const navbar = document.querySelector('.navbar-wrapper');
    if (!navbar) return;
    
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        navbar.classList.add('nav-hidden');
      } else {
        navbar.classList.remove('nav-hidden');
      }
      lastScrollY = window.scrollY;
    });
  }

  // Initialize all interactive components on DOM ready
  document.addEventListener('DOMContentLoaded', function () {
    initProfileSelector();
    initDeliverablesLinks();
    initSmoothScroll();
    initNavbarScroll();
  });

})();
