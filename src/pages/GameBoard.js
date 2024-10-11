import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Card from '../components/Card';

const GameBoard = ({ onGameOver }) => {
  const [cards, setCards] = useState([]);
  const [firstCard, setFirstCard] = useState(null);
  const [lockMode, setLockMode] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    const generatedCards = techs.flatMap(createPairFromTech);
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

  // Função para logout
  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' }); // Despacha a ação de logout
    navigate('/login'); // Redireciona para a página de login
  };

  return (
    <div className="game-container">
      {/* Tabuleiro de cartas */}
      <div className="cards-container">
        {cards.map((card) => (
          <Card key={card.id} {...card} onClick={() => flipCard(card.id)} />
        ))}
      </div>

      {/* Botões na parte inferior */}
      <div className="game-buttons">
        <button onClick={() => navigate('/login')}>Sair</button>{' '}
        {/* Volta para a Home */}
        <button onClick={() => navigate('/home')}>Home</button>{' '}
        {/* Vai para a Home */}
        <button onClick={handleLogout}>Logout</button> {/* Faz logout */}
      </div>
    </div>
  );
};

export default GameBoard;
