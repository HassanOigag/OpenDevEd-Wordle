import "./styles/style.css";
import Grid from "./components/Grid";
import Guess from "./components/Guess";
function App() {
  return (
    <>
      <header>
        <h1>wordle</h1>
      </header>
      <Grid />
      <Guess /> 
    </>
  );
}

export default App;
