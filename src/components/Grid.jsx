import React, { useEffect, useContext } from "react";
import { useState } from "react";
import { GameContext } from "../gameContext";

function Grid() {
  const {guess, row, submitted, setSubmitted, grid, setGrid} = useContext(GameContext);

    // if (submitted) {
    //   setGrid((prev) => {
    //     const copy = prev.map((row) => [...row]);
    //     grid[row] = guess;
    //     setSubmitted(false);
    //     return copy;
    //   });
    // }
    // useEffect(() => {
    //   setGrid((prev) => {
    //     const copy = prev.map((row) => [...row]);
    //     copy[row] = guess;
    //     return copy;
    //   });

    // }, [row, guess]);

  return (
    <>
      <div className="grid">
        {grid.map((row, i) => (
          <div className="row" key={i}>
            {row.map((cell, j) => (
              <div className="col" key={j}>
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
