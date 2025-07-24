document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const projectsContainer = document.getElementById('projects-container');

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

    function loadProjects() {
        fetch('projects.json')
            .then(response => response.json())
            .then(data => {
                projectsContainer.innerHTML = '';
                data.forEach(project => {
                    const projectEl = document.createElement('div');
                    projectEl.classList.add('project');
                    projectEl.innerHTML = `
                        <h3>${project.title.en}</h3>
                        <p><strong>Tools:</strong> ${project.tools}</p>
                        <p>${project.description.en}</p>
                        <a href="${project.link}" target="_blank" class="project-link">View Project</a>
                    `;
                    projectsContainer.appendChild(projectEl);
                });
            });
    }

    // Initial load
    loadProjects();

    // Animation for sections
    const sections = document.querySelectorAll('section');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Typing effect for About Me section
    const aboutText = document.querySelector('#about p');
    const originalText = aboutText.textContent;
    aboutText.textContent = ''; // Clear text for typing effect

    let i = 0;
    function typeWriter() {
        if (i < originalText.length) {
            aboutText.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 20); // Typing speed
        }
    }
    typeWriter();
});
/* Cache bust: 2025-07-10 15:30:00 */