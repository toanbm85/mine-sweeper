import React, { useState, useEffect } from 'react';
import './App.css';

const BOARD_SIZE = 10;
const MINES_COUNT = 10;

const generateBoard = () => {
  const board = Array(BOARD_SIZE)
    .fill(null)
    .map(() => Array(BOARD_SIZE).fill({ mine: false, revealed: false, flagged: false, count: 0 }));

  // Đặt mìn ngẫu nhiên
  let minesPlaced = 0;
  while (minesPlaced < MINES_COUNT) {
    const row = Math.floor(Math.random() * BOARD_SIZE);
    const col = Math.floor(Math.random() * BOARD_SIZE);
    if (!board[row][col].mine) {
      board[row][col] = { ...board[row][col], mine: true };
      minesPlaced++;
    }
  }

  // Tính số mìn xung quanh
  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      if (!board[r][c].mine) {
        let mines = 0;
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            const nr = r + i;
            const nc = c + j;
            if (nr >= 0 && nr < BOARD_SIZE && nc >= 0 && nc < BOARD_SIZE) {
              if (board[nr][nc].mine) mines++;
            }
          }
        }
        board[r][c] = { ...board[r][c], count: mines };
      }
    }
  }

  return board;
};

const Cell = ({ cell, onClick, onRightClick }) => {
  let className = 'cell';
  if (cell.revealed) className += ' revealed';
  if (cell.flagged) className += ' flagged';
  return (
    <div
      className={className}
      onClick={onClick}
      onContextMenu={onRightClick}
    >
      {cell.revealed ? (cell.mine ? '💣' : (cell.count || '')) : (cell.flagged ? '🚩' : '')}
    </div>
  );
};

const App = () => {
  const [board, setBoard] = useState(generateBoard);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);

  const reveal = (r, c, b) => {
    if (b[r][c].revealed || b[r][c].flagged) return;
    b[r][c].revealed = true;
    if (b[r][c].mine) {
      setGameOver(true);
      return;
    }
    if (b[r][c].count === 0) {
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          const nr = r + i;
          const nc = c + j;
          if (nr >= 0 && nr < BOARD_SIZE && nc >= 0 && nc < BOARD_SIZE) {
            if (!b[nr][nc].revealed) {
              reveal(nr, nc, b);
            }
          }
        }
      }
    }
  };

  const handleClick = (r, c) => {
    if (gameOver || win) return;
    const newBoard = board.map(row => row.map(cell => ({ ...cell })));
    reveal(r, c, newBoard);
    setBoard(newBoard);
  };

  const handleRightClick = (e, r, c) => {
    e.preventDefault();
    if (gameOver || win) return;
    const newBoard = board.map(row => row.map(cell => ({ ...cell })));
    newBoard[r][c].flagged = !newBoard[r][c].flagged;
    setBoard(newBoard);
  };

  useEffect(() => {
    if (!gameOver) {
      const totalCells = BOARD_SIZE * BOARD_SIZE;
      const revealed = board.flat().filter(cell => cell.revealed).length;
      if (revealed === totalCells - MINES_COUNT) {
        setWin(true);
      }
    }
  }, [board, gameOver]);

  const resetGame = () => {
    setBoard(generateBoard());
    setGameOver(false);
    setWin(false);
  };

  return (
    <div className="game">
      <h1>Minesweeper</h1>
      {gameOver && <h2 className="status">💥 You hit a mine!</h2>}
      {win && <h2 className="status">🎉 You win!</h2>}
      <div className="board">
        {board.map((row, r) => (
          <div key={r} className="row">
            {row.map((cell, c) => (
              <Cell
                key={c}
                cell={cell}
                onClick={() => handleClick(r, c)}
                onRightClick={(e) => handleRightClick(e, r, c)}
              />
            ))}
          </div>
        ))}
      </div>
      <button className="reset" onClick={resetGame}>🔄 Reset</button>
    </div>
  );
};

export default App;
