document.addEventListener('DOMContentLoaded', function() {
  // Check login status
  if (!checkLoginStatus()) {
    window.location.href = 'login.html';
    return;
  }
  
  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mainNav = document.querySelector('.main-nav');
  
  if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener('click', function() {
      mainNav.classList.toggle('active');
    });
  }
  
  // Load enrolled courses
  loadEnrolledCourses();
  
  // Setup event listeners
  setupEventListeners();
});

function checkLoginStatus() {
  const currentUser = localStorage.getItem('learnifyCurrentUser');
  return currentUser !== null;
}

function loadEnrolledCourses() {
  const currentUser = JSON.parse(localStorage.getItem('learnifyCurrentUser'));
  const userCourses = JSON.parse(localStorage.getItem('userCourses')) || {};
  const enrolledCourseIds = userCourses[currentUser?.email] || [];
  
  const coursesContainer = document.getElementById('courses-container');
  if (!coursesContainer) return;
  
  // Clear existing content
  coursesContainer.innerHTML = '';
  
  if (enrolledCourseIds.length === 0) {
    showEmptyState();
    return;
  }
  
  // Get all courses
  const allCourses = JSON.parse(localStorage.getItem('learnifyCourses')) || getDefaultCourses();
  
  // Filter enrolled courses
  const enrolledCourses = allCourses.filter(course => enrolledCourseIds.includes(course.id));
  
  // Display enrolled courses
  renderCourses(enrolledCourses);
}

function renderCourses(courses) {
  const coursesContainer = document.getElementById('courses-container');
  if (!coursesContainer) return;
  
  courses.forEach(course => {
    // Simulate random progress for demo (0-100%)
    const progress = Math.floor(Math.random() * 100);
    
    const courseCard = document.createElement('div');
    courseCard.className = 'course-card';
    courseCard.innerHTML = `
      <div class="course-image" style="background-image: url('${course.image || 'https://source.unsplash.com/random/600x400/?education'}')">
        <span class="course-badge">${course.category}</span>
      </div>
      <div class="course-info">
        <h3 class="course-title">${course.title}</h3>
        <p class="course-instructor">By ${course.instructor}</p>
        <div class="course-meta">
          <span><i class="fas fa-clock"></i> ${course.duration}</span>
          <span><i class="fas fa-book"></i> ${course.lessons} Lessons</span>
        </div>
        <div class="progress-container">
          <div class="progress-label">
            <span>Progress</span>
            <span>${progress}%</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${progress}%"></div>
          </div>
        </div>
        <div class="course-actions">
          <button class="btn btn-primary" data-id="${course.id}">
            <i class="fas fa-play"></i> Continue
          </button>
          <button class="btn btn-secondary" data-id="${course.id}">
            <i class="fas fa-info-circle"></i> Details
          </button>
        </div>
      </div>
    `;
    coursesContainer.appendChild(courseCard);
  });
}

function showEmptyState() {
  const coursesContainer = document.getElementById('courses-container');
  if (!coursesContainer) return;
  
  coursesContainer.innerHTML = `
    <div class="empty-state">
      <div class="empty-state-icon">
        <i class="fas fa-book-open"></i>
      </div>
      <h3>No courses enrolled yet</h3>
      <p>Browse our catalog to find courses that match your interests</p>
      <a href="courses.html" class="btn-primary">Explore Courses</a>
    </div>
  `;
}

function setupEventListeners() {
  // Filter functionality
  const courseFilter = document.getElementById('course-filter');
  if (courseFilter) {
    courseFilter.addEventListener('change', function() {
      // In a real app, this would filter courses
      console.log('Filter changed to:', this.value);
    });
  }
  
  // Search functionality
  const courseSearch = document.getElementById('course-search');
  if (courseSearch) {
    courseSearch.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase();
      const courseCards = document.querySelectorAll('.course-card');
      
      courseCards.forEach(card => {
        const title = card.querySelector('.course-title').textContent.toLowerCase();
        const instructor = card.querySelector('.course-instructor').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || instructor.includes(searchTerm)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }
  
  // Course action buttons
  document.addEventListener('click', function(e) {
    const continueBtn = e.target.closest('.btn-primary');
    const detailsBtn = e.target.closest('.btn-secondary');
    
    if (continueBtn) {
      const courseId = continueBtn.dataset.id;
      console.log('Continue course:', courseId);
      // Redirect to course content page
      window.location.href = `course-content.html?id=${courseId}`;
    }
    
    if (detailsBtn) {
      const courseId = detailsBtn.dataset.id;
      console.log('View details for course:', courseId);
      // Show course details modal
      showCourseDetails(courseId);
    }
  });
}

// Helper function to show course details (would need a modal implementation)
function showCourseDetails(courseId) {
  console.log('Showing details for course:', courseId);
  // Implement your modal display logic here
}

// Include your getDefaultCourses function from courses.js
function getDefaultCourses() {
  // ... your existing course data ...
  return [];
}