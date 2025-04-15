import React, { useState, useEffect } from 'react';
import './App.css';

const BOARD_SIZE = 3;

function App() {
  const [squares, setSquares] = useState(Array(BOARD_SIZE * BOARD_SIZE).fill(null));
  const [xIsNext, setXIsNext] = useState(true); // true = Player's turn
  const winner = calculateWinner(squares);

  // Khi d?n lu?t máy, t? d?ng choi
  useEffect(() => {
    if (!xIsNext && !winner) {
      const timer = setTimeout(() => {
        makeRandomMove();
      }, 500); // Delay nh? cho t? nhiên
      return () => clearTimeout(timer);
    }
  }, [xIsNext, squares, winner]);

  const handleClick = (index) => {
    if (squares[index] || winner || !xIsNext) return;

    const nextSquares = squares.slice();
    nextSquares[index] = 'X';
    setSquares(nextSquares);
    setXIsNext(false);
  };

  const makeRandomMove = () => {
    const emptyIndices = squares
      .map((val, idx) => (val === null ? idx : null))
      .filter((val) => val !== null);

    if (emptyIndices.length === 0) return;

    const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    const nextSquares = squares.slice();
    nextSquares[randomIndex] = 'O';
    setSquares(nextSquares);
    setXIsNext(true);
  };

  const renderSquare = (index) => (
    <div
      key={index}
      className={`square ${squares[index] === 'X' ? 'x' : squares[index] === 'O' ? 'o' : ''}`}
      onClick={() => handleClick(index)}
    >
      {squares[index]}
    </div>
  );

  const renderBoard = () => {
    const board = [];
    for (let row = 0; row < BOARD_SIZE; row++) {
      const cols = [];
      for (let col = 0; col < BOARD_SIZE; col++) {
        const index = row * BOARD_SIZE + col;
        cols.push(renderSquare(index));
      }
      board.push(
        <div className="board-row" key={row}>
          {cols}
        </div>
      );
    }
    return board;
  };

  const handleReset = () => {
    setSquares(Array(BOARD_SIZE * BOARD_SIZE).fill(null));
    setXIsNext(true);
  };

  return (
    <div className="game">
      <div className="status">
        {winner
          ? `Winner: ${winner}`
          : squares.every((s) => s !== null)
          ? 'Draw!'
          : `Turn: ${xIsNext ? 'You (X)' : 'Computer (O)'}`}
      </div>
      {renderBoard()}
      <button className="reset" onClick={handleReset}>Reset Game</button>
    </div>
  );
}

// Function to check for a winner
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], // rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // columns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diagonals
    [2, 4, 6],
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default App;
