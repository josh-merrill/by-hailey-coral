import Swiper from 'swiper';
import { Grid, Navigation, Pagination, Keyboard, A11y, Mousewheel } from 'swiper/modules';

// Register all needed modules ONCE at the top of this file:
Swiper.use([Grid, Navigation, Pagination, Keyboard, A11y, Mousewheel]);

export const initCarousels = () => {
  // Top Carousel: Responsive grid
  // const topCarousel = document.querySelector('.carousel_top');
  // if (topCarousel) {
  //   new Swiper(topCarousel, {
  //     slidesPerView: 2,
  //     grid: { rows: 2, fill: 'row' },
  //     spaceBetween: 24,
  //     breakpoints: {
  //       640: { slidesPerView: 1, grid: { rows: 2 } },
  //       1024: { slidesPerView: 2, grid: { rows: 2 } },
  //     },
  //     navigation: false,
  //     pagination: false,
  //   });
  // }

  // Middle Carousel: Vertical, sticky, full width
  new Swiper('.middle-carousel', {
    direction: 'vertical',
    slidesPerView: 1,
    spaceBetween: 16,
    mousewheel: true,
    pagination: {
      el: '.middle-carousel .swiper-pagination',
      clickable: true,
    },
    keyboard: { enabled: true },
    a11y: { enabled: true },
    // Optionally, add breakpoints for vertical responsiveness
  });

  // Bottom Carousel: Responsive grid
  // new Swiper('.bottom-carousel', {
  //   slidesPerView: 1,
  //   grid: { rows: 1, fill: 'row' },
  //   spaceBetween: 16,
  //   navigation: {
  //     nextEl: '.bottom-carousel .swiper-button-next',
  //     prevEl: '.bottom-carousel .swiper-button-prev',
  //   },
  //   pagination: {
  //     el: '.bottom-carousel .swiper-pagination',
  //     clickable: true,
  //   },
  //   keyboard: { enabled: true },
  //   a11y: { enabled: true },
  //   breakpoints: {
  //     640: { slidesPerView: 2, grid: { rows: 1 } },
  //     1024: { slidesPerView: 3, grid: { rows: 1 } },
  //   },
  // });
};
