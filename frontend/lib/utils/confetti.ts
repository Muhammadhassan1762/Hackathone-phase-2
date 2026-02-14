import confetti from 'canvas-confetti';

export const fireConfetti = () => {
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'],
  });
};

export const fireCelebration = () => {
  // Fire confetti from multiple angles for celebration
  confetti({
    particleCount: 50,
    angle: 60,
    spread: 55,
    origin: { x: 0 },
    colors: ['#3B82F6', '#10B981', '#F59E0B'],
  });

  confetti({
    particleCount: 50,
    angle: 120,
    spread: 55,
    origin: { x: 1 },
    colors: ['#3B82F6', '#10B981', '#F59E0B'],
  });
};