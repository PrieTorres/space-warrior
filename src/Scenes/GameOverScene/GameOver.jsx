import { useContext, useEffect, useState } from "react";
import style from "./GameOver.module.scss"
import { GameContext } from "../../contexts/GameContext";
import { NameInput } from "../../Components/NameInput/NameInput";
import { LOAD_RANK, LOADING_RANKS, SAVE_RANK, SUCESSFULL_SAVE_RANK } from "../../contexts/types";
import { saveRank } from "../../Components/lib/helper/helper";
import { BaselimeErrorBoundary } from "@baselime/react-rum";

export const GameOver = () => {
  const { gameState, gameDispatch } = useContext(GameContext);
  const [rankName, setRankName] = useState("");

  function goMenu() {
    gameDispatch({ type: SAVE_RANK });
    saveRank({
      name: rankName,
      points: gameState.points,
      ...gameState
    }).then((saved) => {
      gameDispatch({ type: SUCESSFULL_SAVE_RANK });
      gameDispatch({ type: LOADING_RANKS });
      gameDispatch({ type: LOAD_RANK, payload: { rank: [saved] } });
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
    <BaselimeErrorBoundary fallback={<div>Something went wrong, but don't worry this sent a report to the dev that will work on that, ...maybe</div>}>
      <div className={`${style['container']}`}>
        <div className={`${style['main']}`}>
          <h1 className={`${style['game-over-text']}`}>Game Over</h1>
          <p className={`${style['score-text']}`}>Your Score: {gameState.points}</p>
          <NameInput onChange={(name) => setRankName(name)} />
          {
            gameState.touchScreen ?
              <button
                className={`${style["menu-button"]}`}
                onClick={goMenu}
              >
                Save
              </button>
              :
              <div style={{ width: "100%", textAlign: "center", paddingBottom: 10 }}>
                <p className={`${style['info-text']}`}>Press "Enter" to save and go to menu</p>
              </div>
          }
        </div>
      </div>
    </BaselimeErrorBoundary>
  )
};
