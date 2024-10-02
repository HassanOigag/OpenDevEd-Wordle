import React from "react";
import { useState, useEffect, useContext } from "react";
import { GameContext } from "../gameContext";

function isValidLetter(letter) {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  return letters.includes(letter);
}

function Guess(props) {
  const [guess, setGuess] = useState(["", "", "", "", ""]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Backspace" && index > 0) {
        setGuess((prev) => {
          const copy = [...prev];
          copy[index - 1] = "";
          return copy;
        });
        setIndex(index - 1);
      }
      if (e.key === "Enter" && index === 5) {
        props.setGuess(guess);
        props.setRow(prev => prev + 1);
        setGuess(["", "", "", "", ""]);
        setIndex(0);
        props.setCheck(true);
      }
      if (!isValidLetter(e.key)) return;
      if (index > 4) return;
      setGuess((prev) => {
        const copy = [...prev];
        copy[index] = e.key;
        return copy;
      });
      setIndex(index + 1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [index]);

  return (
    <div className="guess">
      <h1>Guess</h1>
      <div className="row">
        {guess.map((letter, i) => (
          <div className="col" key={i}>
            {letter}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Guess;
