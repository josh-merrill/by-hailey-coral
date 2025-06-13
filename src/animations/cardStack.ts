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

  // Animate each card sliding away from the deck
  cards.forEach((card, i) => {
    if (i < totalCards - 1) {
      tl.to(
        card,
        {
          x: 300 + i * 20, // Slide cards to the right and away
          y: i * 4 - 50, // Move slightly up
          rotationZ: 15, // Slight rotation as it slides away
          opacity: 0.3,
          scale: 0.9,
          duration: 1,
          ease: 'power2.out',
        },
        i * 0.4
      ) // Stagger the animations with more spacing
        .to(
          cards.slice(i + 1),
          {
            y: `-=${4}`, // Move remaining cards up to fill the gap
            x: `-=${2}`, // Move remaining cards left slightly
            scale: `+=0.01`, // Scale up very slightly
            duration: 1,
            ease: 'power2.out',
          },
          i * 0.4
        );
    }
  });
};
