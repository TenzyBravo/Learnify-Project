// Authentication Functions
function checkLoginStatus() {
    const currentUser = JSON.parse(localStorage.getItem('learnifyCurrentUser'));
    return !!currentUser; // Returns true if user exists, false otherwise
}

// Data Loading Functions
function loadCourses() {
    let courses = JSON.parse(localStorage.getItem('learnifyCourses'));
    if (!courses || courses.length === 0) {
        console.log("Initializing default course data...");
        courses = getDefaultCourses();
        localStorage.setItem('learnifyCourses', JSON.stringify(courses));
    }
    return courses;
}

// ... rest of your existing code ...
const coursesData = {
    1: {
        id: 1,
        title: 'Introduction to Web Development',
        instructor: 'Sarah Johnson',
        category: 'Web Development',
        description: 'Learn the fundamentals of HTML, CSS, and JavaScript.',
        curriculum: ['HTML Basics', 'CSS Fundamentals', 'JavaScript Intro']
    }
    // Add other courses...
};

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    if (!checkLoginStatus()) {
        window.location.href = 'login.html';
        return;
    }
    setupEventListeners();
});

function setupEventListeners() {
    // Event delegation for all interactive elements
    document.addEventListener('click', function(e) {
        // View Details button
        if (e.target.classList.contains('view-details') || e.target.closest('.view-details')) {
            const btn = e.target.classList.contains('view-details') ? 
                        e.target : e.target.closest('.view-details');
            const courseId = parseInt(btn.dataset.id);
            if (courseId) showCourseDetails(courseId);
        }
        
        // Enroll button
        if (e.target.id === 'enrollBtn' || e.target.closest('#enrollBtn')) {
            const btn = e.target.id === 'enrollBtn' ? e.target : e.target.closest('#enrollBtn');
            const courseId = parseInt(btn.dataset.id);
            const isEnrolled = checkEnrollmentStatus(courseId);
            
            if (isEnrolled) {
                window.location.href = `course-content.html?id=${courseId}`;
            } else {
                enrollInCourse(courseId);
            }
        }
        
        // Close modal
        if (e.target.id === 'close-detail' || e.target.closest('#close-detail')) {
            document.getElementById('course-detail').style.display = 'none';
        }
    });
}

function showCourseDetails(courseId) {
    const course = coursesData[courseId];
    if (!course) {
        console.error('Course not found:', courseId);
        return;
    }

    const isEnrolled = checkEnrollmentStatus(courseId);
    
    // Update modal content
    const elementsToUpdate = {
        'detail-title': course.title,
        'detail-instructor': `Instructor: ${course.instructor}`,
        'detail-category': course.category,
        'detail-description': course.description
    };
    
    for (const [id, value] of Object.entries(elementsToUpdate)) {
        const element = document.getElementById(id);
        if (element) element.textContent = value;
    }
    
    // Update curriculum
    const curriculumList = document.getElementById('curriculum-list');
    if (curriculumList) {
        curriculumList.innerHTML = course.curriculum.map(item => 
            `<li><i class="fas fa-check-circle"></i> ${item}</li>`
        ).join('');
    }
    
    // Update enroll button
    const enrollBtn = document.getElementById('enrollBtn');
    if (enrollBtn) {
        enrollBtn.textContent = isEnrolled ? 'Go to Course' : 'Enroll in this Course';
        enrollBtn.className = isEnrolled ? 'enroll-button enrolled' : 'enroll-button';
        enrollBtn.dataset.id = courseId;
    }
    
    // Show modal
    const modal = document.getElementById('course-detail');
    if (modal) modal.style.display = 'block';
}

function checkEnrollmentStatus(courseId) {
    const currentUser = JSON.parse(localStorage.getItem('learnifyCurrentUser'));
    if (!currentUser?.email) return false;
    
    const userCourses = JSON.parse(localStorage.getItem('userCourses')) || {};
    return Array.isArray(userCourses[currentUser.email]) && 
           userCourses[currentUser.email].includes(courseId);
}

function enrollInCourse(courseId) {
    const currentUser = JSON.parse(localStorage.getItem('learnifyCurrentUser'));
    if (!currentUser?.email) {
        window.location.href = 'login.html';
        return;
    }

    let userCourses = JSON.parse(localStorage.getItem('userCourses')) || {};
    userCourses[currentUser.email] = userCourses[currentUser.email] || [];
    
    if (!userCourses[currentUser.email].includes(courseId)) {
        userCourses[currentUser.email].push(courseId);
        localStorage.setItem('userCourses', JSON.stringify(userCourses));
        
        showMessage(`Enrolled in "${coursesData[courseId]?.title || 'the course'}"`, "success");
        showCourseDetails(courseId);
        updateCourseCardStatus(courseId, true);
    }
}

function updateCourseCardStatus(courseId, isEnrolled) {
    document.querySelectorAll(`.course-card [data-id="${courseId}"]`).forEach(btn => {
        if (btn.classList.contains('view-details')) {
            btn.textContent = isEnrolled ? 'View Course' : 'View Details';
            
            const card = btn.closest('.course-card');
            if (card) {
                const imageDiv = card.querySelector('.course-image');
                if (imageDiv) {
                    let badge = imageDiv.querySelector('.enrolled-badge');
                    if (isEnrolled && !badge) {
                        badge = document.createElement('span');
                        badge.className = 'enrolled-badge';
                        badge.textContent = 'Enrolled';
                        imageDiv.appendChild(badge);
                    } else if (!isEnrolled && badge) {
                        badge.remove();
                    }
                }
            }
        }
    });
}

function showMessage(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast-message ${type}`;
    toast.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 
                          type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}