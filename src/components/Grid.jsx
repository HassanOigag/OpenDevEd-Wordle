import React, { useEffect } from "react";
import { useState } from "react";
function Grid(props) {
  const [grid, setGrid] = useState([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);

  if (props.check) {
    setGrid((prev) => {
      const copy = prev.map((row) => [...row]);
      grid[props.row] = props.guess;
      props.setCheck(false);
      return copy;
    });
  }
  // useEffect(() => {
  //   setGrid((prev) => {
  //     const copy = prev.map((row) => [...row]);
  //     copy[props.row] = props.guess;
  //     return copy;
  //   });

  // }, [props.row, props.guess]);

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
