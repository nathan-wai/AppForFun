import React, { useState } from 'react';
import Question from './Question';
import Sudoku from './Sudoku';
import './App.css';

const questions = [
  { question: "What's your favorite color?", answer: "PINK" },
  { question: "Our go to activity in Pittsurgh?", answer: "MINIGOLF" },
  { question: "Who have you beaten in a man's game?", answer: "MINWOO" },
  { question: "Favorite Pittsurgh Bar?", answer: "SHADYGROVE" },
  { question: "What did I owe you in NYC?", answer: "SHOT" }
];

function App() {
  const [stage, setStage] = useState('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const startVerification = () => {
    setStage('questionnaire');
  };

  const handleNextQuestion = (isCorrect) => {
    if (isCorrect) {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setStage('sudoku');
      }
    }
  };

  const handleSudokuComplete = (isComplete) => {
    if (isComplete) {
      setStage('revealed');
    }
    // If not complete, the Sudoku component will handle resetting itself
  };

  const openYouTubeLink = () => {
    window.open('https://www.youtube.com/watch?v=k12NZLh_Xvg', '_blank');
  };

  return (
    <div className="App">
      {stage === 'start' && (
        <div className="start-screen">
          <h1>Serena's Birthday Vault 🎁</h1>
          <h2>Identity Verification Required</h2>
          <p>Answer these questions to unlock your birthday surprise!</p>
          <button onClick={startVerification}>Verify Identity</button>
        </div>
      )}

      {stage === 'questionnaire' && (
        <div className="questionnaire">
          <Question
            question={questions[currentQuestionIndex].question}
            answer={questions[currentQuestionIndex].answer}
            onNextQuestion={handleNextQuestion}
          />
        </div>
      )}

      {stage === 'sudoku' && (
        <Sudoku onComplete={handleSudokuComplete} />
      )}

      {stage === 'revealed' && (
        <div className="vault-unlocked">
          <h2>🎉 Identity Confirmed! 🎉</h2>
          <p>Congratulations, Serena! You've unlocked your birthday surprise!</p>
          <button onClick={openYouTubeLink}>Reveal Your Gift! 🎁</button>
        </div>
      )}
    </div>
  );
}

export default App;