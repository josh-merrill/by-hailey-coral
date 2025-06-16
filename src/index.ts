import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import { initRevealAnimations } from './animations/revealAnimations';
import { initMagneticButtons } from './animations/magneticButtons';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  initRevealAnimations();
  initMagneticButtons();
});
