import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

export const initCardStack = () => {
  gsap.registerPlugin(ScrollTrigger);
  console.log('✅ initCardStack running with GSAP:', gsap.version);

  const cards = gsap.utils.toArray<HTMLElement>('.card');

  if (cards.length === 0) {
    console.warn('No .card elements found');
    return;
  }

  const totalCards = cards.length;

  // Set initial state - cards stacked like postcards
  cards.forEach((card, i) => {
    // Clear any existing animations/transforms first
    gsap.killTweensOf(card);

    gsap.set(card, {
      rotationX: 0,
      rotationY: 0,
      rotationZ: (Math.random() - 0.5) * 4, // Slight random rotation
      y: i * -8, // Stack cards with more separation
      x: (Math.random() - 0.5) * 12, // Random horizontal offset for natural look
      scale: 1 - i * 0.02, // Slightly smaller cards behind
      zIndex: totalCards - i,
      transformOrigin: '50% 100%', // Flip from bottom like postcards
      transformStyle: 'preserve-3d',
      opacity: 1, // Ensure full opacity
      clearProps: 'transform', // Clear any existing transforms
    });
  });

  // Create timeline for the stack animation
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.cards-section',
      start: 'top center',
      end: `+=${totalCards * 150}vh`, // Longer scroll distance
      scrub: 1,
      pin: true,
      anticipatePin: 1,
    },
  });

  // Animate each card flipping away
  cards.forEach((card, i) => {
    if (i < totalCards - 1) {
      tl.to(
        card,
        {
          rotationX: -180, // Flip backwards like turning a page
          y: i * -8 - 100, // Move up and away
          opacity: 0,
          scale: 0.8,
          duration: 1,
          ease: 'power2.inOut',
        },
        i * 0.3
      ) // Stagger the animations
        .to(
          cards.slice(i + 1),
          {
            y: `+=${8}`, // Move remaining cards up
            scale: `+=0.02`, // Scale up slightly
            duration: 1,
            ease: 'power2.inOut',
          },
          i * 0.3
        );
    }
  });
};
