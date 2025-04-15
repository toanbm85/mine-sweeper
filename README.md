# Getting Started with Create React App

## Creat a Simple Caro Game
```
npx create-react-app caro-game && cd caro-game
```
```
npm start
```

Now stop to edit game!
```
nano src/App.js
```
```
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
```
```
nano src/App.css
```
```
.game {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  font-family: sans-serif;
}

.board-row {
  display: flex;
}

.square {
  width: 60px;
  height: 60px;
  font-size: 30px;
  background-color: #fff;
  border: 1px solid #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.x {
  color: red;
}

.o {
  color: green;
}

.status {
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
}

.reset {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #ddd;
  border: none;
  cursor: pointer;
  font-size: 16px;
}
```
## Push your app to Github
### 1. Create a New Repository on GitHub
Creat with name `caro-name`

### 2. Initialize Git in Your Project (On your VPS)
```
git init
```
```
git add .
```
```
git commit -m "Initial commit"
```
### 3. Connect Your GitHub Repository to Your Local Project
```
git remote add origin https://github.com/USERNAME/caro-game.git
```
### 4. Push Your Code to GitHub
#### Check branch
```
git branch
```
If you see `master`, use this:
```
git branch -m master main
```
#### Then run
```
git push -u origin main
```







## Install Fleek CLI
```
npm install -g @fleek-platform/cli
```
```
fleek version
```
### Login
```
fleek login
```
Once logged-in to the Fleek Platform via the browser, go back to the terminal.

copy
🤖 Please follow the link to log in to Fleek Platform.
🔗 https://fleek.xyz/dashboard/login/xxxxxxx
Once successful, you’ll receive a confirmation message.

copy
✅ Success! You are now logged in to the Fleek Platform.




In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
