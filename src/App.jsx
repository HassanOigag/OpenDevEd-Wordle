import "./styles/style.css";
import Grid from "./components/Grid";
import Guess from "./components/Guess";
import { useState } from "react";
import { GameContext } from "./gameContext";

function App() {
  const [guess, setGuess] = useState([]);
  const [row, setRow] = useState(0);
  const [check, setCheck] = useState(false);
  return (
    <>
      <header>
        <h1>wordle - Assignement</h1>
      </header>
      <GameContext.Provider
        value={{ guess, setGuess, row, setRow, check, setCheck }}
      >
        <Grid  />
        <Guess  />
      </GameContext.Provider>
    </>
  );
}

export default App;
