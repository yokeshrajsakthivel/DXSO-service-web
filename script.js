document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(10, 14, 23, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
        } else {
            header.style.backgroundColor = 'rgba(10, 14, 23, 0.9)';
            header.style.boxShadow = 'none';
        }
    });

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in, .slide-up').forEach(el => {
        observer.observe(el);
    });

    // Number Counter Animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the slower

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const updateCount = () => {
                    const target = +entry.target.getAttribute('data-target');
                    const count = +entry.target.innerText;
                    const inc = target / speed;

                    if (count < target) {
                        entry.target.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 20);
                    } else {
                        entry.target.innerText = target;
                    }
                };
                updateCount();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // FAQ Accordion
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            item.classList.toggle('active');
        });
    });




    // AR/VR Background Initialization
    const initARVR = () => {
        // Create Container
        const container = document.createElement('div');
        container.id = 'ar-vr-container';

        // Create Floor
        const floor = document.createElement('div');
        floor.className = 'cyber-floor';
        container.appendChild(floor);

        // Create Scan Line
        const scanLine = document.createElement('div');
        scanLine.className = 'scan-line';
        container.appendChild(scanLine);

        document.body.prepend(container);

        // Parallax Effect
        document.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth - e.pageX * 2) / 100;
            const y = (window.innerHeight - e.pageY * 2) / 100;
            floor.style.transform = `rotateX(60deg) translateX(${x}px) translateY(${y}px)`;
        });

        // Floating Data Generation
        setInterval(() => {
            const particle = document.createElement('div');
            particle.className = 'ar-particle';

            // Random Properties
            const size = Math.random() * 20 + 10;
            const xPos = Math.random() * 100;
            const duration = Math.random() * 5 + 5;

            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${xPos}%`;
            particle.style.bottom = '-50px';

            // Random shape (cube-ish via border radius)
            particle.style.borderRadius = Math.random() > 0.5 ? '2px' : '50%';

            // Animation via WAAPI for performance
            const keyframes = [
                { transform: `translateY(0) rotate(0deg)`, opacity: 0 },
                { transform: `translateY(-${window.innerHeight}px) rotate(${Math.random() * 360}deg)`, opacity: 0.6, offset: 0.5 },
                { transform: `translateY(-${window.innerHeight * 1.2}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }
            ];

            particle.animate(keyframes, {
                duration: duration * 1000,
                easing: 'linear'
            });

            container.appendChild(particle);

            // Cleanup
            setTimeout(() => particle.remove(), duration * 1000);
        }, 800);
    };

    initARVR();
});
