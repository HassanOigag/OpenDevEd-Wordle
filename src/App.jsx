import "./styles/style.css";
import Grid from "./components/Grid";
import Guess from "./components/Guess";
import { useState } from "react";
import { GameContext } from "./gameContext";
import { MAX_ATTEMPTS, WORD_LENGTH } from "./settings";
import Toast from "./components/Toast";
import {words} from "./settings";
import Confetti from "react-confetti";
let randomWord = words[Math.floor(Math.random() * words.length)];
console.log(randomWord);

function App() {
  const [grid, setGrid] = useState(
    Array.from({ length: MAX_ATTEMPTS }, () =>
      Array.from({ length: WORD_LENGTH }, () => "")
    )
  );
  const [row, setRow] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState("");
  const [won, setWon] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  return (
    <>
      <header>
        <h1>wordle - Assignement</h1>
      </header>

      <GameContext.Provider
        value={{
          row,
          setRow,
          submitted,
          setSubmitted,
          grid,
          setGrid,
          setShowToast,
          setToastText,
          correctWord: randomWord,
          setWon,
        }}
      >
          {won && <h1>hello world</h1>}
          <Toast text={toastText} show={showToast} />
          <Grid />
          <Guess />
      </GameContext.Provider>
    </>
  );
}

export default App;
