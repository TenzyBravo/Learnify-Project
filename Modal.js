function setupModals() {
    // Get modal elements
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');

    // Get button elements
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');

    // Get close buttons
    const closeButtons = document.querySelectorAll('.close-btn');

    // Open login modal
    loginBtn.addEventListener('click', () => {
        loginModal.style.display = 'block';
        loginModal.setAttribute('aria-hidden', 'false');
    });

    // Open signup modal
    signupBtn.addEventListener('click', () => {
        signupModal.style.display = 'block';
        signupModal.setAttribute('aria-hidden', 'false');
    });

    // Close modals when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === loginModal) {
            loginModal.style.display = 'none';
            loginModal.setAttribute('aria-hidden', 'true');
        }
        if (event.target === signupModal) {
            signupModal.style.display = 'none';
            signupModal.setAttribute('aria-hidden', 'true');
        }
    });

    // Close modals by clicking the close button
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
                modal.setAttribute('aria-hidden', 'true');
            }
        });
    });

    // Return modal elements for further use if needed
    return { loginModal, signupModal };
}

// Initialize modals
const { loginModal, signupModal } = setupModals();
