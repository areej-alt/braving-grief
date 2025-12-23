// Main JavaScript for Braving Grief Website

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', function () {
    const expanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', (!expanded).toString());

    // Toggle visibility
    mobileMenu.classList.toggle('hidden');

    // Lock/unlock body scroll when menu is open
    document.body.classList.toggle('overflow-hidden', !expanded);

    // Toggle icon between menu/close
    const icon = this.querySelector('.material-symbols-outlined');
    if (icon) icon.textContent = expanded ? 'menu' : 'close';
  });

  // Close menu on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      const icon = mobileMenuBtn.querySelector('.material-symbols-outlined');
      if (icon) icon.textContent = 'menu';
    });
  });
}

// Newsletter Form Submission to Google Sheets (Apps Script)
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
  const emailInput = document.getElementById('email-input');
  const feedbackEl = document.getElementById('newsletter-feedback');
  const submitBtn = newsletterForm.querySelector('button[type="submit"]');

  // TODO: Replace with your deployed Google Apps Script URL
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxFNgCAZBGWhCCeXRBcqTG5j6v5HWHJT55Ajj9fhm6USvpG-x1TG584R3j_VWTKbR-dgA/exec"; // replace with your deployment URL

  const isValidEmail = (value) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(value.trim());
  };

  // Simple feedback: set text and color class; auto-clear after 6s
  let __feedbackTimer = null;
  const setFeedback = (message, type = 'info') => {
    if (!feedbackEl) return;
    if (__feedbackTimer) {
      clearTimeout(__feedbackTimer);
      __feedbackTimer = null;
    }

    feedbackEl.textContent = message;
    feedbackEl.classList.remove('text-green-600', 'text-red-600', 'text-gray-700');
    if (type === 'success') feedbackEl.classList.add('text-green-600');
    else if (type === 'error') feedbackEl.classList.add('text-red-600');
    else feedbackEl.classList.add('text-gray-700');

    __feedbackTimer = setTimeout(() => {
      if (feedbackEl) feedbackEl.textContent = '';
      __feedbackTimer = null;
    }, 6000);
  };

  // Button behavior: simply disable during submission, re-enable after response
  const disableButton = () => { if (submitBtn) submitBtn.disabled = true; };
  const enableButton = () => { if (submitBtn) submitBtn.disabled = false; };

  newsletterForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();

    // Client-side validation
    if (!isValidEmail(email)) {
      emailInput.classList.add('border-red-500', 'focus:border-red-500');
      setFeedback('Please enter a valid email address.', 'error');
      return;
    }

    // Reset validation styles
    emailInput.classList.remove('border-red-500', 'focus:border-red-500');
    setFeedback('');

    try {
      const timestamp = new Date().toISOString();

      // Disable the button during submission
      disableButton();

      // First try a normal POST (form-encoded to avoid preflight). If blocked by CORS, we'll fall back to JSONP below.
      try {
        const form = new URLSearchParams({ email: email, timestamp: timestamp, source: 'website' });
        const response = await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          body: form,
        });

        if (response.ok) {
          setFeedback('Thank you for subscribing! You will receive updates from Tasneem Rahman.', 'success');
          emailInput.value = '';
          // re-enable button after short delay
          setTimeout(enableButton, 2000);
          return;
        }
      } catch (postErr) {
        // swallow, fallback to JSONP
      }

      // JSONP fallback: inject script tag with callback
      const jsonpSubmit = (emailVal, ts, sourceVal, timeoutMs = 10000) => new Promise((resolve, reject) => {
        const cbName = 'gs_cb_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
        const script = document.createElement('script');

        window[cbName] = (res) => {
          resolve(res);
          cleanup();
        };

        function cleanup() {
          try { delete window[cbName]; } catch (e) { window[cbName] = undefined; }
          if (script.parentNode) script.parentNode.removeChild(script);
          clearTimeout(timer);
        }

        const params = new URLSearchParams({ email: emailVal, timestamp: ts, source: sourceVal, callback: cbName });
        script.src = GOOGLE_SCRIPT_URL + '?' + params.toString();
        script.onerror = (e) => { reject(new Error('JSONP script load error')); cleanup(); };

        const timer = setTimeout(() => { reject(new Error('JSONP timeout')); cleanup(); }, timeoutMs);
        document.head.appendChild(script);
      });

      try {
        const res = await jsonpSubmit(email, timestamp, 'website');
        if (res && res.status === 'success') {
          setFeedback('Thank you for subscribing! You will receive updates from Tasneem Rahman.', 'success');
          emailInput.value = '';
          setTimeout(enableButton, 2000);
        } else {
          setFeedback('Something went wrong. Please try again in a moment.', 'error');
          enableButton();
        }
      } catch (_) {
        // Suppress JSONP script load errors from appearing in console
        setFeedback('Something went wrong. Please try again in a moment.', 'error');
        enableButton();
      }
    } finally {
      // ensure button enabled (in case of unexpected flow)
      enableButton();
    }
  });
}

// Scroll Spy - Highlight active nav link based on scroll position
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[data-section]');
  
  let currentSection = '';
  const scrollPosition = window.scrollY + 100; // Offset for better detection
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });
  
  // Update active class on nav links
  navLinks.forEach(link => {
    link.classList.remove('active', 'mobile');
    const section = link.getAttribute('data-section');
    
    if (section === currentSection) {
      link.classList.add('active');
      // Add mobile class if link is inside mobile menu
      if (link.closest('#mobile-menu')) {
        link.classList.add('mobile');
      }
    }
  });
}

// Run on scroll and load
window.addEventListener('scroll', updateActiveNavLink);
window.addEventListener('load', updateActiveNavLink);

// Intersection Observer for Scroll Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-fade-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe sections for animation
document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});

// Add loading="lazy" to images below fold (if not already set)
window.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('img:not([loading])');
  images.forEach((img, index) => {
    if (index > 0) { // Skip first image (hero)
      img.setAttribute('loading', 'lazy');
    }
  });
});

// Carousel Functionality
const initCarousel = () => {
  const carousel = document.getElementById('reviews-carousel');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  const indicators = document.querySelectorAll('.carousel-indicator');
  
  if (!carousel || !prevBtn || !nextBtn) return;

  let currentIndex = 0;
  const totalReviews = 7;
  const reviewsPerView = window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;
  const maxIndex = totalReviews - reviewsPerView;

  const updateCarousel = () => {
    const offset = -(currentIndex * 100) / reviewsPerView;
    carousel.style.transform = `translateX(${offset}%)`;
    
    // Update indicators
    indicators.forEach((indicator, index) => {
      if (index === Math.floor(currentIndex / 1)) {
        indicator.classList.add('bg-primary');
        indicator.classList.remove('bg-gray-300');
        indicator.setAttribute('aria-current', 'true');
      } else {
        indicator.classList.remove('bg-primary');
        indicator.classList.add('bg-gray-300');
        indicator.removeAttribute('aria-current');
      }
    });

    // Update button states
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= maxIndex;
  };

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentIndex < maxIndex) {
      currentIndex++;
      updateCarousel();
    }
  });

  // Click on indicators
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      currentIndex = index;
      updateCarousel();
    });
  });

  // Handle window resize
  window.addEventListener('resize', () => {
    const newReviewsPerView = window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;
    if (newReviewsPerView !== reviewsPerView) {
      currentIndex = 0;
      updateCarousel();
    }
  });

  updateCarousel();
};

// Initialize carousel when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCarousel);
} else {
  initCarousel();
}

// Console log for debugging
console.log('Braving Grief website loaded successfully');