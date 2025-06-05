import Swiper from 'swiper';
import {
  Grid,
  Navigation,
  Pagination,
  Keyboard,
  A11y,
  Mousewheel,
  EffectFade,
  EffectCreative,
} from 'swiper/modules';

// Register all needed modules ONCE at the top of this file:
Swiper.use([Grid, Navigation, Pagination, Keyboard, A11y, Mousewheel, EffectFade, EffectCreative]);

export const initCarousels = () => {
  new Swiper('.middle-carousel', {
    direction: 'vertical',
    slidesPerView: 1,
    spaceBetween: 0,
    mousewheel: true,
    pagination: {
      el: '.middle-carousel .swiper-pagination',
      clickable: true,
    },
    effect: 'creative',
    creativeEffect: {
      prev: {
        shadow: false,
        translate: [0, -60, -150],
        rotate: [0, 0, -8],
        opacity: 0.7,
        scale: 0.95,
      },
      next: {
        shadow: false,
        translate: [0, 60, -150],
        rotate: [0, 0, 8],
        opacity: 0.7,
        scale: 0.95,
      },
    },
    speed: 400,
    keyboard: { enabled: true },
    a11y: { enabled: true },
  });
};
