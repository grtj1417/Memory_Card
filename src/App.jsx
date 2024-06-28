import { useState } from 'react'

import Home from './js/pages/Home.jsx'
import DifficultyButton from './js/pages/DifficultyButton.jsx'
import DisplayCard from './js/pages/DisplayCard.jsx'
import Result from './js/pages/Result.jsx'
import './App.css'


function App() {
  const [deck, setDeck] = useState([]);
  const [selectedCardArray, setSelectedCardArray] = useState([]);

  const [page, setPage] = useState("home");
  const [result, setResult] = useState("");

  const [displayNum, setDisplayNum] = useState(1);

  function reset() {
    setPage("home");
    setDeck([]);
    setSelectedCardArray([]);
  }


  return (
    <>
      {page !== "home" && (
        <img className='home-btn' onClick={reset} src="./images/home_icon.svg"></img>
      )}

      {page === "home" && (
        <>
          <img className="logo" src="./images/genshin_logo.svg" alt="" />
          <Home
            setPage={setPage}
          />
        </>
      )}

      {page === "difficulty" && (
        <>
          <img className="logo" src="./images/genshin_logo.svg" alt="" />
          <DifficultyButton setDeck={setDeck} setPage={setPage} setDisplayNum={setDisplayNum}/>
        </>
      )}

      {page === "game" && (
        <DisplayCard
          cardArray={deck}
          selectedCardArray={selectedCardArray}
          setCardArray={setDeck}
          setSelectedCardArray={setSelectedCardArray}
          setPage={setPage}
          setResult={setResult}
          displayNum={displayNum}
        />
      )}

      {page === "result" && (
        <>
          <Result
            result={result}
            setResult={setResult}
            setPage={setPage}
            setCardArray={setDeck}
            setSelectedCardArray={setSelectedCardArray}
          />
        </>
      )}
    </>
  )
}

export default App
