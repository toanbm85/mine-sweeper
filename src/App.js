// App.js
import React, { useState, useEffect } from 'react';
import './App.css';

const BOARD_SIZE = 5;

function App() {
  const [squares, setSquares] = useState(Array(BOARD_SIZE * BOARD_SIZE).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const winner = calculateWinner(squares);

  useEffect(() => {
    if (!xIsNext && !winner) {
      const timer = setTimeout(() => {
        makeRandomMove();
      }, 500);
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
    const emptyIndexes = squares.map((val, idx) => val === null ? idx : null).filter(i => i !== null);
    if (emptyIndexes.length === 0) return;
    const randomIndex = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
    const nextSquares = squares.slice();
    nextSquares[randomIndex] = 'O';
    setSquares(nextSquares);
    setXIsNext(true);
  };

  const renderSquare = (i) => (
    <div className={`square ${squares[i] === 'X' ? 'x' : squares[i] === 'O' ? 'o' : ''}`} onClick={() => handleClick(i)}>
      {squares[i]}
    </div>
  );

  const resetGame = () => {
    setSquares(Array(BOARD_SIZE * BOARD_SIZE).fill(null));
    setXIsNext(true);
  };

  const rows = [];
  for (let row = 0; row < BOARD_SIZE; row++) {
    const cols = [];
    for (let col = 0; col < BOARD_SIZE; col++) {
      cols.push(renderSquare(row * BOARD_SIZE + col));
    }
    rows.push(<div className="board-row" key={row}>{cols}</div>);
  }

  return (
    <div className="game">
      <div className="status">
        {winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`}
      </div>
      {rows}
      <button className="reset" onClick={resetGame}>Reset</button>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [];
  const winLength = 5;

  // Rows
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j <= BOARD_SIZE - winLength; j++) {
      lines.push(Array(winLength).fill(0).map((_, k) => i * BOARD_SIZE + j + k));
    }
  }
  // Columns
  for (let i = 0; i <= BOARD_SIZE - winLength; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      lines.push(Array(winLength).fill(0).map((_, k) => (i + k) * BOARD_SIZE + j));
    }
  }
  // Diagonals (top-left to bottom-right)
  for (let i = 0; i <= BOARD_SIZE - winLength; i++) {
    for (let j = 0; j <= BOARD_SIZE - winLength; j++) {
      lines.push(Array(winLength).fill(0).map((_, k) => (i + k) * BOARD_SIZE + j + k));
    }
  }
  // Diagonals (top-right to bottom-left)
  for (let i = 0; i <= BOARD_SIZE - winLength; i++) {
    for (let j = winLength - 1; j < BOARD_SIZE; j++) {
      lines.push(Array(winLength).fill(0).map((_, k) => (i + k) * BOARD_SIZE + j - k));
    }
  }

  for (const line of lines) {
    const [first, ...rest] = line;
    if (squares[first] && rest.every(index => squares[index] === squares[first])) {
      return squares[first];
    }
  }
  return null;
}

export default App;
