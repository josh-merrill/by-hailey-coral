import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

export const initRevealAnimations = () => {
  gsap.registerPlugin(ScrollTrigger);

  // Target reveal and fade-up elements, but exclude cards
  const revealElements = document.querySelectorAll('.reveal:not(.card)');
  const fadeUpElements = document.querySelectorAll('.fade-up:not(.card)');
  
  // Combine both NodeLists
  const allElements = [...revealElements, ...fadeUpElements];
  allElements.forEach((el) => {
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
      stagger: 0.5,
    });
  });
};
