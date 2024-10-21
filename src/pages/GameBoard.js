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

import transitionSound from '../assets/musics/bomb.mp3';
import level1Music from '../assets/musics/postMalone.mp3';
import level2Music from '../assets/musics/drake.mp3';
import level3Music from '../assets/musics/michael.mp3';
import level4Music from '../assets/musics/suspense.mp3';

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
  const audioRef = useRef(new Audio());
  const transitionAudioRef = useRef(new Audio(transitionSound));

  // Map de músicas por nível
  const levelSounds = useMemo(
    () => ({
      1: level1Music,
      2: level2Music,
      3: level3Music,
      4: level4Music,
    }),
    [],
  );

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

  const playLevelSound = useCallback(() => {
    const audio = audioRef.current;

    // Pausar qualquer áudio em execução antes de iniciar o novo
    if (!audio.paused) {
      audio.pause();
      audio.currentTime = 0; // Reiniciar o áudio
    }

    // Definir a nova música e garantir que ela será carregada corretamente
    audio.src = levelSounds[level];

    // Adicionar um listener para garantir que o áudio está pronto
    audio.addEventListener(
      'canplaythrough',
      () => {
        audio.play().catch((error) => {
          console.error('Erro ao reproduzir áudio:', error);
        });
      },
      { once: true },
    ); // Garantir que o evento seja disparado apenas uma vez
  }, [level, levelSounds]);

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

  const playAudio = async (audio) => {
    try {
      await audio.play();
    } catch (error) {
      console.error('Erro ao reproduzir áudio:', error);
    }
  };

  const stopAudio = async (audio) => {
    if (!audio.paused) {
      audio.pause();
      audio.currentTime = 0; // Reinicia o áudio
    }
  };

  const handleLevelCompletion = async () => {
    if (level < totalLevels) {
      setShowTransitionAnimation(true); // Inicia a animação de transição
      setLockMode(true); // Bloqueia interação enquanto ocorre a transição

      try {
        // Para a música do nível atual antes de tocar o som de transição
        await stopAudio(audioRef.current);

        // Toca o som de transição
        await playAudio(transitionAudioRef.current);

        // Duração da animação de transição
        setTimeout(async () => {
          await stopAudio(transitionAudioRef.current); // Para o som de transição

          // Avança para o próximo nível e reseta o estado
          setLevel((prevLevel) => prevLevel + 1);
          setCards([]);
          setTime(0);
          setFirstCard(null);

          createCardsFromTechs(); // Gera novas cartas
          setLockMode(false); // Libera interação
          setShowTransitionAnimation(false); // Oculta a animação de transição
          // Aguarda um pequeno atraso antes de tocar a nova música
          setTimeout(async () => {
            audioRef.current.src = levelSounds[level + 1]; // Define a nova música
            await playAudio(audioRef.current); // Toca a nova música
          }, 4000); // Pequeno atraso para garantir que o nível foi atualizado
        }, 3000); // Duração da animação de transição
      } catch (error) {
        console.error('Erro na transição de áudio:', error);
      }
    } else {
      // Último nível: mostra a animação de vitória
      setShowVictoryAnimation(true);
    }
  };

  useEffect(() => {
    if (level <= totalLevels) {
      createCardsFromTechs();
      playLevelSound();
    }
  }, [level, createCardsFromTechs, playLevelSound, totalLevels]);

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
    audioRef.current.pause();
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
    const audio = audioRef.current;
    const transitionAudio = transitionAudioRef.current;
    const timer = setInterval(() => setTime((prevTime) => prevTime + 1), 1000);
    return () => {
      clearInterval(timer);
      audio.pause();
      transitionAudio.pause();
    };
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
            // style={{ display: 'none' }}
            className="common-button"
            onClick={handleLevelCompletion}
          >
            Próximo Nível
          </button>
        )}
        <button
          className="common-button"
          onClick={() => {
            audioRef.current.pause();
            navigate('/home');
          }}
        >
          Sair
        </button>
        <button className="common-button atention" onClick={handleLogout}>
          Desconectar
        </button>
        <button
          // style={{ display: 'none' }}
          className="common-button"
          onClick={() => setTestMode(!testMode)}
        >
          {testMode ? 'Desativar Modo Hack' : 'Ativar Modo Hack'}
        </button>
        {testMode && (
          <button
            // style={{ display: 'none' }}
            className="common-button"
            onClick={handleLevelCompletion}
          >
            Avançar Nível
          </button>
        )}
        {/* Botão para forçar a animação de vitória */}
        <button
          // style={{ display: 'none' }}
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
