// TransitionAnimation.js
import React, { useEffect } from 'react';
import '../assets/styles/transitionAnimation.css';

const TransitionAnimation = ({ onComplete }) => {
  const createExplosion = () => {
    const explosion = document.createElement('div');
    explosion.className = 'explosion';

    document.body.appendChild(explosion);

    setTimeout(() => {
      explosion.remove();
    }, 800);
  };

  const createFire = () => {
    const fire = document.createElement('div');
    fire.className = 'fire';

    fire.style.left = `${Math.random() * 100}vw`;
    fire.style.top = `${Math.random() * 100}vh`;

    fire.style.setProperty('--random-x', Math.random() * 3 + 1);
    fire.style.setProperty('--random-y', Math.random() * 3 + 1);

    document.body.appendChild(fire);

    setTimeout(() => {
      fire.remove();
    }, 1000);
  };

  const createBlueFire = () => {
    const blueFire = document.createElement('div');
    blueFire.className = 'blue-fire';

    blueFire.style.left = `${Math.random() * 100}vw`;
    blueFire.style.bottom = '0'; // Começa na parte inferior

    document.body.appendChild(blueFire);

    setTimeout(() => {
      blueFire.remove();
    }, 1000);
  };

  useEffect(() => {
    // Adiciona a classe de tremor ao body
    document.body.classList.add('tremor');

    createExplosion();

    const fireInterval = setInterval(() => {
      createFire();
    }, 100);

    const blueFireInterval = setInterval(() => {
      createBlueFire();
    }, 100); // Chamas azuis a cada 100ms

    const timer = setTimeout(() => {
      clearInterval(fireInterval);
      clearInterval(blueFireInterval);
      document.body.classList.remove('tremor'); // Remove a classe de tremor após a animação
      onComplete();
    }, 2000);

    return () => {
      clearInterval(fireInterval);
      clearInterval(blueFireInterval);
      clearTimeout(timer);
      document.body.classList.remove('tremor'); // Remove a classe de tremor ao desmontar
    };
  }, [onComplete]);

  return <div className="transition-animation" />;
};

export default TransitionAnimation;
