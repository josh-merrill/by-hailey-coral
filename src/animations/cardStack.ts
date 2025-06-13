import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

export const initCardStack = () => {
  gsap.registerPlugin(ScrollTrigger);

  const cards = gsap.utils.toArray<HTMLElement>('.card');

  if (cards.length === 0) {
    return;
  }

  const totalCards = cards.length;

  // Set initial state - cards stacked like a deck with visible offsets
  cards.forEach((card, i) => {
    // Clear any existing animations/transforms first
    gsap.killTweensOf(card);

    // First, clear any inline styles that might interfere
    gsap.set(card, { clearProps: 'all' });

    // Wait a frame then apply the initial transform
    gsap.set(card, {
      rotationX: 0,
      rotationY: 0,
      rotationZ: i * 1, // More noticeable rotation for each card
      y: i * 12, // Even larger vertical offset for visibility
      x: i * 6, // Larger horizontal offset for deck effect
      scale: 1 - i * 0.03, // More noticeable scale decrease
      zIndex: totalCards - i,
      transformOrigin: '50% 50%',
      opacity: 1,
      // Force 3D transforms for better performance
      force3D: true,
    });

    // Add data attribute for debugging
    card.setAttribute('data-card-index', i.toString());
  });

  // Create individual ScrollTrigger for each card
  cards.forEach((card, i) => {
    if (i < totalCards - 1) {
      ScrollTrigger.create({
        trigger: '.cards-section',
        start: `top+=${i * 200} center`,
        end: `top+=${(i + 1) * 200} center`,
        scrub: 1,
        pin: i === 0 ? '.cards-section' : false,
        onUpdate: ({ progress }) => {
          // Animate current card moving down
          gsap.to(card, {
            y: i * 12 + progress * 200, // Move down from deck position
            rotationZ: i * 1 + progress * 10, // Increase rotation
            opacity: 1 - progress * 0.8, // Fade out
            scale: 1 - i * 0.03 - progress * 0.2, // Scale down
            duration: 0.1,
            ease: 'none',
          });

          // Move remaining cards up
          if (progress > 0.5) {
            cards.slice(i + 1).forEach((nextCard, j) => {
              gsap.to(nextCard, {
                y: (i + 1 + j) * 12 - (progress - 0.5) * 24,
                scale: 1 - (i + 1 + j) * 0.03 + (progress - 0.5) * 0.06,
                duration: 0.1,
                ease: 'none',
              });
            });
          }
        },
      });
    }
  });
};
