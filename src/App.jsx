import { useEffect, useState } from 'react';
import './App.css'
import { Board } from './Board';

const words = ['pilot', 'arrow', 'bench', 'black', 'cover', 'daily', 'group', 'happy', 'fraud', 'hotel', 'ideal', 'eager', 'logic', 'ocean', 'paper', 'mount', 'light', 'peace', 'times', 'tower', 'steel', 'vital', 'stout', 'worth'];

function App() {
  const [answer, setAnswer] = useState(() => {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  });
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState(''); 

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
        answerLetters[i] = null;
      }
    }

    return results;
  }

  useEffect(() => {
    function handleKeyPress(event){
      const isLetter = /^[a-zA-Z]$/.test(event.key);

      if(isLetter && currentGuess.length < 5){
        setCurrentGuess(prevGuess => prevGuess + event.key);
      }
      if(event.key === "Backspace" && currentGuess.length > 0){
        setCurrentGuess(prevGuess => prevGuess.slice(0, -1));
      }
      if(event.key === 'Enter' && currentGuess.length === 5){
        setGuesses(prevGuesses => [...prevGuesses, {
          word: currentGuess,
          results: checkGuess(currentGuess, answer)
        }]);
        setCurrentGuess('');
      }
    }
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [currentGuess, answer]);

  return (
    <Board guesses={guesses} currentGuess={currentGuess} />
  );
}

export default App