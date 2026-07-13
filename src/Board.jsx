import { Row } from "./Row";
import './Board.css'

export function Board({guesses, currentGuess}){
  return (
    <div className="board">
      <Row />
      <Row />
      <Row />
      <Row />
      <Row />
      <Row />
    </div>
  );
}