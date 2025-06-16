import gsap from 'gsap';

export const initMagneticButtons = () => {
  const magneticButtons = gsap.utils.toArray<HTMLElement>('.magnetic-btn');

  if (magneticButtons.length === 0) {
    return;
  }

  magneticButtons.forEach((button) => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Calculate distance from center
      const distance = Math.sqrt(x * x + y * y);
      const maxDistance = Math.max(rect.width, rect.height) * 0.6;
      
      // Only apply effect if cursor is within the magnetic field
      if (distance < maxDistance) {
        const strength = Math.min(distance / maxDistance, 1);
        const moveX = (x / maxDistance) * 20 * strength;
        const moveY = (y / maxDistance) * 20 * strength;
        
        gsap.to(button, {
          x: moveX,
          y: moveY,
          duration: 0.4,
          ease: 'power2.out',
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    // Add event listeners
    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);
    
    // Set initial transform origin
    gsap.set(button, { transformOrigin: 'center center' });
  });
};