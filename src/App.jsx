import { useCallback, useEffect, useState } from 'react';
import './App.css'
import { Board } from './Board';
import { Keyboard } from './Keyboard';

const words = [
  'apple', 'arena', 'ashen', 'adopt',
  'bacon', 'badge', 'baker', 'blitz',
  'candy', 'cabin', 'chirp', 'crust',
  'dance', 'dodge', 'drift', 'dwarf',
  'eagle', 'earth', 'elbow', 'exact',
  'fable', 'faint', 'feast', 'flock',
  'ghost', 'glide', 'grape', 'groom',
  'habit', 'hedge', 'hound', 'hyena',
  'idiom', 'image', 'incur', 'ivory',
  'jelly', 'joint', 'judge', 'jumbo',
  'karma', 'kneel', 'knock', 'koala',
  'lemon', 'liver', 'lodge', 'lucky',
  'mango', 'medal', 'molly', 'mercy',
  'naive', 'nerve', 'noble', 'nurse',
  'oasis', 'olive', 'onset', 'oxide',
  'panel', 'pearl', 'plaza', 'pouch',
  'quack', 'quilt', 'quirk', 'quote',
  'radio', 'reach', 'rider', 'rusty',
  'salad', 'scale', 'skirt', 'swirl',
  'table', 'thorn', 'tiger', 'trace',
  'udder', 'uncle', 'upset', 'usher',
  'valve', 'venom', 'vivid', 'vouch',
  'wagon', 'whale', 'witch', 'wrist',
  'yacht', 'yield', 'young', 'yeast',
  'zebra', 'zesty', 'zonal', 'zippy',
];

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

  function restartGame(){
    setAnswer(() => {
      const randomIndex = Math.floor(Math.random() * words.length);
      return words[randomIndex];
    })
    setGameStatus('playing');
    setGuesses([]);
    setCurrentGuess('');
  }

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
      {gameStatus !== 'playing' && 
        <>
          <p className='correct-answer'>
            The answer was: <span>{answer}</span>
          </p>
          <button className='restart-button' onClick={restartGame}>↺</button>
        </>
      }
    </div>
  );
}

export default App