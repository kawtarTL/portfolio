/* ------------------- 
   NAVIGATION + HEADER
------------------- */
const navLinks = document.querySelectorAll('header nav a');
const logoLink = document.querySelector('.logo');
const header = document.querySelector('header');
const sections = document.querySelectorAll('section');
const barsBox = document.querySelector('.bars-box');
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('header nav');

// Clic sur le menu burger
menuIcon.addEventListener('click', () => {
  menuIcon.classList.toggle('bx-x');
  menuIcon.classList.toggle('bx-menu-wide');
  navbar.classList.toggle('active');
});

// Fonction pour relancer animations header + bars
const activePage = () => {
  // Animation header
  header.classList.remove('active');
  setTimeout(() => {
    header.classList.add('active');
  }, 1100);

  // Animation bars
  barsBox.classList.remove('active');
  setTimeout(() => {
    barsBox.classList.add('active');
  }, 1100);

  // Supprimer les sections actives
  sections.forEach(section => section.classList.remove('active'));
};

// Supprimer toutes les classes actives des nav
const removeActiveClasses = () => {
  navLinks.forEach(link => link.classList.remove('active'));
};

// Navigation : activer lien cliqué + section correspondante
navLinks.forEach((link, idx) => {
  link.addEventListener('click', () => {
    if (!link.classList.contains('active')) {
      removeActiveClasses();
      link.classList.add('active');
      activePage();

      // Fermer le menu burger si ouvert
      if (navbar.classList.contains('active')) {
        navbar.classList.remove('active');
        menuIcon.classList.remove('bx-x');
        menuIcon.classList.add('bx-menu-wide');
      }

      // Activer section correspondante après l’animation
      setTimeout(() => {
        sections[idx].classList.add('active');
      }, 1100);
    }
  });
});

// Logo = retour au premier lien + première section
logoLink.addEventListener('click', () => {
  if (!navLinks[0].classList.contains('active')) {
    removeActiveClasses();
    navLinks[0].classList.add('active');
    activePage();

    // Fermer menu burger si ouvert
    if (navbar.classList.contains('active')) {
      navbar.classList.remove('active');
      menuIcon.classList.remove('bx-x');
      menuIcon.classList.add('bx-menu-wide');
    }

    setTimeout(() => {
      sections[0].classList.add('active');
    }, 1100);
  }
});

/* -------------------
   RESUME TABS
------------------- */
const resumeBtns = document.querySelectorAll('.resume-btn');
const resumeDetails = document.querySelectorAll('.resume-detail');

resumeBtns.forEach((btn, idx) => {
  btn.addEventListener('click', () => {
    resumeBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    resumeDetails.forEach(detail => detail.classList.remove('active'));
    resumeDetails[idx].classList.add('active');
  });
});

/* -------------------
   PORTFOLIO CAROUSEL
------------------- */
const arrowRight = document.querySelector('.portfolio-box .navigation .arrow-right');
const arrowLeft = document.querySelector('.portfolio-box .navigation .arrow-left');
const slides = document.querySelectorAll('.portfolio-carousel .img-item');
const maxIndex = slides.length - 1;

let index = 0;

const activePortfolio = () => {
  const imgSlide = document.querySelector('.portfolio-carousel .img-slide');
  const portfolioDetails = document.querySelectorAll('.portfolio-detail');

  // Déplacer le carrousel
  imgSlide.style.transform = `translateX(calc(${index * -100}% - ${index * 2}rem))`;

  // Détails actifs
  portfolioDetails.forEach(detail => detail.classList.remove('active'));
  portfolioDetails[index].classList.add('active');

  // Gérer état des flèches
  arrowLeft.classList.toggle('disabled', index <= 0);
  arrowRight.classList.toggle('disabled', index >= maxIndex);
};

// Événements flèches
arrowRight.addEventListener('click', () => {
  if (index < maxIndex) {
    index++;
    activePortfolio();
  }
});

arrowLeft.addEventListener('click', () => {
  if (index > 0) {
    index--;
    activePortfolio();
  }
});

// Initialisation
activePortfolio();
