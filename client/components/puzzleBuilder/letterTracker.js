import React from 'react';
import Alphabet from "../../constants/alphabet";

const LetterTracker = ({letters}) => {
  var dictionary = {};
  letters.forEach((letter)=>{
    if (dictionary[letter]) {
      dictionary[letter] ++
    } else {
      dictionary[letter] = 1
    }
  });
  var letterCounters = Alphabet.split('').map((letter) => {
    var letterClass = 'letter-'+letter;
    if (/[AEIOU]/.test(letter)) {
      letterClass += " vowels"
    }
    if (!dictionary[letter]) {
      var numberClass = "red"
    }
    return (
      <div key={letter} className="tracker">
        <span className={letterClass}>{letter}</span>:
          <span className={numberClass}>{dictionary[letter] || 0}</span>
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
