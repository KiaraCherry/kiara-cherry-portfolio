// Custom broom cursor
const broomCursor = document.querySelector('.broom-cursor');

document.addEventListener('mousemove', (e) => {
    broomCursor.style.left = e.clientX + 'px';
    broomCursor.style.top = e.clientY + 'px';
});

// Add hover effect to interactive elements
const interactiveElements = document.querySelectorAll('a, button, .project-card, .about-card');

interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        broomCursor.style.transform = 'scale(1.5) rotate(-45deg)';
    });

    element.addEventListener('mouseleave', () => {
        broomCursor.style.transform = 'scale(1) rotate(-45deg)';
    });
});

// Smooth scrolling for navigation links
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));

        // Add active class to clicked link
        link.classList.add('active');

        // Get target section
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        // Smooth scroll to section
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Update active nav link on scroll
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// CTA button scroll to projects
const ctaButton = document.querySelector('.cta-button');
const projectsSection = document.querySelector('#projects');

ctaButton.addEventListener('click', () => {
    projectsSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});

// Add sparkle effect on random positions (with penguins and hockey pucks!)
function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'fixed';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '9999';

    // Randomly choose between sparkle, penguin, or hockey puck
    const icons = ['✨', '🐧', '🏒', '⭐', '❄️'];
    const randomIcon = icons[Math.floor(Math.random() * icons.length)];

    sparkle.textContent = randomIcon;
    sparkle.style.fontSize = Math.random() * 10 + 15 + 'px';
    sparkle.style.left = Math.random() * window.innerWidth + 'px';
    sparkle.style.top = Math.random() * window.innerHeight + 'px';
    sparkle.style.animation = 'sparkle 2s ease-out forwards';

    document.body.appendChild(sparkle);

    setTimeout(() => {
        sparkle.remove();
    }, 2000);
}

// Add sparkle animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkle {
        0% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: scale(1.2) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: scale(0.5) rotate(360deg);
        }
    }
`;
document.head.appendChild(style);

// Create sparkles periodically
setInterval(createSparkle, 3000);

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe cards and project items
const animatedElements = document.querySelectorAll('.about-card, .project-card');

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
});

// Add stagger delay to cards
document.querySelectorAll('.about-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.2}s`;
});

document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.2}s`;
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Create success message
    const successMessage = document.createElement('div');
    successMessage.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 2rem 3rem;
        border-radius: 20px;
        box-shadow: 0 10px 50px rgba(0, 0, 0, 0.3);
        z-index: 10001;
        text-align: center;
        animation: popIn 0.5s ease-out;
    `;

    successMessage.innerHTML = `
        <div style="font-size: 3rem; margin-bottom: 1rem;">🐧🏒</div>
        <h3 style="color: var(--deep-blue); margin-bottom: 1rem;">Goal! Message Sent!</h3>
        <p style="color: var(--earth-brown);">Thanks for reaching out, ${name}!</p>
        <p style="color: var(--earth-brown);">I'll get back to you faster than a penguin on ice! 🐧✨</p>
        <button id="closeMessage" style="
            margin-top: 1.5rem;
            padding: 0.7rem 2rem;
            background: var(--magic-purple);
            color: white;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            font-weight: bold;
        ">Close</button>
    `;

    // Add pop-in animation
    const popInStyle = document.createElement('style');
    popInStyle.textContent = `
        @keyframes popIn {
            0% {
                transform: translate(-50%, -50%) scale(0);
                opacity: 0;
            }
            70% {
                transform: translate(-50%, -50%) scale(1.1);
            }
            100% {
                transform: translate(-50%, -50%) scale(1);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(popInStyle);

    // Add overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 10000;
    `;

    document.body.appendChild(overlay);
    document.body.appendChild(successMessage);

    // Create sparkles around the message
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            createSparkle();
        }, i * 100);
    }

    // Close button functionality
    document.getElementById('closeMessage').addEventListener('click', () => {
        successMessage.style.animation = 'popOut 0.3s ease-out forwards';
        overlay.style.opacity = '0';

        setTimeout(() => {
            successMessage.remove();
            overlay.remove();
        }, 300);
    });

    // Add pop-out animation
    const popOutStyle = document.createElement('style');
    popOutStyle.textContent = `
        @keyframes popOut {
            to {
                transform: translate(-50%, -50%) scale(0);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(popOutStyle);

    // Reset form
    contactForm.reset();

    // Console log for demo purposes (in real scenario, this would send to a server)
    console.log('Form submitted:', { name, email, message });
});

// Project button click handlers
const projectButtons = document.querySelectorAll('.project-btn');

projectButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();

        const projectCard = button.closest('.project-card');
        const projectTitle = projectCard.querySelector('h3').textContent;

        // Show a demo alert (replace with actual navigation in production)
        alert(`Opening ${projectTitle}... (This would navigate to the project page)`);
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');

    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / 500);
    }
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Add magical trail effect to cursor
let trails = [];
const maxTrails = 5;

document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.7) { // Only create trail 30% of the time for performance
        const trail = document.createElement('div');
        trail.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: var(--magic-purple);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            animation: fadeTrail 1s ease-out forwards;
        `;

        document.body.appendChild(trail);
        trails.push(trail);

        if (trails.length > maxTrails) {
            const oldTrail = trails.shift();
            if (oldTrail.parentNode) {
                oldTrail.remove();
            }
        }

        setTimeout(() => {
            if (trail.parentNode) {
                trail.remove();
            }
        }, 1000);
    }
});

// Add trail animation
const trailStyle = document.createElement('style');
trailStyle.textContent = `
    @keyframes fadeTrail {
        0% {
            transform: scale(1);
            opacity: 0.6;
        }
        100% {
            transform: scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(trailStyle);

// Easter egg: Konami code for special animation
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Easter egg activated!
        document.body.style.animation = 'rainbow 2s infinite';

        const rainbowStyle = document.createElement('style');
        rainbowStyle.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(rainbowStyle);

        // Create a shower of sparkles
        for (let i = 0; i < 50; i++) {
            setTimeout(createSparkle, i * 50);
        }

        setTimeout(() => {
            document.body.style.animation = '';
        }, 2000);
    }
});

// Loading animation for images
window.addEventListener('load', () => {
    // Fade in page content
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

console.log('🐧🏒 Welcome to Kiki\'s Delivery Website! A penguin\'s determination meets magical code ✨');
console.log('💡 Fun fact: This site was built by a former hockey captain!');
console.log('🎮 Try the Konami Code for a surprise!');