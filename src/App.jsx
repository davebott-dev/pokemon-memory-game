import { useState, useEffect } from "react";
import "./App.css";
import HowToPlay from "./components/btn3";


const API_URL = "https://pokeapi.co/api/v2/pokedex/1";

function shuffleArray(array) {
  //add more or less pokemon in the array by changing the array length in the foor loop
  for (let i = Math.floor(array.length / 30) - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function App() {
  const [cards, setCards] = useState([]);
  const [clicked, setClicked] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const[index, setIndex]= useState(0);
  cards.length = 12;

  const createCards = async () => {
    const response = await fetch(`${API_URL}`);
    const data = await response.json();

    let shuffled = shuffleArray(data.pokemon_entries);
    setCards(shuffled);
  };

  useEffect(() => {
    createCards();
  }, []);

  //make the buttons functional
  return (
    <div className="pageCont">
      <div className="header">

      <div className="score">
        <div className="current">
          <div className="text">Current Score:</div>
          <div className="num">{currentScore}</div>
        </div>
        <div className="high">
          <div className="text">High Score:</div>
          <div className="num">{highScore}</div>
        </div>
      </div>
      <div className="btnGroup">
        <button className="btn" onClick={()=> {
          setIndex(1);
        }}>Choose Region</button>
        <button className="btn" onClick={()=> {
          setIndex(2);
        }}>Change Difficulty</button> 
        <button className="btn" onClick={()=> {
          setIndex(3);
        }}>How To Play</button>

      </div>

      </div>
      <div>
        <HowToPlay index ={index}/>
        <span>Do not click the same Pokemon twice!</span>

        <div className="gridCont">
          {cards.map((card, index) => (
            <div
              className="card"
              key={index}
              onClick={() => {
                createCards();
                setClicked([...clicked, card.pokemon_species.name]);
                if (!clicked.includes(card.pokemon_species.name)) {
                  setCurrentScore((prev) => prev + 1);
                } else {
                  setHighScore(currentScore);
                  setCurrentScore(0);
                  setClicked([]);
                }
              }}
            >
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${card.entry_number}.png`}
              />
              <p>{card.pokemon_species.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
