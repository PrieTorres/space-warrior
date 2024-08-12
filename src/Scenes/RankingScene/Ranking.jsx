import { useContext, useRef, useEffect, useCallback } from "react";
import style from "./Ranking.module.scss"
import { GameContext } from "../../contexts/GameContext";
import { getRanks } from "../../firestore_utils";

export const Ranking = () => {
  const { gameState, gameDispatch } = useContext(GameContext);
  const { ranks } = gameState;
  const container = useRef(null);

  const getRanking = new Promise(async (resolve) => {
    try {
      const data = await getRanks();
      return resolve([...data]);
    } catch (err) {
      console.error(err);
      return resolve([]);
    }
  });

  useEffect(() => {
    getRanking.then(data => {
      gameDispatch({
        type: "LOAD_RANK",
        payload: { rank: data }
      });
    })
  }, [gameDispatch]);

  const getRankDisplay = useCallback((name, points, padding = 0) => {
    if (!name || !points) {
      console.error("invalid rank object", { name: name, points: points, padding });
      return "";
    }

    const containerWidth = (container.current?.offsetWidth ?? window.innerWidth) - padding * 2;
    let rankDisplay = `${name}`;
    let maxLength = (containerWidth / 5.6) - `${points}`.length - rankDisplay.length;

    for (let i = name?.length; i < maxLength; i++) {
      rankDisplay += ".";
    }

    rankDisplay += points;

    return rankDisplay
  }, [container.current]);

  return (
    <div className={`${style['container']}`}>
      <div ref={container}>
        {ranks.sort((a, b) => b?.points - a?.points).map((rankData, i) => (
          <div key={i}>{getRankDisplay(rankData.rankName, rankData.points, 20)}</div>
        ))}
      </div>
    </div>
  )
};
