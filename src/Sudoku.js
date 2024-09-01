import React, { useState, useEffect } from 'react';

const initialSudoku = [
  [0, 1, 0, 0, 0],
  [0, 0, 0, 3, 0],
  [0, 0, 4, 1, 2],
  [1, 0, 0, 5, 0],
  [3, 0, 0, 0, 4]
];

const sudokuSolution = [
  [2, 1, 3, 4, 5],
  [4, 2, 5, 3, 1],
  [5, 3, 4, 1, 2],
  [1, 4, 2, 5, 3],
  [3, 5, 1, 2, 4]
];

function Sudoku({ onComplete }) {
  const [puzzle, setPuzzle] = useState(initialSudoku);
  const [timeLeft, setTimeLeft] = useState(5 * 60);
  const [selectedCell, setSelectedCell] = useState(null);
  const [attempts, setAttempts] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          resetPuzzle();
          return 5 * 60; 
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [attempts]);

  const resetPuzzle = () => {
    setPuzzle(initialSudoku.map(row => [...row]));
    setSelectedCell(null);
    setAttempts(attempts + 1);
  };

  const handleInputChange = (row, col, value) => {
    const newPuzzle = puzzle.map((r) => [...r]);
    newPuzzle[row][col] = value === '' ? 0 : parseInt(value, 10);
    setPuzzle(newPuzzle);

    if (isSudokuComplete(newPuzzle) && isSudokuCorrect(newPuzzle)) {
      onComplete(true);
    }
  };

  const isSudokuComplete = (puzzle) => {
    return puzzle.every(row => row.every(cell => cell !== 0));
  };

  const isSudokuCorrect = (puzzle) => {
    return puzzle.every((row, i) => row.every((cell, j) => cell === sudokuSolution[i][j]));
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleCellFocus = (row, col) => {
    setSelectedCell(`${row}-${col}`);
  };

  return (
    <div className="Sudoku">
      <h2>Final Challenge: 5x5 Sudoku</h2>
      <p>Complete the puzzle to unlock your gift!</p>
      <p>Time remaining: {formatTime(timeLeft)}</p>
      <p>Attempt: {attempts}</p>
      <div className="sudoku-grid">
        {puzzle.map((row, rowIndex) => (
          <div key={rowIndex} className="sudoku-row">
            {row.map((cell, colIndex) => (
              <input
                key={`${rowIndex}-${colIndex}`}
                type="text"
                inputMode="numeric"
                pattern="[1-5]*"
                maxLength="1"
                value={cell === 0 ? '' : cell}
                onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                onFocus={() => handleCellFocus(rowIndex, colIndex)}
                className={`
                  ${initialSudoku[rowIndex][colIndex] !== 0 ? 'initial' : ''}
                  ${selectedCell === `${rowIndex}-${colIndex}` ? 'selected' : ''}
                `}
                readOnly={initialSudoku[rowIndex][colIndex] !== 0}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sudoku;