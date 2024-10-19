import React, { useEffect, useRef } from 'react';
import '../assets/styles/transitionAnimation.css';
import clownFaceImage from '../assets/images/bomb.png';

const TransitionAnimation = ({ onComplete }) => {
  const explosionCount = useRef(0); // Controle do número de explosões

  const createExplosion = (withClown = false) => {
    if (explosionCount.current < 3) {
      // Garante no máximo três explosões
      const explosion = document.createElement('div');
      explosion.className = 'explosion';

      // Se for a segunda explosão, adiciona o rosto do palhaço
      if (withClown) {
        const clownFace = document.createElement('img');
        clownFace.src = clownFaceImage; // Ajuste o caminho da imagem do rosto do palhaço
        clownFace.alt = 'Rosto de Palhaço';
        clownFace.className = 'clown-face'; // Estilize via CSS
        explosion.appendChild(clownFace);
      }

      document.body.appendChild(explosion);

      setTimeout(() => {
        explosion.remove();
      }, 800); // Duração da explosão

      explosionCount.current += 1; // Incrementa o contador de explosões
    }
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
    }, 1000); // Duração das chamas
  };

  const createBlueFire = () => {
    const blueFire = document.createElement('div');
    blueFire.className = 'blue-fire';

    blueFire.style.left = `${Math.random() * 100}vw`;
    blueFire.style.bottom = '0'; // Começa na parte inferior

    document.body.appendChild(blueFire);

    setTimeout(() => {
      blueFire.remove();
    }, 1000); // Duração das chamas azuis
  };

  useEffect(() => {
    // Adiciona a classe de tremor ao body
    document.body.classList.add('tremor');

    // Cria a primeira explosão imediatamente
    createExplosion();

    // Cria a segunda explosão com o rosto do palhaço após 1 segundo
    setTimeout(() => {
      createExplosion(true); // Passa true para adicionar o rosto do palhaço
    }, 1000);

    // Cria a terceira explosão após 1.8 segundos
    setTimeout(() => {
      createExplosion();
    }, 1800);

    const fireInterval = setInterval(() => createFire(), 100);
    const blueFireInterval = setInterval(() => createBlueFire(), 100);

    const timer = setTimeout(() => {
      clearInterval(fireInterval);
      clearInterval(blueFireInterval);
      document.body.classList.remove('tremor'); // Remove o tremor após a animação
      onComplete(); // Chama a função de finalização
    }, 3000); // Duração total da animação

    return () => {
      clearInterval(fireInterval);
      clearInterval(blueFireInterval);
      clearTimeout(timer);
      document.body.classList.remove('tremor'); // Limpeza ao desmontar o componente
    };
  }, [onComplete]);

  return <div className="transition-animation" />;
};

export default TransitionAnimation;
