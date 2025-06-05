import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import { initCardStack } from './animations/cardStack';
import { initRevealAnimations } from './animations/revealAnimations';
import { initCarousels } from './carousels';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  initRevealAnimations();
  initCarousels();
  initFinsweetCmsSlider();
  initCardStack();
});
