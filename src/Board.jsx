import { Row } from "./Row";
import './Board.css'

export function Board({guesses, currentGuess, gameStatus}){
  const emptyRows = gameStatus === 'playing' ?  6 - guesses.length - 1 : 6 - guesses.length;

  return (
    <div className="board">
      {guesses.map((guess, index) => {
        return(
          <Row key={`guess-${index}`} guess={guess} />
        );
      })}
      {gameStatus === 'playing' && <Row currentGuess={currentGuess} />}
      {Array.from({length: emptyRows}).map((_, index) => {
        return(
          <Row key={`empty-${index}`} />
        );
      })}
    </div>
  );
}