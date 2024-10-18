import React, { useState } from 'react';

const Square = ({ value, onClick }) => (
  <button className="square" onClick={onClick}>
    {value}
  </button>
);

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (i) => {
    if (calculateWinner(squares) || squares[i]) return;

    const squaresCopy = [...squares];
    squaresCopy[i] = xIsNext ? 'X' : 'O';
    setSquares(squaresCopy);
    setXIsNext(!xIsNext);
  };

  const renderSquare = (i) => (
    <Square value={squares[i]} onClick={() => handleClick(i)} />
  );

  const winner = calculateWinner(squares);
  let statusMessage;
  if (winner) {
    statusMessage = `Winner: ${winner}`;
  } else if (squares.every(Boolean)) {
    statusMessage = "It's a draw!";
  } else {
    statusMessage = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div>
      <div className="status">{statusMessage}</div>
      <div className="board">
        {squares.map((_, i) => (
          <div key={i}>{renderSquare(i)}</div>
        ))}
      </div>
    </div>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];

  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
};

const Game = () => (
  <div className="game-container">
    <Board />
    <style jsx>{`
      .game-container {
        text-align: center;
        margin: 20px;
        font-family: sans-serif;
      }
      .status {
        margin-bottom: 10px;
        font-size: 18px;
        font-weight: bold;
      }
      .board {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        border: 2px solid black;
        width: 180px;
      }
      .square {
        width: 60px;
        height: 60px;
        font-size: 24px;
        cursor: pointer;
        border: 1px solid black;
        margin: -1px;
      }
    `}</style>
  </div>
);

export default Game;
