document.addEventListener('DOMContentLoaded', () => {
    const langSwitcher = document.getElementById('lang-switcher');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const elementsToTranslate = document.querySelectorAll('[data-en]');
    const projectsContainer = document.getElementById('projects-container');

    let currentLang = 'en';

    // Dark Mode functionality
    const enableDarkMode = () => {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Sun icon for light mode
        localStorage.setItem('darkMode', 'enabled');
    };

    const disableDarkMode = () => {
        document.body.classList.remove('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Moon icon for dark mode
        localStorage.setItem('darkMode', 'disabled');
    };

    // Check local storage for dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        enableDarkMode();
    }

    darkModeToggle.addEventListener('click', () => {
        if (document.body.classList.contains('dark-mode')) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });

    // Language switching functionality
    function translatePage(lang) {
        elementsToTranslate.forEach(el => {
            if (el.tagName === 'UL') {
                el.innerHTML = el.dataset[lang];
            } else {
                el.textContent = el.dataset[lang];
            }
        });
        langSwitcher.textContent = lang === 'en' ? 'العربية' : 'English';
    }

    function loadProjects(lang) {
        fetch('projects.json')
            .then(response => response.json())
            .then(data => {
                projectsContainer.innerHTML = '';
                data.forEach(project => {
                    const projectEl = document.createElement('div');
                    projectEl.classList.add('project');
                    projectEl.innerHTML = `
                        <h3>${project.title[lang]}</h3>
                        <p><strong>Tools:</strong> ${project.tools}</p>
                        <p>${project.description[lang]}</p>
                        <a href="${project.link}" target="_blank" class="project-link">View Project</a>
                    `;
                    projectsContainer.appendChild(projectEl);
                });
            });
    }

    langSwitcher.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'ar' : 'en';
        translatePage(currentLang);
        loadProjects(currentLang);
    });

    // Initial load
    translatePage(currentLang);
    loadProjects(currentLang);
});