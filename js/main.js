/**
 * Main JavaScript for Youness Ablard Portfolio
 * Enhanced with better organization, performance and accessibility
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initNavigation();
  injectProjects();
  initProjectsAnimation();
  initCategoryFilter();
  initModal();
  initTouchSupport();
  initEmailJS();
  // Refresh animations after injection for new items
  initProjectsAnimation();
  initAdminPanel();
  initScrollProgress();
  initProjectSearch();
});

/**
 * Structured project data (extensible)
 */
const PROJECTS_DATA = {
  photoshop: [
    {
      title: 'Poster GIANNIS',
      image: 'images/photoshop/Giannis poster.jpg',
      alt: 'Poster dynamique Giannis Antetokounmpo avec effets énergétiques',
      description: 'Poster sportif focalisé sur l\'intensité du mouvement, éclairages directionnels et overlays dynamiques.',
      tags: ['Photoshop','Sport','Basket']
    },
    {
      title: 'Poster CR7',
      image: 'images/photoshop/CR7 POSTER.jpg',
      alt: 'Poster Cristiano Ronaldo, composition sportive dynamique',
      description: 'Affiche sportive mettant en scène Cristiano Ronaldo avec effets d\'éclairage et énergie visuelle.',
      tags: ['Photoshop','Sport','Football']
    },
    {
      title: 'Poster CURRY',
      image: 'images/photoshop/poster curry.jpg',
      alt: 'Poster Stephen Curry en action avec effets de particules',
      description: 'Affiche freeze-frame d\'une action de tir, énergie visuelle fragmentée pour dynamisme.',
      tags: ['Photoshop','Sport','Basket']
    },
    {
      title: 'Poster OZIL',
      image: 'images/photoshop/OZIL POSTER.jpg',
      alt: 'Poster portrait footballer Mesut Özil ambiance lumineuse dorée',
      description: 'Portrait stylisé avec accent sur lumière dorée et contraste subtil, composition centrée.',
      tags: ['Photoshop','Sport','Portrait']
    },
    {
      title: 'Poster Sharingan',
      image: 'images/photoshop/poster sharingan.jpg',
      alt: 'Poster Sharingan style manga avec motif Sharingan rouge lumineux',
      description: 'Affiche inspirée de l\'univers manga mettant en valeur le Sharingan avec effets lumineux rouges et contraste sombre.',
      tags: ['Photoshop','Manga','Fanart']
    },
    {
      title: 'Thumbnail Kobe',
      image: 'images/photoshop/thumbnail kobe.jpg',
      alt: 'Thumbnail hommage Kobe Bryant en violet et or',
      description: 'Miniature hommage à Kobe Bryant utilisant la palette violet/or et une composition centrée dynamique.',
      tags: ['Photoshop','Basket','Hommage']
    }
  ],
  illustrator: [
    {
      title: 'Pochette Album Musical',
      image: 'images/illustrator/CONTROLE POCHETTE YOUNESS ALARD.png',
      alt: 'Pochette d\'album graphique colorée',
      description: 'Conception graphique d\'une pochette d\'album combinant typographie expressive et composition harmonieuse.',
      tags: ['Illustrator','Design vectoriel']
    },
    {
      title: 'Flyer Surf Spot',
      image: 'images/illustrator/Flyers surf spot.png',
      alt: 'Flyer promotionnel pour spot de surf',
      description: 'Flyer promotionnel évoquant l\'ambiance balnéaire avec palette vibrante et mise en page dynamique.',
      tags: ['Illustrator','Design publicitaire']
    },
    {
      title: 'Nitro Ride - Identité visuelle',
      image: 'images/illustrator/Nitro Ride.png',
      alt: 'Identité visuelle Nitro Ride sports extrêmes',
      description: 'Identité visuelle orientée sports extrêmes axée sur le dynamisme et l\'adrénaline.',
      tags: ['Illustrator','Branding']
    }
  ],
  blender: [
    { title: 'Katana', image: 'images/3D/katana.png', alt: 'Katana 3D modélisé dans Blender', description: 'Modélisation et rendu d\'un katana, matériaux métalliques et textures de manche.', tags: ['Blender','3D'] },
    { title: 'Pokéball', image: 'images/3D/Pokeball.png', alt: 'Pokéball 3D avec éclairage studio', description: 'Étude d\'éclairage et de matériaux sur une Pokéball.', tags: ['Blender','3D'] },
    { title: 'Phare', image: 'images/3D/PHARE.png', alt: 'Phare 3D sur falaise au crépuscule', description: 'Composition d\'un phare en bord de mer, travail des volumes et de l\'ambiance.', tags: ['Blender','3D'] },
    { title: 'My First Forest', image: 'images/3D/MY FIRST FOREST .png', alt: 'Première forêt 3D avec éclairage volumétrique', description: 'Scène de forêt procédurale, brume et lumières volumétriques.', tags: ['Blender','3D'] },
    { title: 'Logo Minnesota', image: 'images/3D/logo minesota.png', alt: 'Logo Minnesota modélisé en 3D', description: 'Exploration typographique en 3D et ombrage stylisé.', tags: ['Blender','3D'] },
    { title: 'Mon Premier Triangle', image: 'images/3D/MON PREMIER TRIANGLE .png', alt: 'Premier triangle 3D d\'apprentissage', description: 'Premiers pas en 3D: primitives, matériaux et rendu.', tags: ['Blender','3D'] }
  ]
};

/**
 * Inject projects into DOM from PROJECTS_DATA
 */
function injectProjects() {
  const photoshopGrid = document.getElementById('photoshop-projects-grid');
  const illustratorGrid = document.getElementById('illustrator-projects-grid');
  const blenderGrid = document.getElementById('blender-projects-grid');
  const adminProjects = loadAdminProjects();
  // Fusion des projets admin
  const photoshopAll = [...PROJECTS_DATA.photoshop, ...adminProjects.filter(p=>p.category==='photoshop')];
  const illustratorAll = [...PROJECTS_DATA.illustrator, ...adminProjects.filter(p=>p.category==='illustrator')];
  const blenderAll = [...(PROJECTS_DATA.blender||[]), ...adminProjects.filter(p=>p.category==='blender')];
  const makeProjectHTML = (proj, category, index) => `
    <article class="project" data-category="${category}" data-index="${index}">
      <div class="project-media">
        <img src="${proj.image}" alt="${proj.alt}" class="project-img" loading="lazy" width="300" height="200" />
      </div>
      <div class="project-content">
        <h4>${proj.title}</h4>
        <p>${proj.description}</p>
        <div class="project-tags" aria-label="Techniques utilisées">
          ${proj.tags.map(t => `<span class='project-tag'>${t}</span>`).join('')}
        </div>
        <button class="project-button view-project" data-image="${proj.image}" data-title="${proj.title}" aria-label="Voir en détail: ${proj.title}">Voir en détail</button>
      </div>
    </article>`;

  if (photoshopGrid) {
    const featuredPhotoshop = photoshopAll.slice(0,3); // always only 3 featured
    photoshopGrid.innerHTML = featuredPhotoshop.map((p,i)=>makeProjectHTML(p,'photoshop',i)).join('');
  }
  if (illustratorGrid) {
    illustratorGrid.innerHTML = illustratorAll.map((p,i)=>makeProjectHTML(p,'illustrator',i)).join('');
  }
  if (blenderGrid) {
  const featuredBlender = blenderAll.slice(0,3);
    blenderGrid.innerHTML = featuredBlender.map((p,i)=>makeProjectHTML(p,'blender',i)).join('');
  }
}

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

/** Scroll progress bar **/
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  const update = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = ratio + '%';
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
}

/** Live project search filter **/
function initProjectSearch() {
  const input = document.getElementById('project-search');
  if (!input) return;
  const section = document.getElementById('projects');
  const noResultId = 'no-project-result';

  function ensureProjects() {
    return document.querySelectorAll('.project');
  }
  input.addEventListener('input', () => {
    const term = input.value.trim().toLowerCase();
    let visibleCount = 0;
    const projects = ensureProjects();
    projects.forEach(card => {
      const text = card.textContent.toLowerCase();
      if (!term || text.includes(term)) {
        card.style.display = 'block';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });
    let msg = document.getElementById(noResultId);
    if (visibleCount === 0) {
      if (!msg) {
        msg = document.createElement('p');
        msg.id = noResultId;
        msg.style.textAlign = 'center';
        msg.style.opacity = '.8';
        msg.textContent = 'Aucun projet trouvé.';
        section.appendChild(msg);
      }
    } else if (msg) {
      msg.remove();
    }
  });
}

// (Theme toggle removed - dark mode only)

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
  moveTabIndicator(tab, categoryTabs);
        
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
  let viewButtons = document.querySelectorAll('.view-project');

  // Rebind if projects were injected after DOMContentLoaded
  const observer = new MutationObserver(()=>{
    viewButtons = document.querySelectorAll('.view-project');
    bindButtons();
  });
  observer.observe(document.body, { childList: true, subtree: true });
  
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
  function bindButtons() {
    viewButtons.forEach((button, index) => {
      button.onclick = () => openProjectModal(index);
      button.onkeydown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openProjectModal(index);
        }
      };
    });
  }
  bindButtons();
  
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
  modal.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
  trapFocus(modal);
    
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
  modal.setAttribute('aria-hidden','true');
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

/**
 * Focus trap utility for modal accessibility
 */
function trapFocus(container) {
  const focusableSelectors = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
  const focusable = Array.from(container.querySelectorAll(focusableSelectors));
  if (!focusable.length) return;
  let first = focusable[0];
  let last = focusable[focusable.length -1];
  container.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    }
  });
}

/** Admin Panel **/
function initAdminPanel() {
  const panel = document.getElementById('admin');
  const link = document.querySelector('.admin-link');
  const form = document.getElementById('admin-add-project');
  const list = document.getElementById('admin-projects-ul');
  const exportBtn = document.getElementById('admin-export');
  const clearBtn = document.getElementById('admin-clear');
  if (!panel || !form) return;

  // Affichage admin via combinaison de touches (Shift + A + P)
  let keys = new Set();
  window.addEventListener('keydown', (e)=>{
    keys.add(e.key.toLowerCase());
    if (keys.has('shift') && keys.has('a') && keys.has('p')) {
      panel.hidden = !panel.hidden;
      if (link) { link.classList.add('visible'); link.style.display='inline'; }
      if (!panel.hidden) { panel.scrollIntoView({behavior:'smooth'}); }
    }
  });
  window.addEventListener('keyup',(e)=> keys.delete(e.key.toLowerCase()));

  // Charger projets existants
  renderAdminProjects(list);

  form.addEventListener('submit', e => {
    e.preventDefault();
    const project = collectAdminFormData();
    if (!project) return;
    const data = loadAdminProjects();
    data.push(project);
    saveAdminProjects(data);
    form.reset();
    renderAdminProjects(list);
    injectProjects();
    initProjectsAnimation();
    initModal();
  });

  exportBtn?.addEventListener('click', ()=> {
    const data = JSON.stringify(loadAdminProjects(), null, 2);
    const blob = new Blob([data], {type:'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'admin-projects.json'; a.click();
    URL.revokeObjectURL(url);
  });

  clearBtn?.addEventListener('click', ()=> {
    if (confirm('Effacer tous les projets ajoutés (localStorage) ?')) {
      localStorage.removeItem('adminProjects');
      renderAdminProjects(list);
      injectProjects();
      initModal();
    }
  });
}

function collectAdminFormData() {
  const category = document.getElementById('admin-category').value.trim();
  const title = document.getElementById('admin-title').value.trim();
  const image = document.getElementById('admin-image').value.trim();
  const alt = document.getElementById('admin-alt').value.trim();
  const tagsRaw = document.getElementById('admin-tags').value.trim();
  const dateVal = document.getElementById('admin-date').value;
  const desc = document.getElementById('admin-desc').value.trim();
  if (!category || !title || !image || !alt || !desc) return null;
  return {
    category,
    title,
    image,
    alt,
    description: desc,
    tags: tagsRaw ? tagsRaw.split(',').map(t=>t.trim()).filter(Boolean) : [],
    date: dateVal || new Date().toISOString().slice(0,10)
  };
}

function loadAdminProjects() {
  try { return JSON.parse(localStorage.getItem('adminProjects')) || []; } catch(e){ return []; }
}
function saveAdminProjects(data) {
  localStorage.setItem('adminProjects', JSON.stringify(data));
}

function renderAdminProjects(listEl) {
  if (!listEl) return;
  const data = loadAdminProjects();
  if (!data.length) { listEl.innerHTML = '<li>Aucun projet ajouté.</li>'; return; }
  listEl.innerHTML = data.map((p,i)=> `
    <li>
      <strong>${p.title}</strong> <span>(${p.category})</span>
      <span>${p.tags?.join(', ') || ''}</span>
      <button type='button' data-index='${i}' aria-label='Supprimer ${p.title}'>Supprimer</button>
    </li>`).join('');
  listEl.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', ()=> {
      const index = parseInt(btn.dataset.index,10);
      const projects = loadAdminProjects();
      projects.splice(index,1);
      saveAdminProjects(projects);
      renderAdminProjects(listEl);
      injectProjects();
      initModal();
    });
  });
}

