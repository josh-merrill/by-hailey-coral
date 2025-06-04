import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export const initRevealAnimations = () => {
  gsap.registerPlugin(ScrollTrigger);

  const elements = document.querySelectorAll('.reveal');
  elements.forEach((el) => {
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
