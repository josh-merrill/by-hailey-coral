import { initRevealAnimations } from './animations/revealAnimations';
import { initCarousels } from './carousels';
import { initFinsweetCmsSlider } from './finsweet/cmsSliderConfig';

document.addEventListener('DOMContentLoaded', () => {
  initRevealAnimations();
  initCarousels();
  initFinsweetCmsSlider();
});
