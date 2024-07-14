import { useContext, useRef, useCallback, useEffect } from "react";
import style from "./Ranking.module.scss"
import { GameContext } from "../../contexts/GameContext";
import axios from "axios";

export const Ranking = () => {
  const { gameState, gameDispatch } = useContext(GameContext);
  const { ranks } = gameState;
  const container = useRef(null);

  const getRanking = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/rank`
      );

      return res;
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  useEffect(() => {
    getRanking.then(data => {
      data?.forEach((rankData) => {
        const { name, points, insertedDate } = rankData;

        gameDispatch({
          type: "RANK_INPUT",
          payload: { rankName: name, points: points, insertedDate }
        });
      });
    })
  }, [gameDispatch]);

  const getRaknDisplay = (name, points, containerWidth, padding = 0) => {
    let rankDisplay = `${name}`;
    let maxLength = `${points}`.length + ((containerWidth - padding * 2) / 12);
    for (let i = name.length; i < maxLength; i++) {
      rankDisplay += ".";
    }
    rankDisplay += points;

    return rankDisplay
  };

  return (
    <div className={`${style['container']}`}>
      <div ref={container} style={{ padding: 20 }}>
        {ranks.map((rankData, i) => (
          <div key={i}>{getRaknDisplay(rankData.rankName, rankData.points, container.current ? container.current.offsetWidth : window.innerWidth, 20)}</div>
        ))}
      </div>
    </div>
  )
};
