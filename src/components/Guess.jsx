import React from "react";
import { useState, useEffect, useContext } from "react";
import { GameContext } from "../gameContext";
import { MAX_ATTEMPTS, words } from "../settings";

let randomWord = words[Math.floor(Math.random() * words.length)];

function isValidLetter(letter) {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  return letters.includes(letter);
}

function Guess() {
  const { row, setRow, setGrid } = useContext(GameContext);
  const [index, setIndex] = useState(0);
  const [guess, setGuess] = useState(["", "", "", "", ""]);
  const [shake, setShake] = useState(false);

  const checkGuess = (guess) => {
    if (!words.includes(guess.join("")) || guess.length <  5)
      setShake(true);
    if (row === MAX_ATTEMPTS) return;
    setGuess(guess);
    setGrid((prev) => {
      const copy = prev.map((row) => [...row]);
      copy[row] = guess;
      return copy;
    });
    let newGuess = guess.join("");
    alert(newGuess);
    setRow((prev) => prev + 1);
    setGuess(["", "", "", "", ""]);
    setIndex(0);
  };

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
      if (e.key === "Enter") {
        checkGuess(guess);
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
