import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const initCardStack = () => {
  gsap.registerPlugin(ScrollTrigger);
  console.error('initCardStack running');

  const cards = gsap.utils.toArray<HTMLElement>('.card');
  const totalCards = cards.length;
  const scaleStep = 0.15 / totalCards;

  // More subtle rotation values for a natural look
  const rotations = [-2, 2, -3, 3, -2, 2, -3, 2, -2, 3];

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.cards-section',
      start: 'center center',
      end: '+=' + window.innerHeight * 0.1 * totalCards, // dynamic scroll
      scrub: true,
      pin: true,
      // markers: true, // Uncomment for debugging
    },
  });

  cards.forEach((card, i) => {
    // Assign a rotation from the array, cycling if more cards than rotations
    const initialRotation = rotations[i % rotations.length];

    gsap.set(card, {
      y: -(15 * i),
      scale: 1 - scaleStep * i,
      zIndex: totalCards - i,
      rotate: initialRotation,
    });

    const otherCards = cards.filter((c, j) => j !== i);
    const nextCard = cards[i + 1];
    if (nextCard) {
      tl.to(
        card,
        {
          opacity: 0,
          scale: 1.1,
          y: 35,
          rotate: 0, // Animate to straight
        },
        '+=0.5'
      )
        .to(
          nextCard,
          {
            scale: 1,
            zIndex: '+=1',
            y: 0,
            rotate: 0, // Animate to straight
          },
          '<'
        )
        .to(
          otherCards,
          {
            y: '+=15',
            zIndex: '+=1',
            scale: '+=' + scaleStep,
            // Keep their rotation as is
          },
          '<'
        )
        .set(card, { zIndex: 0 })
        .to(card, {
          y: -15 * (totalCards - 1),
          scale: 0.85,
          opacity: 1,
          rotate: initialRotation, // Reset to original rotation for looping
        });
    }
  });
  tl.to({}, {});
};
