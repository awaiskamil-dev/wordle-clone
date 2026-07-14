import './Keyboard.css'

const row1 = ['Q','W','E','R','T','Y','U','I','O','P'];
const row2 = ['A','S','D','F','G','H','J','K','L'];
const row3 = ['Backspace','Z','X','C','V','B','N','M','Enter'];

export function Keyboard({handleKey}){
  function renderRow(row){
    return row.map((key) => {
      let className = 'key';
      let content = key;

      if (key === 'Enter' || key === 'Backspace') {
        className = 'key key-wide';
      }

      if (key === 'Backspace') {
        content = '⌫';
      }

      return (
        <button key={key} className={className} onClick={() => handleKey(key)}>
          {content}
        </button>
      );
    });
  }

  return (
    <div className="keyboard">
      <div className="keyboard-row">
       {renderRow(row1)}
      </div>

      <div className="keyboard-row">
        {renderRow(row2)}
      </div>

      <div className="keyboard-row">
        {renderRow(row3)}
      </div>
    </div>
  );
}