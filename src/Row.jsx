import { Tile } from "./Tile";
import './Row.css'

export function Row(){
  return (
    <div className="row">
      <Tile />
      <Tile />
      <Tile />
      <Tile />
      <Tile />
    </div>
  );
}