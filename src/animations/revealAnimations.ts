import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

export const initRevealAnimations = () => {
  gsap.registerPlugin(ScrollTrigger);

  // Handle .reveal elements
  const revealElements = document.querySelectorAll('.reveal:not(.card)');
  revealElements.forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      y: 50,
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
    gsap.from(el, {
      opacity: 0,
      y: 80,
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
