import React, { useEffect, useContext } from "react";
import { useState } from "react";
import { GameContext } from "../gameContext";

function Grid() {
  const {row, grid} = useContext(GameContext);
  const submittedRow = grid[row - 1 < 0 ? 0 : row - 1];
  const guess = submittedRow.join("");

  const getColor = (letter, index, word) => {
    console.log(letter, index, guess);
    if (guess[index] === letter)
      return 'correct';
    else if (guess.includes(letter)) {
      return "misplaced";
    }
    else
      return "wrong";
  };
  return (
    <>
      <div className="grid">
        {grid.map((row, i) => (
          <div className="row" key={i}>
            {row.map((cell, j) => (
              <div className={`col ${guess[j] ? getColor(cell, j) : ''}`} key={j}>
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default Grid;
