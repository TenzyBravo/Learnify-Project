// login.js - Updated for localStorage authentication

// Toggle password visibility
function togglePassword() {
  const passwordInput = document.getElementById('password');
  const icon = document.querySelector('.password-toggle i');

  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    icon.classList.remove('fa-eye');
    icon.classList.add('fa-eye-slash');
  } else {
    passwordInput.type = 'password';
    icon.classList.remove('fa-eye-slash');
    icon.classList.add('fa-eye');
  }
}

// Show message to user
function showMessage(message, type) {
  const toast = document.createElement('div');
  toast.className = `toast-message ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add('fade-out');
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}

// Check if user exists in localStorage
function checkUserExists(email) {
  const users = JSON.parse(localStorage.getItem('learnifyUsers')) || [];
  return users.some(user => user.email === email);
}

// Register a new user (for initial setup)
function registerUser(email, password, name = 'User') {
  const users = JSON.parse(localStorage.getItem('learnifyUsers')) || [];
  
  // Simple validation
  if (!email || !password) {
    showMessage('Please provide both email and password', 'error');
    return false;
  }
  
  if (checkUserExists(email)) {
    showMessage('User already exists', 'error');
    return false;
  }
  
  // In a real app, you would hash the password before storing
  users.push({
    email,
    password, 
    name,
    enrolledCourses: [],
    lastLogin: new Date().toISOString()
  });
  
  localStorage.setItem('learnifyUsers', JSON.stringify(users));
  return true;
}

// Login function
function login() {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  
  if (!email || !password) {
    showMessage('Please fill in all fields', 'error');
    return;
  }
  
  const users = JSON.parse(localStorage.getItem('learnifyUsers')) || [];
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    // Update last login
    user.lastLogin = new Date().toISOString();
    localStorage.setItem('learnifyUsers', JSON.stringify(users));
    
    // Store current user data
    localStorage.setItem('learnifyCurrentUser', JSON.stringify({
      email: user.email,
      name: user.name
    }));
    
    showMessage('Login successful! Redirecting...', 'success');
    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 1000);
  } else {
    showMessage('Invalid email or password', 'error');
  }
}

// Initialize with a default user if none exists
function initializeDefaultUser() {
  if (!checkUserExists('student@learnify.com')) {
    registerUser('student@learnify.com', 'learn123', 'Demo Student');
  }
}

// Initialize when page loads
initializeDefaultUser();