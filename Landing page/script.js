// Mobile Menu Toggle

document.querySelector('.mobile-menu-btn').addEventListener('click', function() {

    document.getElementById('nav-menu').classList.toggle('show');

});

// Smooth scrolling for anchor links

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener('click', function (e) {

        e.preventDefault();

        

        document.querySelector(this.getAttribute('href')).scrollIntoView({

            behavior: 'smooth'

        });

        

        // Close mobile menu if open

        const navMenu = document.getElementById('nav-menu');

        if (navMenu.classList.contains('show')) {

            navMenu.classList.remove('show');

        }

    });

});

// Add active class to current section in navigation

window.addEventListener('scroll', function() {

    const sections = document.querySelectorAll('section');

    const navLinks = document.querySelectorAll('nav ul li a');

    

    let current = '';

    

    sections.forEach(section => {

        const sectionTop = section.offsetTop;

        const sectionHeight = section.clientHeight;

        

        if (pageYOffset >= sectionTop - 300) {

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