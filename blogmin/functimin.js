const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const themeToggle = document.querySelector('.theme-toggle');
const html = document.documentElement;
const themeIcon = themeToggle.querySelector('i');
const closeMenu = document.querySelector('.close-menu');
const sideMenu = document.querySelector('.side-menu');
const overlay = document.querySelector('.overlay');

// Menu Toggle
menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Theme Toggle
themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    
    themeIcon.classList.remove(newTheme === 'dark' ? 'fa-sun' : 'fa-moon');
    themeIcon.classList.add(newTheme === 'dark' ? 'fa-moon' : 'fa-sun');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
        navLinks.classList.remove('active');
    }
});

// Add this to your existing JavaScript
const navItems = document.querySelectorAll('.nav-item');

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class and highlight from all items
        navItems.forEach(navItem => {
            navItem.classList.remove('active', 'highlight');
            navItem.removeAttribute('data-active');
        });
        
        // Add active class and highlight to clicked item
        item.classList.add('active', 'highlight');
        item.setAttribute('data-active', 'true');
        
        // Remove highlight after half second (500ms)
        setTimeout(() => {
            item.classList.remove('highlight');
        }, 200);
        
        // Close mobile menu if open
        navLinks.classList.remove('active');
    });
});

// Initialize active state based on data-active attribute
window.addEventListener('load', () => {
    const activeItem = document.querySelector('.nav-item[data-active="true"]');
    if (activeItem) {
        activeItem.classList.add('active');
    }
});

// Add this to your existing JavaScript
const userProfileContainer = document.querySelector('.user-profile-container');
const userProfile = document.querySelector('.user-profile');
const notificationBtn = document.querySelector('.notification-btn');

userProfile.addEventListener('click', (e) => {
    e.stopPropagation();
    userProfileContainer.classList.toggle('active');
});

document.addEventListener('click', (e) => {
    if (!userProfileContainer.contains(e.target)) {
        userProfileContainer.classList.remove('active');
    }
});

notificationBtn.addEventListener('click', () => {
    // Add notification functionality here
    const badge = notificationBtn.querySelector('.notification-dot');
    badge.style.display = 'none';
});

menuBtn.addEventListener('click', toggleMenu);
closeMenu.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);

function toggleMenu() {
    sideMenu.classList.toggle('active');
    overlay.classList.toggle('active');
    menuBtn.classList.toggle('active');
    
    const menuItems = document.querySelectorAll('.side-menu .menu-item');
    
    if (sideMenu.classList.contains('active')) {
        // Reset all menu items first
        menuItems.forEach(item => {
            item.style.transform = 'translateX(-50px)';
            item.style.opacity = '0';
        });
        
        // Force reflow
        sideMenu.offsetHeight;
        
        // Animate items in
        menuItems.forEach((item, index) => {
            item.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            item.style.transitionDelay = `${index * 0.1}s`;
            item.style.transform = 'translateX(0)';
            item.style.opacity = '1';
        });
    }
    
    document.body.style.overflow = sideMenu.classList.contains('active') ? 'hidden' : '';
}

// Close menu when pressing Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sideMenu.classList.contains('active')) {
        toggleMenu();
    }
});