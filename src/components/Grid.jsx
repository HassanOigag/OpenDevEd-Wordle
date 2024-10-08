import React, { useEffect, useContext } from "react";
import { useState } from "react";
import { GameContext } from "../gameContext";

function Grid() {
  const {row, grid, correctWord} = useContext(GameContext);
  const submittedRow = grid[row - 1 < 0 ? 0 : row - 1];
  const guess = submittedRow.join("");

  const getColor = (letter, index, word) => {

    if (word[index] === letter)
      return 'correct';
    else if (letter && word.includes(letter)) {
      return "misplaced";
    }
    else if (!word.includes(letter)) {
      return "wrong";
    }
    else 
      return
  };
  return (
    <>
      <div className="grid">
        {grid.map((row, i) => (
          <div className="row" key={i}>
            {row.map((cell, j) => (
              <div className={`col ${guess[j] ? getColor(cell, j, correctWord) : ''}`} key={j}>
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
