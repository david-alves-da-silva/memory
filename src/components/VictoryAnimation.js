import React, { useEffect, useState, useRef } from 'react';
import Confetti from 'react-confetti'; // Importa a biblioteca de confete
import '../assets/styles/style.css';
import happy from '../assets/musics/happy.mp3';

const VictoryAnimation = ({ onComplete }) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const audioRef = useRef(null); // Ref para o elemento de áudio

  // Atualiza as dimensões da tela
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete(); // Chama a função quando a animação termina
    }, 3000); // Duração da animação (3 segundos)

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="victory-animation">
      <Confetti width={width} height={height} />{' '}
      {/* Adiciona o efeito de confete */}
      <h2 className="victory-text">Você Venceu!</h2>
      <audio ref={audioRef} src={happy} autoPlay />{' '}
      {/* Adiciona o caminho da sua música aqui */}
    </div>
  );
};

export default VictoryAnimation;
