/* ===================================
   PORTFOLIO KEVIN SENASSON - JAVASCRIPT BOOTSTRAP
   Version responsive avec Bootstrap 5.3
   =================================== */

// ===================================
// VARIABLES GLOBALES
// ===================================

let swiperProjets = null; // Instance Swiper pour les projets

// ===================================
// ÉVÉNEMENT DE CHARGEMENT DU DOM
// ===================================

document.addEventListener('DOMContentLoaded', function () {
    console.log('🚀 Portfolio Kevin Senasson - Chargé avec succès !');
    
    // Initialisation de toutes les fonctionnalités
    initialiserNavigationFluide();
    initialiserAnimationsAOS();
    initialiserCarrouselProjets();
    initialiserGestionContact();
    initialiserEffetsNavigation();
    initialiserCarrouselHobbies();
    gererAncreURL();
    initialiserBoutonRetourHaut();
    initialiserPlanDeSite();
    
    console.log('✅ Toutes les fonctionnalités sont initialisées');
});

// ===================================
// NAVIGATION FLUIDE ENTRE SECTIONS
// ===================================

/**
 * Initialise la navigation fluide avec scrollspy Bootstrap
 */
function initialiserNavigationFluide() {
    // Configuration du scrollspy Bootstrap
    const navbarNav = document.querySelector('#menuNavigation');
    if (navbarNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#menuNavigation',
            offset: 100 // Offset pour la navbar fixe
        });
    }
    
    // Gestion du clic sur les liens de navigation
    const liensNavigation = document.querySelectorAll('.nav-link[href^="#"]');
    liensNavigation.forEach(lien => {
        lien.addEventListener('click', function(e) {
            e.preventDefault();
            
            const cibleId = this.getAttribute('href');
            const elementCible = document.querySelector(cibleId);
            
            if (elementCible) {
                // Fermer le menu mobile s'il est ouvert
                const menuCollapse = document.querySelector('#menuNavigation');
                if (menuCollapse && menuCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(menuCollapse);
                    bsCollapse.hide();
                }
                
                // Scroll fluide vers la section
                elementCible.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Mettre à jour l'état actif des liens
                mettreAJourLienActif(this);
            }
        });
    });
}

/**
 * Met à jour le lien actif dans la navigation
 * @param {Element} lienActif - Le lien qui doit être actif
 */
function mettreAJourLienActif(lienActif) {
    // Supprimer la classe active de tous les liens
    document.querySelectorAll('.nav-link').forEach(lien => {
        lien.classList.remove('active');
    });
    
    // Ajouter la classe active au lien cliqué
    lienActif.classList.add('active');
}

// ===================================
// ANIMATIONS AOS (ANIMATE ON SCROLL)
// ===================================

/**
 * Initialise les animations AOS
 */
function initialiserAnimationsAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,        // Durée des animations
            easing: 'ease-out',    // Type d'easing
            once: true,            // Animation une seule fois
            offset: 100,           // Offset pour déclencher l'animation
            delay: 0,              // Délai avant l'animation
            anchorPlacement: 'top-bottom' // Point d'ancrage
        });
        
        console.log('✅ Animations AOS initialisées');
    } else {
        console.warn('⚠️ AOS n\'est pas chargé');
    }
}

// ===================================
// CARROUSEL SWIPER POUR LES PROJETS
// ===================================

/**
 * Initialise le carrousel Swiper pour la section projets
 */
function initialiserCarrouselProjets() {
    const conteneurSwiper = document.querySelector('.conteneur-projets');
    
    if (conteneurSwiper && typeof Swiper !== 'undefined') {
        swiperProjets = new Swiper('.conteneur-projets', {
            // Configuration de base
            direction: 'horizontal',
            loop: true,
            centeredSlides: true,
            spaceBetween: 20,
            
            // Slides par vue selon la taille d'écran
            slidesPerView: 1.2,
            
            // Points de rupture responsive
            breakpoints: {
                576: {
                    slidesPerView: 1.3,
                    spaceBetween: 25
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                    centeredSlides: false
                },
                992: {
                    slidesPerView: 2.5,
                    spaceBetween: 40
                },
                1200: {
                    slidesPerView: 3,
                    spaceBetween: 50
                }
            },
            
            // Pagination avec points cliquables
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true
            },
            
            // Autoplay
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            },
            
            // Effet de transition
            effect: 'slide',
            
            // Navigation au clavier
            keyboard: {
                enabled: true,
                onlyInViewport: true
            },
            
            // Événements
            on: {
                init: function() {
                    console.log('✅ Carrousel Swiper projets initialisé');
                    
                    // Ajuster la hauteur des slides
                    ajusterHauteurSlides();
                },
                
                slideChange: function() {
                    // Actions lors du changement de slide
                    console.log('📱 Slide changé : ', this.activeIndex);
                },
                
                reachEnd: function() {
                    console.log('📍 Fin du carrousel atteinte');
                }
            }
        });
        
        // Ajuster la hauteur lors du redimensionnement
        window.addEventListener('resize', ajusterHauteurSlides);
        
    } else {
        console.warn('⚠️ Swiper n\'est pas disponible ou conteneur introuvable');
    }
}

/**
 * Ajuste la hauteur des slides Swiper
 */
function ajusterHauteurSlides() {
    const slides = document.querySelectorAll('.swiper-slide .carte-projet');
    if (slides.length > 0) {
        const hauteur = window.innerWidth < 768 ? '400px' : '500px';
        slides.forEach(slide => {
            slide.style.height = hauteur;
        });
    }
}

// ===================================
// GESTION DE LA SECTION CONTACT
// ===================================

/**
 * Initialise la gestion de la section contact (toggle entre direct et formulaire)
 */
function initialiserGestionContact() {
    const boutonFormulaire = document.querySelector('.bouton-formulaire');
    const boutonRetour = document.querySelector('.bouton-retour');
    
    if (boutonFormulaire) {
        boutonFormulaire.addEventListener('click', afficherFormulaire);
    }
    
    if (boutonRetour) {
        boutonRetour.addEventListener('click', function(e) {
            e.preventDefault(); // Empêcher la soumission du formulaire
            afficherContactDirect();
        });
    }
    
    // Gestion de la soumission du formulaire
    const formulaire = document.querySelector('.formulaire-contact');
    if (formulaire) {
        formulaire.addEventListener('submit', function(e) {
            // Le formulaire est géré par Formspree, mais on peut ajouter des validations
            console.log('📧 Formulaire en cours d\'envoi...');
            
            // Optionnel : Validation côté client
            if (!validerFormulaire(this)) {
                e.preventDefault();
                return false;
            }
            
            // Afficher un feedback visuel
            const boutonEnvoyer = this.querySelector('.bouton-envoyer');
            if (boutonEnvoyer) {
                boutonEnvoyer.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Envoi en cours...';
                boutonEnvoyer.disabled = true;
            }
        });
    }
}

/**
 * Affiche le formulaire de contact
 */
function afficherFormulaire() {
    const contactDirect = document.querySelector('.contact-direct');
    const contactFormulaire = document.querySelector('.contact-formulaire');
    
    if (contactDirect && contactFormulaire) {
        // Masquer le contact direct
        contactDirect.classList.remove('active');
        contactDirect.classList.add('inactive');
        
        // Afficher le formulaire avec un léger délai
        setTimeout(() => {
            contactFormulaire.classList.add('active');
        }, 300);
        
        console.log('📝 Formulaire de contact affiché');
    }
}

/**
 * Affiche le contact direct (masque le formulaire)
 */
function afficherContactDirect() {
    const contactDirect = document.querySelector('.contact-direct');
    const contactFormulaire = document.querySelector('.contact-formulaire');
    
    if (contactDirect && contactFormulaire) {
        // Masquer le formulaire
        contactFormulaire.classList.remove('active');
        
        // Afficher le contact direct avec un léger délai
        setTimeout(() => {
            contactDirect.classList.remove('inactive');
            contactDirect.classList.add('active');
        }, 300);
        
        console.log('📞 Contact direct affiché');
    }
}

/**
 * Valide le formulaire de contact
 * @param {HTMLFormElement} formulaire - Le formulaire à valider
 * @returns {boolean} - true si valide, false sinon
 */
function validerFormulaire(formulaire) {
    const champsRequis = formulaire.querySelectorAll('[required]');
    let estValide = true;
    
    champsRequis.forEach(champ => {
        if (!champ.value.trim()) {
            champ.classList.add('is-invalid');
            estValide = false;
        } else {
            champ.classList.remove('is-invalid');
            champ.classList.add('is-valid');
        }
    });
    
    // Validation spécifique pour l'email
    const email = formulaire.querySelector('[type="email"]');
    if (email && email.value) {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(email.value)) {
            email.classList.add('is-invalid');
            estValide = false;
        }
    }
    
    return estValide;
}

// ===================================
// EFFETS DE NAVIGATION
// ===================================

/**
 * Initialise les effets de la barre de navigation
 */
function initialiserEffetsNavigation() {
    const navbar = document.querySelector('.barre-navigation');
    
    if (navbar) {
        // Effet de transparence lors du scroll
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset;
            
            if (scrollTop > 50) {
                navbar.style.background = 'rgba(34, 34, 34, 0.98)';
                navbar.style.backdropFilter = 'blur(15px)';
            } else {
                navbar.style.background = 'rgba(34, 34, 34, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
            }
        });
        
        // Fermer le menu mobile lors du clic à l'extérieur
        document.addEventListener('click', function(e) {
            const menuCollapse = document.querySelector('#menuNavigation');
            const togglerButton = document.querySelector('.navbar-toggler');
            
            if (menuCollapse && menuCollapse.classList.contains('show')) {
                if (!navbar.contains(e.target)) {
                    const bsCollapse = new bootstrap.Collapse(menuCollapse);
                    bsCollapse.hide();
                }
            }
        });
    }
}

// ===================================
// CARROUSEL BOOTSTRAP POUR LES HOBBIES
// ===================================

/**
 * Initialise le carrousel Bootstrap pour les hobbies
 */
function initialiserCarrouselHobbies() {
    const carrousel = document.querySelector('#carrouselHobbies');
    
    if (carrousel) {
        // Configuration du carrousel Bootstrap
        const bsCarrousel = new bootstrap.Carousel(carrousel, {
            interval: 6000,    // Changement automatique toutes les 6 secondes
            wrap: true,        // Boucle infinie
            pause: 'hover',    // Pause au survol
            keyboard: true     // Navigation au clavier
        });
        
        // Événements personnalisés
        carrousel.addEventListener('slide.bs.carousel', function(e) {
            console.log('🎠 Slide hobbies : ', e.to);
        });
        
        console.log('✅ Carrousel hobbies initialisé');
    }
}

// ===================================
// GESTION DES ANCRES URL
// ===================================

/**
 * Gère la navigation directe via les ancres dans l'URL
 */
function gererAncreURL() {
    // FORCER LE RETOUR EN HAUT À CHAQUE RECHARGEMENT
    // Supprimer toute ancre de l'URL et scroller en haut
    if (window.location.hash) {
        // Nettoyer l'URL sans recharger la page
        history.replaceState(null, null, window.location.pathname + window.location.search);
    }
    
    // Forcer le scroll en haut de page au chargement
    setTimeout(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
        
        // Remettre le focus sur le premier élément (section accueil)
        const sectionAccueil = document.querySelector('#accueil');
        if (sectionAccueil) {
            // Mettre à jour la navigation pour refléter la section accueil
            const lienAccueil = document.querySelector('a[href="#accueil"]');
            if (lienAccueil) {
                mettreAJourLienActif(lienAccueil);
            }
        }
    }, 100);
    
    // Écouter les changements d'ancre pour la navigation normale
    window.addEventListener('hashchange', function() {
        const ancre = window.location.hash;
        const element = document.querySelector(ancre);
        
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

// ===================================
// BOUTON RETOUR EN HAUT
// ===================================

/**
 * Initialise le bouton retour en haut de page
 */
function initialiserBoutonRetourHaut() {
    const boutonRetourHaut = document.getElementById('boutonRetourHaut');
    
    // Vérifier si le bouton existe sur la page
    if (!boutonRetourHaut) {
        console.log('ℹ️ Bouton retour en haut non trouvé sur cette page');
        return;
    }
    
    console.log('🔼 Initialisation du bouton retour en haut');
    
    // Variables pour gérer le throttling
    let ticking = false;
    
    /**
     * Gère l'affichage du bouton selon le scroll
     */
    function gererAffichageBouton() {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollY = window.pageYOffset || document.documentElement.scrollTop;
                
                if (scrollY > 300) {
                    boutonRetourHaut.classList.add('visible');
                } else {
                    boutonRetourHaut.classList.remove('visible');
                }
                
                ticking = false;
            });
            ticking = true;
        }
    }
    
    /**
     * Fonction pour remonter en haut de page
     */
    function remonterEnHaut() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Analytics/tracking optionnel
        console.log('🔼 Retour en haut effectué');
    }
    
    // Événements
    window.addEventListener('scroll', gererAffichageBouton, { passive: true });
    boutonRetourHaut.addEventListener('click', remonterEnHaut);
    
    // Gestion clavier pour l'accessibilité
    boutonRetourHaut.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            remonterEnHaut();
        }
    });
    
    // Vérification initiale
    gererAffichageBouton();
    
    console.log('✅ Bouton retour en haut initialisé');
}

// ===================================
// PLAN DE SITE DÉROULANT
// ===================================

/**
 * Navigue vers une section spécifique avec scroll fluide
 * @param {string} sectionId - L'ID de la section (avec #)
 */
function naviguerVersSection(sectionId) {
    const element = document.querySelector(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

/**
 * Initialise le menu déroulant du plan de site
 */
function initialiserPlanDeSite() {
    const toggleButton = document.getElementById('planSiteToggle');
    const dropdown = document.getElementById('planSiteDropdown');
    
    if (!toggleButton || !dropdown) return;

    // Gestion du clic sur le bouton toggle
    toggleButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const isOpen = dropdown.classList.contains('show');
        
        if (isOpen) {
            fermerPlanDeSite();
        } else {
            ouvrirPlanDeSite();
        }
    });

    // Fermer le menu si on clique ailleurs
    document.addEventListener('click', function(e) {
        if (!toggleButton.contains(e.target) && !dropdown.contains(e.target)) {
            fermerPlanDeSite();
        }
    });

    // Gestion des liens avec ancres internes (navigation principale)
    const liensInternes = dropdown.querySelectorAll('a[href^="#"]');
    liensInternes.forEach(lien => {
        lien.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            // Fermer le menu
            fermerPlanDeSite();
            
            // Naviguer vers la section
            setTimeout(() => {
                naviguerVersSection(targetId);
            }, 100);
        });
    });

    // Gestion des liens avec scroll personnalisé (hobbies, veille)
    const liensAvecScroll = dropdown.querySelectorAll('a[data-scroll]');
    liensAvecScroll.forEach(lien => {
        lien.addEventListener('click', function(e) {
            e.preventDefault();
            const scrollTarget = this.getAttribute('data-scroll');
            
            // Fermer le menu
            fermerPlanDeSite();
            
            // Naviguer vers la section principale d'abord
            setTimeout(() => {
                naviguerVersSection('#apropos');
                
                // Puis scroll vers l'élément spécifique
                setTimeout(() => {
                    const targetElement = document.querySelector(`.${scrollTarget}-container, .${scrollTarget}-section, #${scrollTarget}`);
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }, 500);
            }, 100);
        });
    });

    // Gestion des liens vers d'autres pages (externes)
    const liensExternes = dropdown.querySelectorAll('a[href]:not([href^="#"]):not([data-scroll])');
    liensExternes.forEach(lien => {
        lien.addEventListener('click', function() {
            // Fermer le menu lors du clic sur un lien externe
            setTimeout(() => {
                fermerPlanDeSite();
            }, 100);
        });
    });
}

/**
 * Ouvre le menu déroulant du plan de site
 */
function ouvrirPlanDeSite() {
    const toggleButton = document.getElementById('planSiteToggle');
    const dropdown = document.getElementById('planSiteDropdown');
    
    if (toggleButton && dropdown) {
        toggleButton.classList.add('active');
        dropdown.classList.add('show');
    }
}

/**
 * Ferme le menu déroulant du plan de site
 */
function fermerPlanDeSite() {
    const toggleButton = document.getElementById('planSiteToggle');
    const dropdown = document.getElementById('planSiteDropdown');
    
    if (toggleButton && dropdown) {
        toggleButton.classList.remove('active');
        dropdown.classList.remove('show');
    }
}

// ===================================
// FONCTIONS UTILITAIRES
// ===================================

/**
 * Débounce une fonction (limite le nombre d'appels)
 * @param {Function} func - La fonction à débouncer
 * @param {number} wait - Le délai d'attente en ms
 * @returns {Function} - La fonction débouncée
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Vérifie si un élément est visible dans le viewport
 * @param {Element} element - L'élément à vérifier
 * @returns {boolean} - true si visible, false sinon
 */
function estVisible(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Anime un compteur numérique
 * @param {Element} element - L'élément contenant le nombre
 * @param {number} fin - Le nombre final
 * @param {number} duree - La durée de l'animation en ms
 */
function animerCompteur(element, fin, duree = 2000) {
    const debut = 0;
    const increment = fin / (duree / 16); // 60 FPS
    let actuel = debut;
    
    const timer = setInterval(() => {
        actuel += increment;
        element.textContent = Math.floor(actuel);
        
        if (actuel >= fin) {
            element.textContent = fin;
            clearInterval(timer);
        }
    }, 16);
}

// ===================================
// GESTION DES ERREURS GLOBALES
// ===================================

/**
 * Gestion globale des erreurs
 */
window.addEventListener('error', function(e) {
    console.error('❌ Erreur détectée:', e.error);
    
    // En production, vous pourriez envoyer l'erreur à un service de monitoring
    // comme Sentry, LogRocket, etc.
});

/**
 * Gestion des promesses rejetées
 */
window.addEventListener('unhandledrejection', function(e) {
    console.error('❌ Promesse rejetée:', e.reason);
    e.preventDefault(); // Empêche l'affichage de l'erreur dans la console
});

// ===================================
// OPTIMISATIONS PERFORMANCE
// ===================================

/**
 * Preload des images importantes
 */
function preloadImages() {
    const imagesCritiques = [
        'img/avatar.jpg',
        'img/photo.jpg',
        'img/2000542.webp'
    ];
    
    imagesCritiques.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

/**
 * Lazy loading pour les images non critiques
 */
function initialiserLazyLoading() {
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            observer.observe(img);
        });
    }
}

// ===================================
// FONCTIONS EXPOSÉES GLOBALEMENT
// ===================================

// Rendre certaines fonctions accessibles globalement pour compatibilité
window.afficherFormulaire = afficherFormulaire;
window.afficherContactDirect = afficherContactDirect;

// ===================================
// INITIALISATION FINALE
// ===================================

// Attendre que tout soit chargé pour les optimisations
window.addEventListener('load', function() {
    preloadImages();
    initialiserLazyLoading();
    
    console.log('🎉 Portfolio entièrement chargé et optimisé !');
});

// Service Worker pour le cache (optionnel)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('✅ Service Worker enregistré');
            })
            .catch(function(error) {
                console.log('❌ Échec de l\'enregistrement du Service Worker');
            });
    });
}
