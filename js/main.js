/**
 * Main JavaScript for Youness Ablard Portfolio
 * Enhanced with better organization, performance and accessibility
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initNavigation();
  initProjectsAnimation();
  initCategoryFilter();
  initModal();
  initTouchSupport();
  initEmailJS();
  
  // Add skip to content link for accessibility
  addSkipToContentLink();
});

/**
 * Initialize navigation functionality
 */
function initNavigation() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle) {
    // Toggle mobile menu
    menuToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      navLinks.classList.toggle('active');
      document.body.classList.toggle('menu-open');
      
      // Update ARIA attributes for accessibility
      const expanded = navLinks.classList.contains('active');
      menuToggle.setAttribute('aria-expanded', expanded);
    });
    
    // Close menu when clicking a nav link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
      item.addEventListener('click', function() {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('menu-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
  
  // Highlight current section in navigation
  highlightCurrentSection();
  
  // Handle keyboard navigation
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        link.click();
      }
    });
  });
}

/**
 * Highlight the current section in navigation
 */
function highlightCurrentSection() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

/**
 * Add a skip to content link for accessibility
 */
function addSkipToContentLink() {
  const skipLink = document.createElement('a');
  skipLink.href = '#about';
  skipLink.className = 'skip-to-content';
  skipLink.textContent = 'Skip to content';
  document.body.prepend(skipLink);
  
  // Add styles for the skip link
  const style = document.createElement('style');
  style.textContent = `
    .skip-to-content {
      position: absolute;
      top: -40px;
      left: 0;
      padding: 8px 15px;
      background-color: var(--primary-color);
      color: #111;
      z-index: 1001;
      font-weight: bold;
      transition: top 0.3s;
    }
    
    .skip-to-content:focus {
      top: 0;
    }
  `;
  document.head.appendChild(style);
}

/**
 * Initialize animations for project cards
 */
function initProjectsAnimation() {
  const projects = document.querySelectorAll('.project');
  
  // Create an intersection observer to animate projects when they come into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, 100 * Array.from(projects).indexOf(entry.target));
        
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: 0.1});
  
  // Observe each project
  projects.forEach(project => {
    observer.observe(project);
  });
}

/**
 * Initialize category filtering
 */
function initCategoryFilter() {
  const categoryTabs = document.querySelectorAll('.category-tab');
  const projects = document.querySelectorAll('.project');
  
  if (categoryTabs.length) {
    categoryTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Reset active state
        categoryTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        const category = tab.getAttribute('data-category');
        
        // Filter projects with animation
        projects.forEach(project => {
          if (category === 'all' || project.getAttribute('data-category') === category) {
            project.style.display = 'block';
            setTimeout(() => {
              project.style.opacity = '1';
            }, 10);
          } else {
            project.style.opacity = '0';
            setTimeout(() => {
              project.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }
}

/**
 * Initialize modal for project details
 */
function initModal() {
  const modal = document.getElementById('projectModal');
  const modalImage = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDescription');
  const modalClose = document.querySelector('.modal-close');
  const viewButtons = document.querySelectorAll('.view-project');
  
  // Store all projects data for navigation
  let currentProjectIndex = 0;
  const projects = Array.from(viewButtons).map((button, index) => {
    const project = button.closest('.project');
    return {
      index,
      image: button.getAttribute('data-image'),
      title: button.getAttribute('data-title'),
      description: project.querySelector('p')?.textContent || ''
    };
  });
  
  // Open modal when clicking view button
  viewButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      openProjectModal(index);
    });
    
    // Keyboard navigation
    button.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openProjectModal(index);
      }
    });
  });
  
  // Function to open the modal with project data
  function openProjectModal(index) {
    currentProjectIndex = index;
    const project = projects[index];
    
    modalImage.src = project.image;
    modalImage.alt = project.title;
    modalTitle.textContent = project.title;
    
    if (modalDesc) {
      modalDesc.textContent = project.description;
    }
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Set focus to the close button for accessibility
    setTimeout(() => {
      modalClose.focus();
    }, 100);
    
    // Update modal navigation if available
    updateModalNavigation();
  }
  
  // Update modal navigation buttons
  function updateModalNavigation() {
    const prevBtn = document.getElementById('modalPrev');
    const nextBtn = document.getElementById('modalNext');
    
    if (prevBtn && nextBtn) {
      prevBtn.style.visibility = currentProjectIndex > 0 ? 'visible' : 'hidden';
      nextBtn.style.visibility = currentProjectIndex < projects.length - 1 ? 'visible' : 'hidden';
      
      prevBtn.onclick = () => {
        if (currentProjectIndex > 0) {
          openProjectModal(currentProjectIndex - 1);
        }
      };
      
      nextBtn.onclick = () => {
        if (currentProjectIndex < projects.length - 1) {
          openProjectModal(currentProjectIndex + 1);
        }
      };
    }
  }
  
  // Close modal
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }
  
  // Close when clicking outside
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }
  
  // Close modal function
  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Return focus to the button that opened the modal
    setTimeout(() => {
      viewButtons[currentProjectIndex].focus();
    }, 100);
  }
  
  // Keyboard navigation for modal
  document.addEventListener('keydown', (e) => {
    if (modal && modal.style.display === 'flex') {
      if (e.key === 'Escape') {
        closeModal();
      }
      if (e.key === 'ArrowLeft' && currentProjectIndex > 0) {
        openProjectModal(currentProjectIndex - 1);
      }
      if (e.key === 'ArrowRight' && currentProjectIndex < projects.length - 1) {
        openProjectModal(currentProjectIndex + 1);
      }
    }
  });
  
  // Add zoom controls to modal if they exist
  initModalZoom();
}

/**
 * Initialize zoom functionality for modal images
 */
function initModalZoom() {
  const modalImage = document.getElementById('modalImage');
  const zoomIn = document.querySelector('.zoom-in');
  const zoomOut = document.querySelector('.zoom-out');
  const resetZoom = document.querySelector('.reset-zoom');
  
  if (modalImage && zoomIn && zoomOut && resetZoom) {
    let currentZoom = 1;
    
    zoomIn.addEventListener('click', () => {
      if (currentZoom < 3) {
        currentZoom += 0.25;
        modalImage.style.transform = `scale(${currentZoom})`;
      }
    });
    
    zoomOut.addEventListener('click', () => {
      if (currentZoom > 0.5) {
        currentZoom -= 0.25;
        modalImage.style.transform = `scale(${currentZoom})`;
      }
    });
    
    resetZoom.addEventListener('click', () => {
      currentZoom = 1;
      modalImage.style.transform = 'scale(1)';
    });
  }
}

/**
 * Initialize better touch support for mobile devices
 */
function initTouchSupport() {
  const projectCards = document.querySelectorAll('.project');
  
  projectCards.forEach(card => {
    card.addEventListener('touchstart', function() {
      this.classList.add('touch-active');
    }, {passive: true});
    
    card.addEventListener('touchmove', function() {
      this.classList.remove('touch-active');
    }, {passive: true});
    
    card.addEventListener('touchend', function() {
      setTimeout(() => {
        this.classList.remove('touch-active');
      }, 300);
    }, {passive: true});
  });
  
  // Fix for iOS devices
  if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    document.documentElement.classList.add('ios-device');
  }
  
  // Enable swipe navigation in the modal
  enableModalSwipe();
}

/**
 * Enable swipe navigation in the modal
 */
function enableModalSwipe() {
  const modal = document.getElementById('projectModal');
  
  if (modal) {
    let touchStartX = 0;
    let touchEndX = 0;
    
    modal.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});
    
    modal.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, {passive: true});
    
    function handleSwipe() {
      const swipeThreshold = 75;
      
      // Left swipe (next)
      if (touchEndX < touchStartX - swipeThreshold) {
        document.getElementById('modalNext')?.click();
      }
      
      // Right swipe (previous)
      if (touchEndX > touchStartX + swipeThreshold) {
        document.getElementById('modalPrev')?.click();
      }
    }
  }
}

/**
 * Initialize EmailJS for contact form
 */
function initEmailJS() {
  // Initialize EmailJS
  (function() {
    emailjs.init("ql5hrnItW-GFxst-Q");
  })();
  
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const formStatus = document.getElementById('form-status');
  
  if (contactForm) {
    // Add validation feedback
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('invalid', () => {
        input.classList.add('invalid');
        const formGroup = input.closest('.form-group');
        
        // Create error message if it doesn't exist
        if (!formGroup.querySelector('.error-message')) {
          const errorMsg = document.createElement('div');
          errorMsg.className = 'error-message';
          errorMsg.textContent = input.validationMessage;
          formGroup.appendChild(errorMsg);
        }
      });
      
      input.addEventListener('input', () => {
        input.classList.remove('invalid');
        const errorMsg = input.closest('.form-group').querySelector('.error-message');
        if (errorMsg) errorMsg.remove();
      });
    });
    
    // Handle form submission
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      // Validate form data
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      
      if (!name || !email || !message) {
        showFormStatus('Veuillez remplir tous les champs requis.', 'error');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showFormStatus('Veuillez fournir une adresse email valide.', 'error');
        return;
      }
      
      // Message length validation
      if (message.length < 10) {
        showFormStatus('Votre message doit contenir au moins 10 caractères.', 'error');
        return;
      }
      
      // Show loading state
      submitBtn.disabled = true;
      showLoadingState(submitBtn);
      clearFormStatus();
      
      // Send email
      const templateParams = {
        from_name: name,
        from_email: email,
        message: message,
        to_name: "Youness Ablard"
      };
      
      emailjs.send('Shuu211', 'template_45digav', templateParams)
        .then(function() {
          // Success
          showFormStatus('Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.', 'success');
          contactForm.reset();
          
          // Track form submission (optional, for future analytics)
          if (typeof gtag !== 'undefined') {
            gtag('event', 'contact_form_submitted', {
              'event_category': 'Contact',
              'event_label': 'Contact Form'
            });
          }
        })
        .catch(function(error) {
          // Error
          console.error('EmailJS error:', error);
          showFormStatus('Erreur lors de l\'envoi: ' + error.text, 'error');
        })
        .finally(function() {
          // Reset button
          submitBtn.disabled = false;
          hideLoadingState(submitBtn);
        });
    });
  }
  
  // Show form submission status
  function showFormStatus(message, type) {
    if (!formStatus) return;
    
    formStatus.textContent = message;
    formStatus.className = 'form-status ' + type;
    
    // Automatically clear success messages after delay
    if (type === 'success') {
      setTimeout(() => {
        if (formStatus.classList.contains('success')) {
          clearFormStatus();
        }
      }, 5000);
    }
    
    // Make sure the status message is visible
    formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
  
  // Clear form status
  function clearFormStatus() {
    if (formStatus) {
      formStatus.textContent = '';
      formStatus.className = 'form-status';
    }
  }
  
  // Show loading state on button
  function showLoadingState(button) {
    const originalText = button.innerHTML;
    button.setAttribute('data-original-text', originalText);
    
    const loadingSpinner = document.createElement('span');
    loadingSpinner.className = 'loading';
    
    button.innerHTML = '';
    button.appendChild(loadingSpinner);
    button.appendChild(document.createTextNode(' Envoi en cours...'));
  }
  
  // Hide loading state on button
  function hideLoadingState(button) {
    const originalText = button.getAttribute('data-original-text');
    if (originalText) {
      button.innerHTML = originalText;
    } else {
      button.textContent = 'Envoyer';
    }
  }
}