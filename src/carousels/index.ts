import Swiper, { Navigation, Pagination, Keyboard, A11y, Grid, Mousewheel } from 'swiper';

export const initCarousels = () => {
  // Top Carousel
  new Swiper('.top-carousel', {
    modules: [Navigation, Pagination, Keyboard, A11y, Grid],
    slidesPerView: 3,
    grid: { rows: 2, fill: 'row' },
    spaceBetween: 20,
    navigation: {
      nextEl: '.top-carousel .swiper-button-next',
      prevEl: '.top-carousel .swiper-button-prev',
    },
    pagination: {
      el: '.top-carousel .swiper-pagination',
      clickable: true,
    },
    keyboard: { enabled: true },
    a11y: { enabled: true },
  });

  // Middle Carousel
  new Swiper('.middle-carousel', {
    modules: [Pagination, Keyboard, A11y, Mousewheel],
    direction: 'vertical',
    slidesPerView: 3,
    spaceBetween: 20,
    mousewheel: true,
    pagination: {
      el: '.middle-carousel .swiper-pagination',
      clickable: true,
    },
    keyboard: { enabled: true },
    a11y: { enabled: true },
  });

  // Bottom Carousel
  new Swiper('.bottom-carousel', {
    modules: [Navigation, Pagination, Keyboard, A11y, Grid],
    slidesPerView: 4,
    grid: { rows: 1, fill: 'row' },
    spaceBetween: 20,
    navigation: {
      nextEl: '.bottom-carousel .swiper-button-next',
      prevEl: '.bottom-carousel .swiper-button-prev',
    },
    pagination: {
      el: '.bottom-carousel .swiper-pagination',
      clickable: true,
    },
    keyboard: { enabled: true },
    a11y: { enabled: true },
  });
};
