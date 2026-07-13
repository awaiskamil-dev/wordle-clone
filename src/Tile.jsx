import './Tile.css'

export function Tile({letter, status}){
  let statusClassName = '';

  if(status === 'correct'){
    statusClassName = 'correct';
  }
  else if(status === 'present'){
    statusClassName = 'present'
  }
  else if(status === 'absent'){
    statusClassName = 'absent';
  }

  return (
    <div className={`tile ${statusClassName}`} >{letter}</div>
  );
}