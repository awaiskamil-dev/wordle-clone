import './App.css'

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
      answerLetters[i] = null;
    }
    else{
      results[i] = 'present';
      answerLetters[i] = null;
    }
  }

  return results;
}

function App() {
  checkGuess('swift', 'stout');
}

export default App