import { useContext, useRef, useEffect, useCallback } from "react";
import style from "./Ranking.module.scss"
import { GameContext } from "../../contexts/GameContext";
import { getRanks } from "../../firestore_utils";

export const Ranking = () => {
  const { gameState, gameDispatch } = useContext(GameContext);
  const { ranks } = gameState;
  const container = useRef(null);

  const getRanking = useCallback(() => {
    return new Promise(async (resolve) => {
      try {
        const data = await getRanks();
        gameDispatch({
          type: "LOAD_RANK",
          payload: { rank: data }
        });
        return resolve([...data]);
      } catch (err) {
        console.error(err);
        return resolve([]);
      }
    });
  }, [])

  useEffect(() => {
    getRanking();
  }, []);

  return (
    <div className={`${style['container']}`}>
      <div ref={container}>
        {ranks.sort((a, b) => b?.points - a?.points).map((rankData, i) => (
          <div className={`${style['rank-input']}`}>
            <div className={`${style['rank-name']}`}>{rankData.rankName}</div>
            <div className={`${style['dots']}`}></div>
            <div className={`${style['rank-points']}`}>{rankData.points}</div>
          </div>
        ))}
      </div>
    </div>
  )
};
