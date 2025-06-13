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
    gsap.killTweensOf(card);
    gsap.set(card, { clearProps: 'all' });

    gsap.set(card, {
      rotationX: 0,
      rotationZ: i * 1, // Smaller rotation since cards are larger
      y: i * 8, // Smaller offsets since cards fill container
      x: i * 4, // Smaller horizontal offset
      scale: 1 - i * 0.02, // Smaller scale difference
      zIndex: totalCards - i,
      transformOrigin: '50% 50%',
      opacity: 1,
      force3D: true,
    });

    card.setAttribute('data-card-index', i.toString());
  });

  // Create single ScrollTrigger that pins the entire sequence
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.cards-section',
      start: 'center center', // Start when section is centered in viewport
      end: `+=${totalCards * 120}`, // Duration based on number of cards
      scrub: 0.8,
      pin: true, // Pin the entire section during animation
      anticipatePin: 1,
    }
  });

  // Add each card flip to the timeline
  cards.forEach((card, i) => {
    if (i < totalCards - 1) {
      const startTime = i * 0.8; // Stagger card flips
      const duration = 0.6;
      
      // Current card flips away dramatically
      tl.to(card, {
        rotationX: 180, // Full flip
        rotationZ: i * 1 + 20, // More dramatic rotation
        y: i * 8 + 250, // Moves down more
        scale: (1 - i * 0.02) * 0.4, // Scales down significantly
        opacity: 0.1, // Fades out more completely
        zIndex: -1, // Send to back when flipped
        ease: 'power2.inOut',
        duration: duration,
      }, startTime);

      // Next cards snap up into position (slightly delayed)
      cards.slice(i + 1).forEach((nextCard, j) => {
        tl.to(nextCard, {
          y: (i + j) * 8, // Move up one position
          scale: 1 - (i + j) * 0.02, // Adjust scale
          rotationZ: (i + j) * 1, // Adjust rotation
          ease: 'power2.out',
          duration: duration * 0.7,
        }, startTime + duration * 0.3);
      });
    }
  });
};
