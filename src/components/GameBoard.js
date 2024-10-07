import React, { useEffect, useState, useCallback, useMemo } from 'react';
import Card from './Card';

const GameBoard = ({ onGameOver }) => {
  const [cards, setCards] = useState([]);
  const [firstCard, setFirstCard] = useState(null);
  const [lockMode, setLockMode] = useState(false);

  const techs = useMemo(
    () => [
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
    ],
    [],
  );

  const createPairFromTech = useCallback((tech) => {
    return [
      { id: createIdWithTech(tech), icon: tech, flipped: false },
      { id: createIdWithTech(tech), icon: tech, flipped: false },
    ];
  }, []);

  const createCardsFromTechs = useCallback(() => {
    let generatedCards = [];
    techs.forEach((tech) => {
      generatedCards.push(...createPairFromTech(tech));
    });
    shuffleCards(generatedCards);
  }, [techs, createPairFromTech]);

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
      if (firstCard.icon === card.icon) {
        setFirstCard(null);
        if (updatedCards.every((c) => c.flipped)) {
          onGameOver();
        }
        setLockMode(false);
      } else {
        setTimeout(() => {
          const resetCards = updatedCards.map((c) =>
            c.id === firstCard.id || c.id === card.id
              ? { ...c, flipped: false }
              : c,
          );
          setCards(resetCards);
          setFirstCard(null);
          setLockMode(false);
        }, 1000);
      }
    }
  };

  useEffect(() => {
    createCardsFromTechs();
  }, [createCardsFromTechs]);

  return (
    <div id="gameBoard">
      {cards.map((card) => (
        <Card key={card.id} {...card} onClick={() => flipCard(card.id)} />
      ))}
    </div>
  );
};

export default GameBoard;
