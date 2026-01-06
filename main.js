const indicator = document.querySelector('.indicator');
const items = document.querySelectorAll('.nav-item');

function moveIndicator(element) {
    sessionStorage.setItem('oldLeft', indicator.offsetLeft + 'px');
    sessionStorage.setItem('oldWidth', indicator.offsetWidth + 'px');

    indicator.style.left = element.offsetLeft + 'px';
    indicator.style.width = element.offsetWidth + 'px';
    
    items.forEach(item => item.classList.remove('active'));
    element.classList.add('active');
}

window.onload = () => {
    const activeItem = document.querySelector('.nav-item.active') || document.querySelector('.nav-item');
    
    const oldLeft = sessionStorage.getItem('oldLeft');
    const oldWidth = sessionStorage.getItem('oldWidth');

    if (oldLeft && oldWidth) {
        indicator.style.transition = 'none';
        indicator.style.left = oldLeft;
        indicator.style.width = oldWidth;

        setTimeout(() => {
            indicator.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            indicator.style.left = activeItem.offsetLeft + 'px';
            indicator.style.width = activeItem.offsetWidth + 'px';
            activeItem.classList.add('active');
        }, 50); 
    } else {
        moveIndicator(activeItem);
    }
};

const toggleButton = document.getElementById('them');
const themeIcon = document.getElementById('theme-icon');
const htmlElement = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme);

toggleButton.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
});

function applyTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
        themeIcon.className = 'fa-solid fa-sun active';
    } else {
        themeIcon.className = 'fa-solid fa-moon unactive'; 
    }
}
