import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

export const initRevealAnimations = () => {
  gsap.registerPlugin(ScrollTrigger);

  document.body.classList.add('gsap-ready');

  // Batch animations for better performance
  const revealElements = gsap.utils.toArray<HTMLElement>('.reveal:not(.card)');
  const fadeUpElements = gsap.utils.toArray<HTMLElement>('.fade-up:not(.card)');

  // Set initial states in batch
  gsap.set(revealElements, { opacity: 0, y: 50, force3D: true });
  gsap.set(fadeUpElements, { opacity: 0, y: 80, force3D: true });

  // Create batch animations with ScrollTrigger.batch for performance
  ScrollTrigger.batch(revealElements, {
    onEnter: (elements) => {
      gsap.to(elements, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        stagger: 0.1,
      });
    },
    start: 'top 85%',
    once: true,
  });

  ScrollTrigger.batch(fadeUpElements, {
    onEnter: (elements) => {
      gsap.to(elements, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        stagger: 0.08,
      });
    },
    start: 'top 85%',
    once: true,
  });
};
