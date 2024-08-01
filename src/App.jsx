import { useState, useEffect } from "react";
import "./App.css";

const API_URL = "https://pokeapi.co/api/v2/pokedex/1";

function App() {
  const [cards, setCards] = useState([]);
  const [clicked, setClicked] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [index, setIndex] = useState(0);
  const [start, setStart] = useState(33);
  const [length, setLength] = useState(9);

  const ShowContents = ({ index }) => {
    return index == 1 ? (
      <div className="popUp">
        <div className="title">Choose Your Region</div>
        <div className="regionGroup">
          <div className="group">
            <div
              className="region"
              onClick={() => {
                setIndex(0);
                setStart(181);
              }}
            >
              Kanto
            </div>
            <div
              className="region"
              onClick={() => {
                setIndex(0);
                setStart(181);
              }}
            >
              Johto
            </div>
            <div className="region">Hoenn</div>
          </div>
          <div className="group">
            <div className="region">Sinnoh</div>
            <div className="region">Unova</div>
            <div className="region">Kalos</div>
          </div>
          <div className="group">
            <div className="region">Alola </div>
            <div className="region">Galar</div>
            <div className="region">Paldea</div>
          </div>
        </div>
      </div>
    ) : index == 2 ? (
      <div className="popUp">
        <div className="title">Choose Your Difficulty</div>
        <div className="regionGroup">
          <div className="group">
            <div
              className="region"
              onClick={() => {
                setIndex(0);
                setLength(3);
                createCards();
                setCurrentScore(0);
                setClicked([]);
              }}
            >
              Easy
            </div>
            <div
              className="region"
              onClick={() => {
                setIndex(0);
                createCards();
                setLength(9);
                setCurrentScore(0);
                setClicked([]);
              }}
            >
              Medium
            </div>
            <div
              className="region"
              onClick={() => {
                setIndex(0);
                setLength(15);
                createCards();
                setCurrentScore(0);
                setClicked([]);
              }}
            >
              Hard
            </div>
          </div>
        </div>
      </div>
    ) : index == 3 ? (
      <div className="popUp">
        <div className="title">How To Play</div>
        <div className="regionGroup">
          The purpose of this game is to click on as many different Pokemon
          cards in a row. You get one point for each different card clicked. If
          you click on a card that was already clicked then the score resets.
          You can also change the region on pokemon display and the difficulty
          of the game. <p>Enjoy 😆</p>
        <div className="group">
        <div
              className="region"
              onClick={() => {
                setIndex(0);
              }}
            >
              Close
            </div>


        </div>
       
       
        </div>
      </div>
    ) : null;
  };

  function shuffleArray(array) {
    for (let i = 33; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array.splice(0, length);
  }
//maybe initialize an empty arr and use a for loop to add specific segments based on 
//region choice then allow the function to shuffle that array each time?
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
          <button
            className="btn"
            onClick={() => {
              setIndex(1);
            }}
          >
            Choose Region
          </button>
          <button
            className="btn"
            onClick={() => {
              setIndex(2);
            }}
          >
            Change Difficulty
          </button>
          <button
            className="btn"
            onClick={() => {
              setIndex(3);
            }}
          >
            How To Play
          </button>
        </div>
      </div>
      <div>
        <ShowContents index={index} />
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
                  if(currentScore ==9 && cards.length ==3) {
                    alert('You Win!');
                    setCurrentScore(0);
                  setClicked([]);
                  setHighScore(currentScore);
                  }
                  if(currentScore ==15 && cards.length ==9) {
                    alert('You Win!');
                    setCurrentScore(0);
                  setClicked([]);
                  setHighScore(currentScore);
                  }
                  if(currentScore ==21 && cards.length ==15) {
                    alert('You Win!');
                    setCurrentScore(0);
                  setClicked([]);
                  setHighScore(currentScore);
                  }
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
