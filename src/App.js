import React from "react";
import "./App.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import PokeRow from "./components/PokeRow";
import bulbasaur from "./assets/1.png";

function App() {
  let [input, setInput] = useState(1);

  const [sprite, setSprite] = useState(bulbasaur);
  const [name, setName] = useState("Bulbasaur");
  const [number, setNumber] = useState("1");
  const [type, setType] = useState("Grass/Poison");
  const [weight, setWeight] = useState("69");
  const [hp, setHP] = useState("45");
  const [attack, setAttack] = useState("49");
  const [defense, setDefense] = useState("49");
  const [speed, setSpeed] = useState("65");

  const [inputSprite, setInputSprite] = useState(sprite);
  const [inputName, setInputName] = useState(name);
  const [inputNumber, setInputNumber] = useState(number);
  const [inputType, setInputType] = useState(type);
  const [inputWeight, setInputWeight] = useState(weight);
  const [inputHP, setInputHP] = useState(hp);
  const [inputAttack, setInputAttack] = useState(attack);
  const [inputDefense, setInputDefense] = useState(defense);
  const [inputSpeed, setInputSpeed] = useState(speed);

  const formRef = useRef();
  const dotRef = useRef();

  const fetchData = async (pokemon) => {
    const { data } = await axios.get(pokemon);

    setName(data.name);
    setSprite(data.sprites.other["official-artwork"].front_default);
    setNumber(data.id);
    setWeight(data.weight);
    setHP(data.stats[0].base_stat);
    setAttack(data.stats[1].base_stat);
    setDefense(data.stats[2].base_stat);
    setSpeed(data.stats[3].base_stat);

    if (data.types.length > 1) {
      setType(data.types[0].type.name + "/" + data.types[1].type.name);
    } else {
      setType(data.types[0].type.name);
    }

    // console.log(data);
  };

  useEffect(() => {
    fetchData("https://pokeapi.co/api/v2/pokemon/" + input);
  }, [input]);

  function updatePoke(event) {
    setInput(event.target.value.toLowerCase());
  }

  function Submit(e) {
    e.preventDefault();
    // console.log(formRef.value); Why doesn't this work?
    formRef.current.reset();

    setInputName(name);
    setInputSprite(sprite);
    setInputNumber(number);
    setInputType(type);
    setInputWeight(weight);
    setInputHP(hp);
    setInputAttack(attack);
    setInputDefense(defense);
    setInputSpeed(speed);

    speech();
    dotToggle();
    dotToggleCount();
  }

  function speech() {
    if ("speechSynthesis" in window) {
      // console.log("speechSynthesis Supported!");
      var msg = new SpeechSynthesisUtterance();
      // var voices = window.speechSynthesis.getVoices();
      // msg.voice = voices[21];
      msg.volume = 1; // From 0 to 1
      msg.rate = 1.8; // From 0.1 to 10
      msg.pitch = 0; // From 0 to 2
      msg.text = name;
      msg.lang = "en";
      speechSynthesis.speak(msg);
    } else {
      alert("Sorry, your browser doesn't support text to speech!");
    }
  }

  function syllableCount(word) {
    word = word.toLowerCase(); //word.downcase!
    if (word.length <= 3) {
      return 1;
    } //return 1 if word.length <= 3
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, ""); //word.sub!(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '')
    word = word.replace(/^y/, ""); //word.sub!(/^y/, '')
    return word.match(/[aeiouy]{1,2}/g).length; //word.scan(/[aeiouy]{1,2}/).size
  }

  function dotToggle() {
    function dotToggleBlue() {
      dotRef.current.style.backgroundColor = "#74f3f9";
    }
    function dotToggleWhite() {
      dotRef.current.style.backgroundColor = "#0e55a6";
    }
    setTimeout(dotToggleBlue, 200);
    setTimeout(dotToggleWhite, 300);
  }

  let counter = 1;
  function dotToggleCount() {
    dotToggle();
    if (counter < syllableCount(name)) {
      counter++;
      window.setTimeout(dotToggleCount, 200);
    }
  }

  return (
    <div className="container">
      <div className="app">
        <header>
          <span className="dot" ref={dotRef}></span>
          <span>Pokédex</span>
          <span className="volume">&#128362;</span>
          {/* <span>&#128360;</span> */}
        </header>
        <div className="input">
          <form id="test" ref={formRef} onSubmit={Submit}>
            <input
              type="text"
              list="drop-down"
              placeholder="Who's that Pokemon!?"
              onChange={(event) => updatePoke(event)}
            />
            <datalist id="drop-down">
              <option>Squirtle</option>
              <option>Wartortle</option>
              <option>Blastoise</option>
            </datalist>
            <button type="submit">Submit</button>
          </form>
        </div>
        <div className="character">
          <div className="character-pic">
            <img id="pokemon" alt="bulbasaur" src={inputSprite} />
          </div>
          <div className="character-data">
            <table id="character-data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Number</th>
                  <th>Type</th>
                  <th>Weight</th>
                </tr>
                <tr>
                  <td>{inputName}</td>
                  <td>{inputNumber}</td>
                  <td>{inputType}</td>
                  <td>{inputWeight}</td>
                </tr>
                <tr>
                  <th>HP</th>
                  <th>Attack</th>
                  <th>Defense</th>
                  <th>Speed</th>
                </tr>
                <tr>
                  <td>{inputHP}</td>
                  <td>{inputAttack}</td>
                  <td>{inputDefense}</td>
                  <td>{inputSpeed}</td>
                </tr>
              </thead>
            </table>
          </div>
        </div>
        <div id="tenList">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Number</th>
                <th>Type</th>
                <th>Weight</th>
                <th>HP</th>
                <th>Attack</th>
                <th>Defense</th>
                <th>Speed</th>
              </tr>
              <>
                <PokeRow
                  pokemon={"https://pokeapi.co/api/v2/pokemon/" + (input + 1)}
                />
                <PokeRow
                  pokemon={"https://pokeapi.co/api/v2/pokemon/" + (input + 2)}
                />
                <PokeRow
                  pokemon={"https://pokeapi.co/api/v2/pokemon/" + (input + 3)}
                />
                <PokeRow
                  pokemon={"https://pokeapi.co/api/v2/pokemon/" + (input + 4)}
                />
                <PokeRow
                  pokemon={"https://pokeapi.co/api/v2/pokemon/" + (input + 5)}
                />
                <PokeRow
                  pokemon={"https://pokeapi.co/api/v2/pokemon/" + (input + 6)}
                />
                <PokeRow
                  pokemon={"https://pokeapi.co/api/v2/pokemon/" + (input + 7)}
                />
                <PokeRow
                  pokemon={"https://pokeapi.co/api/v2/pokemon/" + (input + 8)}
                />
                <PokeRow
                  pokemon={"https://pokeapi.co/api/v2/pokemon/" + (input + 9)}
                />
                <PokeRow
                  pokemon={"https://pokeapi.co/api/v2/pokemon/" + (input + 10)}
                />
              </>
            </thead>
          </table>
        </div>
        <div className="navigation">
          <button onClick={() => setInput(input - 1)}>&#60;</button>
          <button onClick={() => setInput(input + 1)}>&#62;</button>
        </div>
      </div>
    </div>
  );
}

export default App;
