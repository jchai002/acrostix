import React from 'react';
const Tile = ({wordId,gridId,char}) => {
    var letterClass, tileClass;
    if (wordId) {
      letterClass = 'letter used';
    } else {
      letterClass = 'letter';
    }
    if (gridId) {
      tileClass = 'tile';
    } else {
      tileClass = 'tile white bg-black';
    }
    return (
      <div className={tileClass}>
        <div className="word-id">{wordId}</div>
        <div className="letter-number">{gridId}</div>
        <div className={letterClass}>{char}</div>
      </div>
    );
}

export default Tile
