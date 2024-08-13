import { useContext, useRef, useEffect, useCallback } from "react";
import style from "./Ranking.module.scss"
import { GameContext } from "../../contexts/GameContext";
import { getRanks } from "../../firestore_utils";

export const Ranking = () => {
  const { gameState, gameDispatch } = useContext(GameContext);
  const { ranks } = gameState;
  const container = useRef(null);
  const pointDiv = useRef(null);
  const nameDiv = useRef(null);

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

  const getRankDisplay = useCallback((name, points, padding = 0) => {
    if (!name || !points) {
      console.error("invalid rank object", { name: name, points: points, padding });
      return "";
    }

    const divSize = 5.61//( 5.61 ?? pointDiv.current?.clientWidth) ?? 5.6;
    const containerWidth = (container.current?.clientWidth ?? window.innerWidth) - padding * 2;

    let rankDisplay = `${name}`;
    const pointsStr = `${points}`;

    const a = [];

    if(nameDiv.current) nameDiv.current.innerHTML = `${rankDisplay}${pointsStr}`;
    const sizeNamePoints = (pointsStr.length + rankDisplay.length) * 5.61  //nameDiv?.current?.clientWidth ?? pointsStr.length + rankDisplay.length;

    let maxLength = (containerWidth / divSize) - sizeNamePoints;

    for (let i = name?.length; i < maxLength; i++) {
      rankDisplay += ".";
      a.push(".")
    }

    let teste = (<div><span>{name}</span>{a.map((b) => <span>{b}</span>)}<span>{points}</span></div>)

    rankDisplay += points;

    return teste
  }, [container.current]);

  return (
    <div className={`${style['container']}`}>
      <div ref={container}>
      <span className={`${style['point-div']}`} ref={pointDiv}>.</span>
      <span className={`${style['point-div']}`} ref={nameDiv}></span>
        {ranks.sort((a, b) => b?.points - a?.points).map((rankData, i) => (
          <div key={i}>{getRankDisplay(rankData.rankName, rankData.points, 20)}</div>
        ))}
      </div>
    </div>
  )
};
