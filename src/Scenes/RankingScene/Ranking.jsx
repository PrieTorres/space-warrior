import { useContext } from "react";
import style from "./Ranking.module.scss"
import { GameContext } from "../../contexts/GameContext";

export const Ranking = () => {
  const { gameState, gameDispatch } = useContext(GameContext);
  const { ranks } = gameState;

  return (
    <div className={`${style['container']}`}>
      <div>
        {ranks.map(rankData => (
          <div key={Math.random()}>{rankData.rankName}.................{rankData.points}</div>
        ))}
      </div>
    </div>
  )
};
