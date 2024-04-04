import { useContext, useEffect, useState } from "react";
import style from "./GameOver.module.scss"
import { GameContext } from "../../contexts/GameContext";
import { NameInput } from "../../Components/NameInput/NameInput";

export const GameOver = () => {
  const { gameState, gameDispatch } = useContext(GameContext);
  const [rankName, setRankName] = useState("");

  useEffect(() => {
    const menuFunc = (e) => {
      if (e.key === "Enter") gameDispatch({
        type: "RANK_INPUT",
        payload: { rankName, points: gameState.points }
      });
    };

    window.addEventListener("keydown", menuFunc);
    return () => window.removeEventListener("keydown", menuFunc);
  }, [gameDispatch, gameState.points, rankName]);

  return (
    <div className={`${style['container']}`}>
      <div className={`${style['main']}`}>
        <h1 className={`${style['game-over-text']}`}>Game Over</h1>
        <p className={`${style['score-text']}`}>Your Score: {gameState.points}</p>
        <NameInput onChange={(name) => setRankName(name)} />
        <p className={`${style['info-text']}`}>Press "Enter" to go to menu</p>
      </div>
    </div>
  )
};
