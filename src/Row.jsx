import { Tile } from "./Tile";
import './Row.css'

export function Row({guess, currentGuess}){
  const tiles = [];

  for(let i = 0; i < 5; i++){
    let letter = '';
    let status = '';

    if(guess){
      letter = guess.word[i];
      status = guess.results[i];
    }
    else if(currentGuess){
      if(i < currentGuess.length){
        letter = currentGuess[i];
      }
      else{
        letter = '';
      }
    }

    tiles.push(<Tile key={i} letter={letter} status={status} />)
  }

  return (
    <div className="row">
      {tiles}
    </div>
  );
}