document.addEventListener('DOMContentLoaded', function() {
  // Check if user is logged in
  const currentUser = JSON.parse(localStorage.getItem('learnifyCurrentUser'));
  if (!currentUser) {
    window.location.href = 'login.html';
    return;
  }
  
  // Rest of your dashboard initialization code...
});
document.addEventListener('DOMContentLoaded', function() {
    // Initialize date display
    updateCurrentDate();
    
    // Initialize user profile dropdown
    initUserDropdown();
    
    // Initialize mobile menu toggle
    initMobileMenu();
    
    // Initialize logout functionality
    initLogout();
    
    // Load dashboard data
    loadDashboardData();
    
    // Initialize sidebar toggle for mobile
    initSidebarToggle();
});

// Update current date display
function updateCurrentDate() {
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        dateElement.textContent = new Date().toLocaleDateString('en-US', options);
    }
}

// Initialize user profile dropdown
function initUserDropdown() {
    const userProfile = document.getElementById('userProfile');
    
    if (userProfile) {
        // Toggle dropdown on click
        userProfile.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('open');
        });
        
        // Close dropdown when clicking elsewhere
        document.addEventListener('click', function() {
            userProfile.classList.remove('open');
        });
    }
}

// Initialize mobile menu toggle
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileToggle && mainNav) {
        mobileToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            mainNav.classList.toggle('visible');
            this.querySelector('i').classList.toggle('fa-times');
            this.querySelector('i').classList.toggle('fa-bars');
        });
    }
}

// Initialize logout functionality
function initLogout() {
    const logoutButtons = [
        document.getElementById('logoutBtn'),
        document.getElementById('sidebarLogoutBtn')
    ];
    
    logoutButtons.forEach(button => {
        if (button) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                performLogout();
            });
        }
    });
}

// Perform logout action
function performLogout() {
    // In a real app, you would make an API call here
    console.log('User logged out');
    
    // Show confirmation message
    showMessage('You have been logged out successfully!', 'success');
    
    // Redirect to login page after delay
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1500);
}

// Load dashboard data from localStorage or API
function loadDashboardData() {
    // This would typically come from an API in a real app
    const userData = JSON.parse(localStorage.getItem('learnifyUserData')) || {
        name: 'Temwani Zgambo',
        enrolledCourses: 5,
        inProgress: 3,
        completed: 2,
        certificates: 2,
        recentActivity: [
            { type: 'completed', course: 'HTML Basics' },
            { type: 'started', course: 'CSS Flexbox' },
            { type: 'commented', course: 'JavaScript Intro' }
        ]
    };
    
    // Update user name
    const userNameElement = document.getElementById('userName');
    if (userNameElement) {
        userNameElement.textContent = userData.name;
    }
    
    // Update stats
    updateStatCard('enrolled', userData.enrolledCourses);
    updateStatCard('progress', userData.inProgress);
    updateStatCard('completed', userData.completed);
    updateStatCard('certificate', userData.certificates);
    
    // Update recent activity
    updateRecentActivity(userData.recentActivity);
}

// Update individual stat card
function updateStatCard(type, value) {
    const element = document.querySelector(`.stat-card[aria-label*="${type.charAt(0).toUpperCase() + type.slice(1)}"] .stat-number`);
    if (element) {
        element.textContent = value;
    }
}

// Update recent activity list
function updateRecentActivity(activities) {
    const activityList = document.querySelector('.activity-list');
    if (!activityList) return;
    
    activityList.innerHTML = '';
    
    activities.forEach(activity => {
        const li = document.createElement('li');
        
        switch(activity.type) {
            case 'completed':
                li.innerHTML = `<i class="fas fa-check-circle"></i> Completed: ${activity.course}`;
                break;
            case 'started':
                li.innerHTML = `<i class="fas fa-play-circle"></i> Started: ${activity.course}`;
                break;
            case 'commented':
                li.innerHTML = `<i class="fas fa-comment"></i> Commented on: ${activity.course}`;
                break;
            default:
                return;
        }
        
        activityList.appendChild(li);
    });
}

// Initialize sidebar toggle for mobile
function initSidebarToggle() {
    const sidebarToggle = document.createElement('div');
    sidebarToggle.className = 'sidebar-toggle-mobile';
    sidebarToggle.innerHTML = '<i class="fas fa-bars"></i>';
    sidebarToggle.addEventListener('click', toggleSidebar);
    
    const dashboardContainer = document.querySelector('.dashboard-container');
    if (dashboardContainer) {
        dashboardContainer.prepend(sidebarToggle);
    }
}

// Toggle sidebar visibility
function toggleSidebar() {
    const sidebar = document.querySelector('.dashboard-sidebar');
    if (sidebar) {
        sidebar.classList.toggle('visible');
    }
}

// Show message to user (toast notification)
function showMessage(message, type = 'info') {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast-message ${type}`;
    toast.textContent = message;
    
    // Add to body
    document.body.appendChild(toast);
    
    // Auto-remove after delay
    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

// Add this to your Dashboard.CSS:
/*
.toast-message {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 12px 24px;
    border-radius: 4px;
    color: white;
    z-index: 1000;
    animation: slideIn 0.3s ease-out;
}

.toast-message.success {
    background-color: #4CAF50;
}

.toast-message.error {
    background-color: #F44336;
}

.toast-message.info {
    background-color: #2196F3;
}

.toast-message.fade-out {
    animation: fadeOut 0.5s ease-out;
}

@keyframes slideIn {
    from { transform: translateY(100px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
}

@keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
}

@media (max-width: 768px) {
    .dashboard-sidebar {
        position: fixed;
        left: -100%;
        top: 0;
        height: 100vh;
        z-index: 100;
        transition: left 0.3s ease;
    }
    
    .dashboard-sidebar.visible {
        left: 0;
    }
    
    .sidebar-toggle-mobile {
        display: block;
        position: fixed;
        left: 10px;
        top: 10px;
        z-index: 101;
        background: #181d35;
        color: white;
        padding: 10px;
        border-radius: 50%;
        cursor: pointer;
    }
}
*/