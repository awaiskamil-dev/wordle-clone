import { useCallback, useEffect, useState } from 'react';
import './App.css'
import { Board } from './Board';
import { Keyboard } from './Keyboard';

const words = ['pilot', 'arrow', 'bench', 'black', 'cover', 'daily', 'group', 'happy', 'fraud', 'hotel', 'ideal', 'eager', 'logic', 'ocean', 'paper', 'mount', 'light', 'peace', 'times', 'tower', 'steel', 'vital', 'stout', 'worth'];

function checkGuess(guess, answer){
  const results = [];
  const answerLetters = answer.split('');

  for(let i = 0; i < 5; i++){
    if(guess[i] === answer[i]){
      results[i] = 'correct';
      answerLetters[i] = null;
    }
  }

  for(let i = 0; i < 5; i++){
    if(results[i] === 'correct'){
      continue;
    }

    const index = answerLetters.findIndex((letter) => {
      return guess[i] === letter;
    });

    if(index === -1){
      results[i] = 'absent';
    }
    else{
      results[i] = 'present';
      answerLetters[index] = null;
    }
  }

  return results;
}

function App() {
  const [answer, setAnswer] = useState(() => {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  });
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState(''); 
  const [gameStatus, setGameStatus] = useState('playing');

  const handleKey = useCallback((key) => {
    if (gameStatus !== 'playing') return;

    const isLetter = /^[a-zA-Z]$/.test(key);

    if(isLetter && currentGuess.length < 5){
      setCurrentGuess(prevGuess => prevGuess + key);
    }
    if(key === "Backspace" && currentGuess.length > 0){
      setCurrentGuess(prevGuess => prevGuess.slice(0, -1));
    }
    if(key === 'Enter' && currentGuess.length === 5){
      const results = checkGuess(currentGuess, answer);

      setGuesses(prevGuesses => [...prevGuesses, {
        word: currentGuess,
        results: results
      }]);
      setCurrentGuess('');

      const isWin = results.every(status => status === 'correct');

      if(isWin){
        setGameStatus('won');
      }
      else if(guesses.length + 1 === 6){
        setGameStatus('lost');
      }
    }
  }, [gameStatus, currentGuess, answer, guesses]);

  useEffect(() => {
    function handleKeyDown(event){
      handleKey(event.key)
    }
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKey]);

  return (
    <div className='game-container'>
      <Board guesses={guesses} currentGuess={currentGuess} gameStatus={gameStatus} />
      {gameStatus === 'playing' && <Keyboard handleKey={handleKey} />}
    </div>
  );
}

export default App