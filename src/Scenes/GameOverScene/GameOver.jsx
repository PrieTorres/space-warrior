import { useContext, useEffect, useState } from "react";
import style from "./GameOver.module.scss"
import { GameContext } from "../../contexts/GameContext";
import { NameInput } from "../../Components/NameInput/NameInput";

export const GameOver = () => {
  const { gameState, gameDispatch } = useContext(GameContext);
  const [rankName, setRankName] = useState("");

  const saveRank = async ({ name, points }) => {
    try {
      const res = await fetch(`http://localhost:4000/rank`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, points, insertedDate: new Date() })
      });

      return res;
    } catch (err) {
      console.error(err);
      console.log(err);
      return err;
    }
  }

  useEffect(() => {
    const menuFunc = (e) => {
      if (e.key === "Enter" && gameState.gameOver) {
        saveRank({ name: rankName, points: gameState.points });
        gameDispatch({
          type: "RANK_INPUT",
          payload: { rankName, points: gameState.points, insertedDate: new Date() }
        });
      }
    };

    if (gameState.gameOver) window.addEventListener("keydown", menuFunc);
    return () => window.removeEventListener("keydown", menuFunc);
  }, [gameDispatch, gameState.points, rankName, gameState.gameOver]);

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
