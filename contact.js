document.getElementById('theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const icon = document.querySelector('#theme-toggle i');
  icon.classList.toggle('fa-moon');
  icon.classList.toggle('fa-sun');
});

// Fake animated submission
document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const message = document.getElementById('form-message');
  const btn = document.getElementById('submit-btn');
  btn.disabled = true;
  btn.textContent = "Sending...";

  setTimeout(() => {
    message.textContent = "Message sent successfully!";
    message.classList.add('visible');
    btn.textContent = "Send Message";
    btn.disabled = false;
    this.reset();
    setTimeout(() => message.classList.remove('visible'), 4000);
  }, 2000);
});
