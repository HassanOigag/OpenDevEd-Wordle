import "./styles/style.css";
import Grid from "./components/Grid";
import Guess from "./components/Guess";
import { useEffect, useState } from "react";
import { GameContext } from "./gameContext";
import { MAX_ATTEMPTS, WORD_LENGTH } from "./settings";
import Toast from "./components/Toast";
import {words} from "./settings";
import Confetti from "react-confetti";
let randomWord = words[Math.floor(Math.random() * words.length)];
console.log(randomWord);
randomWord = "smile";
function App() {
  const [grid, setGrid] = useState(
    Array.from({ length: MAX_ATTEMPTS }, () =>
      Array.from({ length: WORD_LENGTH }, () => "")
    )
  );


  const [row, setRow] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState("");
  const [won, setWon] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const handleClick = () => {
    setGrid(
      Array.from({ length: MAX_ATTEMPTS }, () =>
        Array.from({ length: WORD_LENGTH }, () => "")
      )
    );
    setRow(0);
    setWon(false);
    randomWord = words[Math.floor(Math.random() * words.length)];
  };

  useEffect(() => {

    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    }
    );

    return window.removeEventListener("resize", () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    });
  }, []);

  return (
    <>
      <header>
        <h1>wordle - Assignement</h1>
      </header>

      <GameContext.Provider
        value={{
          row,
          setRow,
          grid,
          setGrid,
          setShowToast,
          setToastText,
          correctWord: randomWord,
          setWon,
          won,
        }}
      >
          {won && <Confetti width={width} height={height}/>}
          <Toast text={toastText} show={showToast} />
          <Grid />
          <Guess />
         { won &&   <button className="restart" onClick={handleClick}>Restart</button> }
      </GameContext.Provider>
    </>
  );
}

export default App;
