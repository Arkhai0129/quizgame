import React, { useEffect, useState } from "react";
import "./style.css";

const QuizGame = () => {
  const [box, setBox] = useState([
    "🥳",
    "😍",
    "😍",
    "🧐",
    "🥳",
    "🧐",
    "👽",
    "🤩",
    "🤓",
    "🤗",
    "👽",
    "🤓",
    "🤩",
    "🫣",
    "🫣",
    "🤗",
  ]);
  const [Clicked, setClicked] = useState([]);
  const [matched, setMatched] = useState([]);
  const [gameMessage, setGameMessage] = useState("Match emojis");
  const [score, setScore] = useState(0);
  const [play, setPlay] = useState(false);

  const shuffleArray = (array) => {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const startgame = () => {
    setPlay(true);
  };

  const check = (clickedBox) => {
    if (clickedBox.length === 2) {
      const box1 = box[clickedBox[0]];
      const box2 = box[clickedBox[1]];
      if (box1 === box2) {
        setMatched([...matched, clickedBox[0], clickedBox[1]]);
        setScore(score + 10);
        setClicked([]);
        console.log("matched", matched);
      } else {
        setTimeout(() => {
          setClicked([]);
        }, 1000);
      }
    }
  };

  useEffect(() => {
    if (matched.length === box.length) {
      setGameMessage("You won");
      setTimeout(() => {
        setGameMessage("Match emojis");
        setMatched([]);
        setScore(0);
        setBox(shuffleArray(box));
      }, 2000);
    }
  }, [matched, box.length]);

  const handleClick = (i) => {
    if (!Clicked.includes(i) && Clicked.length < 2) {
      let clickedBox = [...Clicked, i];
      setClicked(clickedBox);
      check(clickedBox);
      console.log(clickedBox);
    }
  };

  return (
    <div className="main-container">
      <h1>{gameMessage}</h1>
      <h2>Score: {score}</h2>
      <div className="sub-container">
        {!play && (
          <button className="startGameButton" onClick={() => startgame()}>
            Play
          </button>
        )}
        {play &&
          box.map((emoji, i) => (
            <div key={i} className="box" onClick={() => handleClick(i)}>
              {Clicked.includes(i) || matched.includes(i) ? emoji : ""}
            </div>
          ))}
      </div>
    </div>
  );
};

export default QuizGame;
