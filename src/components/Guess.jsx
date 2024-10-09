import React from "react";
import { useState, useEffect, useContext } from "react";
import { GameContext } from "../gameContext";
import { MAX_ATTEMPTS, words } from "../settings";


function isValidLetter(letter) {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  return letters.includes(letter);
}

function Guess() {
  const { row, setRow, setGrid, setShowToast, setToastText, correctWord, setWon } =
    useContext(GameContext);
  const [index, setIndex] = useState(0);
  const [guess, setGuess] = useState(["", "", "", "", ""]);
  const [shake, setShake] = useState(false);
  const [selected, setSelected] = useState(false);

  function shakeIt() {
    setShake(true);
    setTimeout(() => {
      setShake(false);
    }, 500);
  }

  function toastIt(error) {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
    setToastText(error);
    shakeIt();
  }
  const removeBorder = () => {
    let cols = document.querySelectorAll(".guess-letter");
    cols.forEach((col) => {
      col.classList.remove("border");
    });
  };

  const checkGuess = (guess) => {
    // alert("checkGuess ", guess.join("").length < 5);
    if (guess.join("").length < 5) {
      toastIt("Not enough letters");
      return;
    }
    if (!words.includes(guess.join(""))) {
      toastIt("Not in word list");
      return;
    }
    if (row === MAX_ATTEMPTS) return;
    setGuess(guess);
    setGrid((prev) => {
      const copy = prev.map((row) => [...row]);
      copy[row] = guess;
      return copy;
    });
    removeBorder();
    
    setRow((prev) => prev + 1);
    setGuess(["", "", "", "", ""]);
    setIndex(0);
    let newGuess = guess.join("");
    console.log(newGuess, correctWord)
    if (newGuess === correctWord) {
      console.log("You win");
      setWon(true);
    }
  };

  useEffect(() => {
    let cols = document.querySelectorAll(".guess-letter");
    if (selected && index > 0) {
      cols[index - 1].classList.add("selected");
      cols[index - 1].classList.add("border");
      setTimeout(() =>  {
        cols[index - 1].classList.remove("selected");
      }, 500);
    }

    const handleKeyDown = (e) => {
      if (e.key === "Backspace" && index > 0) {
        cols[index - 1].classList.remove("border");
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
      setSelected(true);
      setTimeout(() => {
        setSelected(false);
      }, 500);
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
      <div className={`row ${shake ? "shake" : ""}`}>
        {guess.map((letter, i) => (
          <div className="col guess-letter" key={i}>
            {letter}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Guess;
