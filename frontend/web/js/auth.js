/* PulseWatch India - Client-Side Authentication Guard & Session Management */

function checkAuthGuard() {
    const isLoggedIn = localStorage.getItem('pulsewatch_light_logged_in') === 'true';
    const currentPage = window.location.pathname.split('/').pop();

    if (!isLoggedIn && currentPage !== 'login.html' && currentPage !== '') {
        window.location.href = 'login.html';
    }
}

function loginUser(role = 'Official', email = 'official@who.int') {
    localStorage.setItem('pulsewatch_light_logged_in', 'true');
    localStorage.setItem('pulsewatch_light_user_role', role);
    localStorage.setItem('pulsewatch_light_user_email', email);
    window.location.href = 'index.html';
}

function logoutUser() {
    localStorage.removeItem('pulsewatch_light_logged_in');
    localStorage.removeItem('pulsewatch_light_user_role');
    localStorage.removeItem('pulsewatch_light_user_email');
    window.location.href = 'login.html';
}

// Run Auth Guard check immediately on page load
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop();
    if (currentPage !== 'login.html') {
        checkAuthGuard();
    }
});
