import React from 'react';
import Alphabet from "../../constants/alphabet";

const LetterTracker = ({letters,library}) => {
  // can take either an existing letter library object or array of letters
  console.log(library)
  if (!library) {
    var library = {};
    letters.forEach((letter)=>{
      if (library[letter]) {
        library[letter] ++
      } else {
        library[letter] = 1
      }
    });
  }
  var letterCounters = Alphabet.split('').map((letter) => {
    var letterClass = 'letter-'+letter;
    if (/[AEIOU]/.test(letter)) {
      letterClass += " vowels"
    }
    if (!library[letter]) {
      var numberClass = "red"
    }
    return (
      <div key={letter} className="tracker">
        <span className={letterClass}>{letter}</span>:
          <span className={numberClass}>{library[letter] || 0}</span>
        </div>
      )
    });

    return (
      <div className="trackers">
        {letterCounters}
      </div>
    );
  }

  export default LetterTracker
