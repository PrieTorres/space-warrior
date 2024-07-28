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
      //TODO: logic save in localstorage on error gameDispatch({ type: {} })
      console.error(err);
      console.log(err);
      return err;
    }
  }

  function goMenu() {
    saveRank({ name: rankName, points: gameState.points });
    gameDispatch({
      type: "RANK_INPUT",
      payload: { rankName, points: gameState.points, insertedDate: new Date() }
    });
  }

  useEffect(() => {
    const menuFunc = (e) => {
      if (e.key === "Enter" && gameState.gameOver) {
        goMenu();
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
        <div style={{ width: "100%", textAlign: "center", paddingBottom: 10 }}>
          <p className={`${style['info-text']}`}>Press "Enter" to go to menu</p>
        </div>
        {
          gameState.touchScreen ?
            <button
              className={`${style["menu-button"]}`}
              onClick={goMenu}
            >
              Menu
            </button>
            : undefined
        }
      </div>
    </div>
  )
};
