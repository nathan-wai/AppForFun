import React, { useState, useEffect, useRef } from 'react';

function Question({ question, answer, onNextQuestion }) {
  const [guess, setGuess] = useState(Array(answer.length).fill(''));
  const [correctLetters, setCorrectLetters] = useState(Array(answer.length).fill(false));
  const inputRefs = useRef([]);

  useEffect(() => {
    setGuess(Array(answer.length).fill(''));
    setCorrectLetters(Array(answer.length).fill(false));
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [answer]);

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && index > 0 && !guess[index]) {
      e.preventDefault();
      const newGuess = [...guess];
      newGuess[index - 1] = '';
      setGuess(newGuess);
      const newCorrectLetters = [...correctLetters];
      newCorrectLetters[index - 1] = false;
      setCorrectLetters(newCorrectLetters);
      inputRefs.current[index - 1].focus();
    }
  };

  const handleInputChange = (index, value) => {
    if (index >= answer.length) return;

    const newGuess = [...guess];
    newGuess[index] = value.toUpperCase();
    setGuess(newGuess);

    const newCorrectLetters = [...correctLetters];
    newCorrectLetters[index] = newGuess[index] === answer[index];
    setCorrectLetters(newCorrectLetters);

    if (value && index < answer.length - 1) {
      inputRefs.current[index + 1].focus();
    }

    if (newGuess.join('') === answer) {
      setTimeout(() => onNextQuestion(true), 500);
    }
  };

  return (
    <div className="Question">
      <h3>{question}</h3>
      <div className="answer-boxes">
        {answer.split('').map((letter, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            maxLength="1"
            value={guess[index]}
            onChange={(e) => handleInputChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={correctLetters[index] ? 'correct' : ''}
          />
        ))}
      </div>
      {guess.join('') !== answer && guess.filter(Boolean).length === answer.length && (
        <p>🔒 Not quite right. Try again!</p>
      )}
    </div>
  );
}

export default Question;