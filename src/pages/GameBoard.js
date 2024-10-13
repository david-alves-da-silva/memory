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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const record = useSelector((state) => state.game.record);
  const [recordHolder, setRecordHolder] = useState(null); // Estado para armazenar o detentor do recorde

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
          const username = localStorage.getItem('username');
          if (record === null || time < record.time) {
            handleGameEnd(time, username);
          }
          setTimeout(() => navigate('/over'), 1000);
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
    const username = localStorage.getItem('username');
    if (!record) dispatch(fetchRecordRequest(username));
    createCardsFromTechs();

    // Função para buscar o detentor do recorde
    const fetchRecordHolder = async () => {
      try {
        const response = await dispatch(fetchRecordRequest(username)); // Altere conforme necessário para obter o detentor do recorde
        setRecordHolder(response.recordHolder); // Supondo que a resposta tenha o campo recordHolder
      } catch (error) {
        console.error('Erro ao buscar o detentor do recorde:', error);
      }
    };

    fetchRecordHolder(); // Chama a função para buscar o detentor do recorde

    const timer = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [createCardsFromTechs, dispatch, record]);

  const handleGameEnd = (time, username) => {
    dispatch(saveRecordRequest(username, time));
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  // Verifica se o usuário atual é o detentor do recorde
  const username = localStorage.getItem('username');
  const isRecordHolder = username === recordHolder;

  return (
    <div
      className="container"
      style={{
        backgroundColor: isRecordHolder ? 'yellow' : 'green', // Altere 'defaultColor' para a cor padrão que deseja
        height: '100vh', // Ajuste conforme necessário
        width: '100%', // Ajuste conforme necessário
      }}
    >
      <h1>Nível 1</h1>
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
