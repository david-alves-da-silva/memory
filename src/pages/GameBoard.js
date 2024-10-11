import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../components/Card';
import { fetchRecord, saveRecordRequest } from '../redux/actions/gameActions';

const GameBoard = () => {
  const [cards, setCards] = useState([]);
  const [firstCard, setFirstCard] = useState(null);
  const [lockMode, setLockMode] = useState(false);
  const [time, setTime] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const record = useSelector((state) => state.game.record); // Acessa o recorde do Redux

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
          // Se todas as cartas estão viradas, salva o recorde
          const username = localStorage.getItem('username'); // Obtém o nome do usuário
          if (record === null || time < record.time) {
            handleGameEnd(time, username); // Passa o username para salvar o recorde
          }
          navigate('/over'); // Redireciona para a tela de finalização
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
    const username = localStorage.getItem('username'); // Pega o username da sessão
    dispatch(fetchRecord(username)); // Busca o recorde ao montar o componente
    createCardsFromTechs();

    // Inicia o cronômetro
    const timer = setInterval(() => {
      setTime((prevTime) => prevTime + 1); // Incrementa o tempo a cada segundo
    }, 1000);

    return () => clearInterval(timer); // Limpa o intervalo ao desmontar o componente
  }, [createCardsFromTechs, dispatch]);

  // Função para salvar o recorde ao final do jogo
  const handleGameEnd = (time, username) => {
    dispatch(saveRecordRequest(username, time)); // Salva o recorde ao final do jogo
  };

  // Função para logout
  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' }); // Despacha a ação de logout
    navigate('/login'); // Redireciona para a página de login
  };

  return (
    <div className="game-container">
      {/* Exibição do tempo e recorde */}
      <div className="timer-record">
        <div className="timer">Tempo: {time}s</div>
        {record !== null && (
          <div className="record">
            Recorde: {record.time}s por {record.username}
          </div>
        )}
      </div>

      {/* Tabuleiro de cartas */}
      <div className="cards-container">
        {cards.map((card) => (
          <Card key={card.id} {...card} onClick={() => flipCard(card.id)} />
        ))}
      </div>

      {/* Botões na parte inferior */}
      <div className="game-buttons">
        <button onClick={() => navigate('/login')}>Sair</button>
        <button onClick={() => navigate('/home')}>Home</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default GameBoard;
