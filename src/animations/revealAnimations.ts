import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

export const initRevealAnimations = () => {
  gsap.registerPlugin(ScrollTrigger);

  // Add gsap-ready class to body to enable CSS transitions as fallback
  document.body.classList.add('gsap-ready');

  // Handle .reveal elements
  const revealElements = document.querySelectorAll('.reveal:not(.card)');
  revealElements.forEach((el) => {
    // Set initial state first
    gsap.set(el, { opacity: 0, y: 50 });

    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  });

  // Handle .fade-up elements (but exclude cards)
  const fadeUpElements = document.querySelectorAll('.fade-up:not(.card)');
  fadeUpElements.forEach((el) => {
    // Set initial state first
    gsap.set(el, { opacity: 0, y: 80 });

    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  });
};
