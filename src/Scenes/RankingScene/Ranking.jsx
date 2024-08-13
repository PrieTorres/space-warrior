import { useContext, useEffect, useCallback } from "react";
import style from "./Ranking.module.scss"
import { GameContext } from "../../contexts/GameContext";
import { getRanks } from "../../firestore_utils";
import { LOAD_RANK, LOADING_RANKS } from "../../contexts/types";

export const Ranking = () => {
  const { gameState, gameDispatch } = useContext(GameContext);
  const { ranks } = gameState;

  const getRanking = useCallback(() => {
    return new Promise(async (resolve) => {
      gameDispatch({ type: LOADING_RANKS });
      try {
        const data = await getRanks();
        gameDispatch({
          type: LOAD_RANK,
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
      <div>
        {ranks.sort((a, b) => b?.points - a?.points).map((rankData, i) => (
          <div className={`${style['rank-input']}`} key={rankData?.id ?? i}>
            <div className={`${style['rank-name']}`}>{rankData.rankName}</div>
            <div className={`${style['dots']}`}></div>
            <div className={`${style['rank-points']}`}>{rankData.points}</div>
          </div>
        ))}
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <div className={gameState.loadingRanks || gameState.loadingAddRanks ? `${style['loading']}` : ""}></div>
        </div>
      </div>
    </div>
  )
};
