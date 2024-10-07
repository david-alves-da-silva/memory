import React, { useEffect, useState } from 'react';
import Card from './Card';

const GameBoard = ({ onGameOver }) => {
  const [cards, setCards] = useState([]);
  const [firstCard, setFirstCard] = useState(null);
  const [lockMode, setLockMode] = useState(false);
  const techs = [
    'bootstrap',
    'css',
    'electron',
    'firebase',
    'html',
    'javascript',
    'jquery',
    'mongo',
    'node',
    'react',
  ];

  const createCardsFromTechs = () => {
    let generatedCards = [];
    techs.forEach((tech) => {
      generatedCards.push(...createPairFromTech(tech));
    });
    shuffleCards(generatedCards);
  };

  const createPairFromTech = (tech) => {
    return [
      { id: createIdWithTech(tech), icon: tech, flipped: false },
      { id: createIdWithTech(tech), icon: tech, flipped: false },
    ];
  };

  const createIdWithTech = (tech) => {
    return `${tech}-${Date.now()}-${Math.random()}`;
  };

  const shuffleCards = (generatedCards) => {
    const shuffled = [...generatedCards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
  };

  const flipCard = (id) => {
    if (lockMode) return;

    const card = cards.find((card) => card.id === id);
    if (!card || card.flipped) return;

    const updatedCards = cards.map((c) =>
      c.id === id ? { ...c, flipped: true } : c,
    );

    setCards(updatedCards);

    if (!firstCard) {
      setFirstCard(card);
    } else {
      setLockMode(true);
      // Verifique se o ícone do primeiro cartão corresponde ao segundo
      if (firstCard.icon === card.icon) {
        setFirstCard(null);
        if (updatedCards.every((c) => c.flipped)) {
          onGameOver();
        }
        setLockMode(false); // Desativa o lockMode imediatamente após encontrar um par
      } else {
        setTimeout(() => {
          const resetCards = updatedCards.map((c) =>
            c.id === firstCard.id || c.id === card.id
              ? { ...c, flipped: false }
              : c,
          );
          setCards(resetCards);
          setFirstCard(null);
          setLockMode(false); // Desativa o lockMode após redefinir os cartões
        }, 1000);
      }
    }
  };

  useEffect(() => {
    createCardsFromTechs();
  }, []);

  return (
    <div id="gameBoard">
      {cards.map((card) => (
        <Card key={card.id} {...card} onClick={() => flipCard(card.id)} />
      ))}
    </div>
  );
};

export default GameBoard;
