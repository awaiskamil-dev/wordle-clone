import { Row } from "./Row";
import './Board.css'

export function Board({guesses, currentGuess}){
  const gameOver = guesses.length >= 6;
  const emptyRows = gameOver? 6 - guesses.length : 6 -guesses.length - 1;

  return (
    <div className="board">
      {guesses.map((guess, index) => {
        return(
          <Row key={`guess-${index}`} guess={guess} />
        );
      })}
      {!gameOver && <Row currentGuess={currentGuess} />}
      {Array.from({length: emptyRows}).map((_, index) => {
        return(
          <Row key={`empty-${index}`} />
        );
      })}
    </div>
  );
}