/* ===================================
   PROJETS BOOTSTRAP - JAVASCRIPT
   Script pour la page projets
   =================================== */

// ===================================
// ÉVÉNEMENT DE CHARGEMENT DU DOM
// ===================================

document.addEventListener('DOMContentLoaded', function () {
    console.log('🚀 Page Projets - Chargée avec succès !');
    
    // Initialisation de toutes les fonctionnalités
    initialiserAnimationsAOS();
    initialiserEffetParallaxe();
    initialiserAnimationsCartes();
    initialiserBoutonRetourHaut();
    
    console.log('✅ Toutes les fonctionnalités projets sont initialisées');
});

// ===================================
// ANIMATIONS AOS
// ===================================

/**
 * Initialise les animations AOS (Animate On Scroll)
 */
function initialiserAnimationsAOS() {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
    console.log('✅ Animations AOS initialisées');
}

// ===================================
// EFFET PARALLAXE
// ===================================

/**
 * Initialise l'effet de parallaxe sur la section hero
 */
function initialiserEffetParallaxe() {
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.projets-hero');
        
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });
    
    console.log('✅ Effet parallaxe initialisé');
}

// ===================================
// ANIMATIONS DES CARTES
// ===================================

/**
 * Initialise les animations des cartes projets au survol
 */
function initialiserAnimationsCartes() {
    const cartesProjets = document.querySelectorAll('.projet-card');
    
    cartesProjets.forEach(carte => {
        carte.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        carte.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    console.log(`✅ Animations de ${cartesProjets.length} cartes initialisées`);
}

// ===================================
// BOUTON RETOUR EN HAUT
// ===================================

/**
 * Initialise le bouton retour en haut de page
 */
function initialiserBoutonRetourHaut() {
    const boutonRetourHaut = document.getElementById('boutonRetourHaut');
    
    if (!boutonRetourHaut) {
        console.log('ℹ️ Bouton retour en haut non trouvé');
        return;
    }
    
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
