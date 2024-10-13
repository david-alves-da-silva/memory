import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../components/Card';
import {
  fetchRecordRequest,
  saveRecordRequest,
} from '../redux/actions/gameActions';
import '../assets/styles/style.css';

const GameBoard = () => {
  const [cards, setCards] = useState([]);
  const [firstCard, setFirstCard] = useState(null);
  const [lockMode, setLockMode] = useState(false);
  const [time, setTime] = useState(0);
  const [level, setLevel] = useState(1);
  const [recordHolder, setRecordHolder] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const record = useSelector((state) => state.game.record);

  const levels = useMemo(
    () => ({
      1: [
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
      2: [
        'corbac',
        'corbacBack',
        'dratak',
        'hulk',
        'hulkChuva',
        'leonardo',
        'pikachu',
        'rafaelo',
        'spider',
        'spider2',
      ],
    }),
    [],
  );

  const totalLevels = Object.keys(levels).length;

  const createPairFromTech = useCallback(
    (tech) => [
      { id: createIdWithTech(tech), icon: tech, flipped: false },
      { id: createIdWithTech(tech), icon: tech, flipped: false },
    ],
    [],
  );

  const createIdWithTech = (tech) => `${tech}-${Date.now()}-${Math.random()}`;

  const shuffleCards = (generatedCards) => {
    const shuffled = [...generatedCards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
  };

  const createCardsFromTechs = useCallback(() => {
    const techs = levels[level];
    const generatedCards = techs.flatMap(createPairFromTech);
    shuffleCards(generatedCards);
  }, [level, levels, createPairFromTech]);

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
          const username = localStorage.getItem('username');
          if (record === null || time < record.time) {
            handleGameEnd(time, username);
          }
          handleLevelCompletion(); // Verifica se vai para o próximo nível ou para /over
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

  const handleGameEnd = (time, username) => {
    dispatch(saveRecordRequest(username, time));
  };

  const handleLevelCompletion = () => {
    if (level < totalLevels) {
      setLevel((prevLevel) => prevLevel + 1);
      setCards([]);
      setTime(0);
      setFirstCard(null);
      createCardsFromTechs();
    } else {
      navigate('/over'); // Redireciona ao finalizar o último nível
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (!record) dispatch(fetchRecordRequest(username));
    if (record && record.username) setRecordHolder(record.username);

    const timer = setInterval(() => setTime((prevTime) => prevTime + 1), 1000);
    return () => clearInterval(timer);
  }, [dispatch, record]);

  useEffect(() => {
    createCardsFromTechs();
  }, [createCardsFromTechs]);

  const username = localStorage.getItem('username');
  const isRecordHolder = username === recordHolder;

  return (
    <div
      className="container"
      style={{
        backgroundColor: isRecordHolder ? 'green' : 'yellow',
        height: '100vh',
        width: '100%',
      }}
    >
      <h1>Nível {level}</h1>
      <div className="timer-record">
        <div className="timer">{time}</div>
        <div className="record">
          {record ? (
            <>
              {record.time} {record.username}
            </>
          ) : (
            'Nenhum recorde disponível.'
          )}
        </div>
      </div>

      <div className="cards-container">
        {cards.map((card) => (
          <Card key={card.id} {...card} onClick={() => flipCard(card.id)} />
        ))}
      </div>

      <div className="button-container">
        {cards.every((card) => card.flipped) && level < totalLevels && (
          <button className="common-button" onClick={handleLevelCompletion}>
            Próximo Nível
          </button>
        )}
        <button className="common-button" onClick={() => navigate('/home')}>
          Sair
        </button>
        <button className="common-button atention" onClick={handleLogout}>
          Desconectar
        </button>
      </div>
    </div>
  );
};

export default GameBoard;
