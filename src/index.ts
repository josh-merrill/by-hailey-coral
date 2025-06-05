import { initRevealAnimations } from './animations/revealAnimations';
import { initCarousels } from './carousels';
import { initFinsweetCmsSlider } from './finsweet/cmsSliderConfig';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { initCardStack } from './animations/cardStack';
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  initRevealAnimations();
  initCarousels();
  initFinsweetCmsSlider();
  initCardStack();
});
