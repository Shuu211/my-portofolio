// script.js
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".section");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, {
    threshold: 0.3,
  });

  sections.forEach(section => {
    observer.observe(section);
  });

  // See More / See Less functionality
  const seeMoreButtons = document.querySelectorAll('.see-more-button');
  const seeLessButtons = document.querySelectorAll('.see-less-button');
  
  seeMoreButtons.forEach(button => {
    button.addEventListener('click', function() {
      const category = this.id.split('-').pop(); // Extract category name
      const galleryId = `${category}-gallery`;
      const gallery = document.getElementById(galleryId);
      
      if (gallery) {
        // Smooth transition
        gallery.style.display = 'block';
        gallery.scrollIntoView({ behavior: 'smooth' });
        
        // Add animation to newly visible projects
        const newProjects = gallery.querySelectorAll('.project');
        newProjects.forEach((project, index) => {
          project.style.opacity = '0';
          project.style.transform = 'translateY(20px)';
          
          setTimeout(() => {
            project.style.opacity = '1';
            project.style.transform = 'translateY(0)';
          }, 100 * index);
        });
      }
    });
  });
  
  seeLessButtons.forEach(button => {
    button.addEventListener('click', function() {
      const galleryId = this.getAttribute('data-target');
      const gallery = document.getElementById(galleryId);
      const categoryTitle = gallery.closest('.category-container').querySelector('.category-title');
      
      if (gallery) {
        gallery.style.display = 'none';
        categoryTitle.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
