import confetti from 'canvas-confetti';

export function fireCorrectConfetti(elementId?: string) {
  const duration = 1.5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 25, spread: 360, ticks: 60, zIndex: 0 };

  const interval: any = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 20 * (timeLeft / duration);
    
    // We can also target a specific origin if elementId is provided
    let origin = { x: 0.5, y: 0.5 };
    if (elementId) {
       const el = document.getElementById(elementId);
       if (el) {
           const rect = el.getBoundingClientRect();
           origin = {
               x: (rect.left + rect.width / 2) / window.innerWidth,
               y: (rect.top + rect.height / 2) / window.innerHeight
           };
       }
    } else {
        origin = {
            x: Math.random() * 0.4 + 0.3,
            y: Math.random() * 0.4 + 0.3
        }
    }

    confetti({
      ...defaults,
      particleCount,
      origin: origin,
      colors: ['#fef08a', '#fbcfe8', '#a5f3fc', '#bbf7d0']
    });
  }, 250);
}

export function fireComboConfetti() {
    const end = Date.now() + (2 * 1000);
    const colors = ['#fef08a', '#bbf7d0', '#a5f3fc'];

    (function frame() {
        confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors
        });
        confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}
