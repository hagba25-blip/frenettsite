// script.js - Freenet Technologie

document.addEventListener("DOMContentLoaded", () => {

    // ====== MENU BURGER ======
    // FIX: on sélectionne par classe pour que ça marche sur TOUTES les pages
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks   = document.querySelector("nav ul");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("show");
        });

        // Fermer le menu quand on clique sur un lien
        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("show");
            });
        });

        // Fermer le menu si on clique en dehors
        document.addEventListener("click", (e) => {
            if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove("show");
            }
        });
    }

    // ====== BOUTONS "SAVOIR PLUS" ======
    document.querySelectorAll(".service-card button").forEach(btn => {
        btn.addEventListener("click", () => {
            const text = btn.parentElement.querySelector(".service-text");
            if (text) {
                text.classList.toggle("show");
                btn.textContent = text.classList.contains("show") ? "Fermer" : "Savoir plus";
            }
        });
    });

    // ====== ANIMATION SCROLL (apparition progressive) ======
    const revealElements = document.querySelectorAll(".reveal");

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        revealElements.forEach(el => {
            const top = el.getBoundingClientRect().top;
            if (top < windowHeight - 80) {
                el.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // Déclencher au chargement pour les éléments déjà visibles

    // ====== VALIDATION FORMULAIRE CONTACT ======
    const contactForm = document.querySelector("#contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            const email   = contactForm.querySelector("input[name='email']");
            const message = contactForm.querySelector("textarea[name='message']");
            let valid = true;

            if (!email || !email.value.includes("@") || !email.value.includes(".")) {
                valid = false;
                email.style.borderColor = "#e74c3c";
            } else {
                email.style.borderColor = "";
            }

            if (!message || message.value.trim() === "") {
                valid = false;
                message.style.borderColor = "#e74c3c";
            } else {
                message.style.borderColor = "";
            }

            if (!valid) {
                e.preventDefault();
                alert("Veuillez entrer un email valide et un message.");
            }
        });
    }

    // ====== VALIDATION FORMULAIRE DEMANDE ======
    const requestForm = document.querySelector("#requestForm");
    if (requestForm) {
        requestForm.addEventListener("submit", (e) => {
            const name    = requestForm.querySelector("input[name='user_name']");
            const email   = requestForm.querySelector("input[name='email']");
            const service = requestForm.querySelector("select[name='service_type']");
            const details = requestForm.querySelector("textarea[name='details']");
            let valid = true;

            [name, email, service, details].forEach(field => {
                if (field && field.value.trim() === "") {
                    field.style.borderColor = "#e74c3c";
                    valid = false;
                } else if (field) {
                    field.style.borderColor = "";
                }
            });

            if (email && !email.value.includes("@")) {
                email.style.borderColor = "#e74c3c";
                valid = false;
            }

            if (!valid) {
                e.preventDefault();
                alert("Veuillez remplir tous les champs correctement.");
            }
        });
    }

// ====== COMPTEUR ANIMÉ DES STATISTIQUES ======
    const statNumbers = document.querySelectorAll(".stat-number");
 
    const animateCounter = (el) => {
        const target = parseInt(el.dataset.target, 10);
        const duration = 1800;
        const step = Math.ceil(target / (duration / 16));
        let current = 0;
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                el.textContent = target + (target >= 10 ? "+" : "");
                clearInterval(timer);
            } else {
                el.textContent = current;
            }
        }, 16);
    };
 
    if (statNumbers.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        statNumbers.forEach(n => counterObserver.observe(n));
    }
 
});
 