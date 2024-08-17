import style from './InitialMenuScene.module.scss';
import { SpaceShipSelector } from "../../Components/SpaceShipSelector/SpaceShipSelector";
import { MainScene } from '../MainScene/MainScene';
import { GameContext } from '../../contexts/GameContext';
import { useContext, useEffect, useState } from 'react';
import { TutorialScene } from '../TutorialScene/TutorialScene';
import { Ranking } from '../RankingScene/Ranking';
import * as types from "../../contexts/types.js";

export const InitialMenuScene = () => {
  const { gameState, gameDispatch } = useContext(GameContext);
  const [renderMenu, setRenderMenu] = useState(gameState.initial);
  const { showRank } = gameState

  const handleGoClick = () => {
    gameDispatch({ type: "ON" });
  }

  const handleRankClick = () => {
    gameDispatch({ type: showRank ? types.RANK_MENU_CLOSE : types.RANK_MENU_OPEN });
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRenderMenu(gameState.initial);
    }, gameState.initial ? 0 : 2000);

    return () => clearTimeout(timeout);
  }, [gameState.initial]);

  return (
    <div className={`${style['container']}`}>
      {renderMenu ?
        <div className={`${style['menu-screen']}`} style={{ top: gameState.initial ? 0 : "-100vh" }}>
          <h1 className={`${style['title']}`}>SPACE WARRIOR</h1>
          {showRank ?
            <Ranking /> :
            <SpaceShipSelector />
          }
          <div style={{
            width: "100%",
            textAlign: "center",
            paddingBottom: 16,
            gap: 8,
            display: "flex",
            justifyContent: "center",
            position: 'absolute',
            bottom: 0
          }}>
            <button
              className={`${style['start-button']}`}
              onClick={handleGoClick}
            >GO GO GO!</button>
            <button
              className={`${style['start-button']}`}
              onClick={handleRankClick}
            >{showRank ? "MENU" : "RANK"}</button>
          </div>
          <footer style={{ position: "absolute", bottom: 0 }}>
            <div>
              &copy; copyrigths -- feito por <a href="https://ethereal-argon-427820-m6.web.app/">Priscila T.</a> 2023
              <a href='https://ethereal-argon-427820-m6.web.app/'> - Contact me</a>
            </div>
          </footer>
        </div> :
        <TutorialScene />
      }
      <MainScene />
    </div>
  )
}
