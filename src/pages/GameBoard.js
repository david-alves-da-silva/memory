import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../components/Card';
import VictoryAnimation from '../components/VictoryAnimation';
import TransitionAnimation from '../components/TransitionAnimation';
import {
  fetchRecordRequest,
  saveRecordRequest,
} from '../redux/actions/gameActions';
import '../assets/styles/style.css';
import transitionSound from '../assets/musics/bomb.mp3'; // Importa o som

const GameBoard = () => {
  const [cards, setCards] = useState([]);
  const [firstCard, setFirstCard] = useState(null);
  const [lockMode, setLockMode] = useState(false);
  const [time, setTime] = useState(0);
  const [level, setLevel] = useState(1);
  const [recordHolder, setRecordHolder] = useState(null);
  const [showVictoryAnimation, setShowVictoryAnimation] = useState(false);
  const [showTransitionAnimation, setShowTransitionAnimation] = useState(false);
  const [testMode, setTestMode] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const record = useSelector((state) => state.game.record);
  const audioRef = useRef(new Audio(transitionSound));

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
      3: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      4: ['11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
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
            setShowVictoryAnimation(true);
          }
          handleLevelCompletion();
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
      setShowTransitionAnimation(true); // Inicia a animação de transição
      audioRef.current.play();
      setTimeout(() => {
        // Lógica para avançar o nível
        setLevel((prevLevel) => prevLevel + 1);
        setCards([]);
        setTime(0);
        setFirstCard(null);
        createCardsFromTechs();
        setShowTransitionAnimation(false); // Oculta a animação de transição
      }, 3000); // Duração da animação de transição
    } else {
      // Se for o último nível, apenas mostra a animação de vitória
      setShowVictoryAnimation(true);
    }
  };

  useEffect(() => {
    if (showVictoryAnimation) {
      const timer = setTimeout(() => {
        setShowVictoryAnimation(false); // Oculta a animação após 4 segundos
        navigate('/over'); // Redireciona para /over
      }, 40000); // 4 segundos de duração

      return () => clearTimeout(timer); // Limpa o timer ao desmontar
    }
  }, [showVictoryAnimation, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('username');
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  const handleVictoryComplete = () => {
    setShowVictoryAnimation(false);
    navigate('/over');
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

  const isRecordHolder = localStorage.getItem('username') === recordHolder;

  return (
    <div
      className="container"
      style={{
        backgroundColor: isRecordHolder ? 'green' : 'yellow',
        height: '100vh',
        width: '100%',
        position: 'relative',
      }}
    >
      {showTransitionAnimation && (
        <TransitionAnimation
          onComplete={() => setShowTransitionAnimation(false)}
        />
      )}

      {showVictoryAnimation && (
        <VictoryAnimation onComplete={handleVictoryComplete} />
      )}

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
          <button
            style={{ display: 'none' }}
            className="common-button"
            onClick={handleLevelCompletion}
          >
            Próximo Nível
          </button>
        )}
        <button className="common-button" onClick={() => navigate('/home')}>
          Sair
        </button>
        <button className="common-button atention" onClick={handleLogout}>
          Desconectar
        </button>
        <button
          style={{ display: 'none' }}
          className="common-button"
          onClick={() => setTestMode(!testMode)}
        >
          {testMode ? 'Desativar Modo Teste' : 'Ativar Modo Teste'}
        </button>
        {testMode && (
          <button
            style={{ display: 'none' }}
            className="common-button"
            onClick={handleLevelCompletion}
          >
            Avançar Nível
          </button>
        )}
        {/* Botão para forçar a animação de vitória */}
        <button
          style={{ display: 'none' }}
          className="common-button"
          onClick={() => {
            setShowVictoryAnimation(true);
            setTimeout(handleVictoryComplete, 3000); // Chama a função após 3 segundos
          }}
        >
          Ver Animação de Vitória
        </button>
      </div>
    </div>
  );
};

export default GameBoard;
