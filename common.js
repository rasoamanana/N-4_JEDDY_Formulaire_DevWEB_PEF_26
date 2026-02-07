// --- GESTION GLOBALE (Thème, Menu, Header, Auth) ---

// 1. GESTION DU THÈME
function toggleTheme() {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    updateThemeIcon(isLight);
    
    // Événement pour que d'autres scripts (ex: Admin) sachent que ça a changé
    document.dispatchEvent(new CustomEvent('themeChanged', { detail: { isLight } }));
}

function updateThemeIcon(isLight) {
    const themeIcons = document.querySelectorAll('.theme-btn i, button[onclick="toggleTheme()"] i');
    themeIcons.forEach(icon => {
        if(icon) icon.className = isLight ? 'fas fa-moon' : 'fas fa-sun';
    });
}

function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const isLight = savedTheme ? savedTheme === 'light' : (window.matchMedia && !window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    if (isLight) document.body.classList.add('light-mode');
    updateThemeIcon(isLight);
}

// Lancement immédiat
initializeTheme();

// 2. LOGIQUE AU CHARGEMENT
document.addEventListener("DOMContentLoaded", function() {
    
    // A. Compteur de Visites (Global)
    if (!sessionStorage.getItem('session_counted')) {
        let totalVisits = parseInt(localStorage.getItem('mizan_total_visits') || '0');
        totalVisits++;
        localStorage.setItem('mizan_total_visits', totalVisits);
        sessionStorage.setItem('session_counted', 'true');
    }

    // B. Gestion Login/Logout (Header)
    const currentUser = localStorage.getItem('currentUser');
    const loginBtn = document.querySelector('.btn-login');

    // On modifie le bouton sauf sur la page de connexion elle-même
    if (currentUser && loginBtn && !window.location.href.includes('connexion.html')) {
        loginBtn.textContent = "Se déconnecter";
        loginBtn.href = "#";
        loginBtn.style.backgroundColor = "#dc3545"; 
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if(confirm("Voulez-vous vous déconnecter ?")) {
                localStorage.removeItem('currentUser');
                localStorage.removeItem('remembered_email');
                window.location.reload();
            }
        });
    }

    // C. Menu Burger
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if(hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if(icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
    }
});

// 3. HEADER SCROLL
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header-pro');
    if (header) {
        if (window.scrollY > 50) header.classList.add('shrink');
        else header.classList.remove('shrink');
    }
});