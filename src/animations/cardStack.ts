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

  // Animate each card shuffling from top to bottom
  cards.forEach((card, i) => {
    if (i < totalCards - 1) {
      tl.to(
        card,
        {
          y: 200 + i * 50, // Move cards down and away (top to bottom)
          rotationZ: (Math.random() - 0.5) * 10, // Random slight rotation
          opacity: 0,
          scale: 0.8,
          duration: 1.2,
          ease: 'power2.inOut',
        },
        i * 0.5
      ) // Animate each card moving to bottom
        .to(
          cards.slice(i + 1),
          {
            y: `-=${12}`, // Move remaining cards up to take the top position
            x: `-=${6}`, // Move remaining cards left slightly
            scale: `+=0.03`, // Scale up to become the new top card
            rotationZ: `-=${1}`, // Reduce rotation as they move up
            duration: 1.2,
            ease: 'power2.inOut',
          },
          i * 0.5
        );
    }
  });
};
