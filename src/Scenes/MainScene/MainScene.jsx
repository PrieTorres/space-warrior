import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import style from "./MainScene.module.scss";
import { GameContext } from "../../contexts/GameContext";
import { LevelPass } from "../../Components/LevelPass/LevelPass";
import { useCanvas } from "../../Components/Canvas/useCanvas";
import * as types from "../../contexts/types.js";
import * as handlerSpaceShip from "../../Components/lib/spaceship/handleSpaceShip";
import { PauseScreen } from "../../Components/PauseScreen/PauseScreen.jsx";
import { useInitializeHandlers, useResetInfos } from "../../Components/lib/customHooks/initializers";
import { useAsteroidCreation } from "../../Components/lib/customHooks/useAsteroidCreation";
import { useMoveAsteroidsAndShots } from "../../Components/lib/customHooks/useMoveAsteroidsAndShots";
import { useMunitionCooldown } from "../../Components/lib/customHooks/useMunitionCooldown";
import { useLevelUpdater } from "../../Components/lib/customHooks/useLevelUpdater";
import { createSpaceShip } from "../../gameAssets/functional/Sprites/spaceship/createSpaceShip";

export const MainScene = () => {
  const { gameState, gameDispatch } = useContext(GameContext);
  const { spaceShipId, health, level, paused } = gameState;

  const [points, setPoints] = useState(() => gameState.points);
  const [munitionReload, setMunitionReload] = useState(() => 100);
  const [levelUpAnimation, setLevelUpAnimation] = useState(() => false);

  const gameScreenHeight = window.innerHeight;
  const gameScreenWidth = window.innerWidth;

  const shots = useRef([]);
  const asteroids = useRef([]);
  const gameScreen = useRef(null);
  const damaged = useRef(false);
  const spaceShip = useRef(
    createSpaceShip({
      canvasWidth: gameScreenWidth,
      canvasHeight: gameScreenHeight,
      id: spaceShipId,
    }),
    [spaceShipId],
  );

  const [munitionCount, setMunitionCount] = useState(() => spaceShip.current.initialMunition);

  const gameCanvas = useCanvas(gameScreen, gameScreenHeight, gameScreenWidth);

  const setShots = (updatedShots) => { shots.current = updatedShots };
  const handleKeyDown = useCallback((e) => {
    handlerSpaceShip.handleKeyDown(
      e, gameState, spaceShip.current, gameDispatch,
      () => handlerSpaceShip.handleSpaceShipShot(spaceShip.current, shots.current, munitionCount, setShots, setMunitionCount)
    );
  }, [gameDispatch, gameState, munitionCount]);

  const handleKeyPress = useCallback((e, canvasCtx) => {
    if (paused) return;
    handlerSpaceShip.handleKeyPress(e, canvasCtx, spaceShip.current);
  }, [paused]);

  useResetInfos({ spaceShip, asteroids, shots, gameState, setPoints, gameScreenHeight, gameScreenWidth });
  useAsteroidCreation({ asteroids: asteroids.current, gameScreen, gameScreenWidth, gameScreenHeight, gameState });
  useMoveAsteroidsAndShots({
    asteroids: asteroids.current, spaceShip: spaceShip.current, shots: shots.current,
    gameState, setPoints, gameScreen, gameScreenWidth, gameScreenHeight, gameDispatch, points
  });
  useInitializeHandlers({ gameScreen, handleKeyDown, handleKeyPress });
  useMunitionCooldown({ gameState, spaceShip: spaceShip.current, munitionCount, setMunitionCount, setMunitionReload });
  useLevelUpdater({ gameState, gameDispatch, points, setLevelUpAnimation });

  useEffect(() => {
    damaged.current = true;

    const removeDamageBorder = setTimeout(() => {
      damaged.current = false;
    }, 1000);

    return () => clearTimeout(removeDamageBorder);
  }, [health]);


  useEffect(() => {
    if (!levelUpAnimation) return;
    const timeOut = setTimeout(() => {
      setLevelUpAnimation(false);
      gameDispatch({ type: types.PAUSE });
    }, 1500);

    return () => clearTimeout(timeOut);
  }, [gameDispatch, levelUpAnimation]);

  return (
    <div id="game-main-scene-screen" style={{ overflow: "hidden" }}>
      <div className={`${style["points-counter"]}`}>SCORE: {points}</div>
      <div className={`${style["life-counter"]}`}>
        HEALTH: {health}
      </div>
      <div className={`${style["munition-info"]}`}>
        <div className={`${style["munition-reload"]}`}>{munitionReload}%</div>
        <div className={`${style["munitions-counter"]}`}>
          {new Array(munitionCount).fill("shot").map((munition, i) => (
            <div key={i} className={`${style["munition"]}`}></div>
          ))}
        </div>
      </div>
      <div
        className="game-canvas-container"
        style={{ minHeight: "fit-content", minWidth: "fit-content" }}
      >
        {gameCanvas}
        <div
          className={`${style["glass"]}`}
          style={{
            transition: "box-shadow .5s ease",
            boxShadow: damaged.current
              ? "inset 0 0 5vw 5vh #ff8888"
              : "inset 0 0 5vw 5vh #000",
            fontSize: paused ? "5rem" : 0,
            background: paused ? "#000000a6" : "none",
          }}
        >
          {paused && !gameState.initial && !levelUpAnimation && <PauseScreen goMenuFunc={() => gameDispatch({ type: "RESTART" })} />}
          {levelUpAnimation && <LevelPass show={levelUpAnimation} level={level} secondsToDisplay={2000} />}
        </div>
      </div>
    </div>
  );
};
