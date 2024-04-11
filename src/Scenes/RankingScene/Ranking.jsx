import { useContext, useRef, useCallback } from "react";
import style from "./Ranking.module.scss"
import { GameContext } from "../../contexts/GameContext";

export const Ranking = () => {
  const { gameState, gameDispatch } = useContext(GameContext);
  const { ranks } = gameState;
  const container = useRef(null);

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