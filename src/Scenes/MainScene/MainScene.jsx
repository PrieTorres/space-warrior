import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import style from "./MainScene.module.scss";
import { GameContext } from "../../contexts/GameContext";
import { LevelPass } from "../../Components/LevelPass/LevelPass";
import { useCanvas } from "../../Components/Canvas/useCanvas";
import * as types from "../../contexts/types.js";
import * as handlerSpaceShip from "../../Components/lib/spaceship/handleSpaceShip";
import { PauseScreen } from "../../Components/PauseScreen/PauseScreen.jsx";
import { isTouchDevice, useInitializeHandlers, useResetInfos } from "../../Components/lib/customHooks/initializers";
import { useAsteroidCreation } from "../../Components/lib/customHooks/useAsteroidCreation";
import { useMoveAsteroidsAndShots } from "../../Components/lib/customHooks/useMoveAsteroidsAndShots";
import { useMunitionCooldown } from "../../Components/lib/customHooks/useMunitionCooldown";
import { useLevelUpdater } from "../../Components/lib/customHooks/useLevelUpdater";
import { createSpaceShip } from "../../gameAssets/functional/Sprites/spaceship/createSpaceShip";
import { ShotButton } from "../../Components/mobileControls/ShotButton/ShotButton.jsx";
import { Joystick } from "react-joystick-component";
import { PauseButton } from "../../Components/PauseButton/index.jsx";

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
  const [spaceShip, setSpaceShip] = useState(
    createSpaceShip({
      canvasWidth: gameScreenWidth,
      canvasHeight: gameScreenHeight,
      id: spaceShipId,
    })
  );

  useEffect(() => {
    const isTouchScreen = isTouchDevice();

    if (isTouchScreen) {
      gameDispatch({ type: types.TOUCH_MODE });
    }

    setSpaceShip(
      createSpaceShip({
        canvasWidth: gameScreenWidth,
        canvasHeight: gameScreenHeight,
        id: spaceShipId,
      })
    );
  }, [spaceShipId]);

  useEffect(() => {
    spaceShip.active = !gameState.paused;
  }, [gameState.paused]);

  const [munitionCount, setMunitionCount] = useState(() => spaceShip.initialMunition);

  const gameCanvas = useCanvas(gameScreen, gameScreenHeight, gameScreenWidth);

  const canvasContext = useRef(gameScreen.current?.getContext("2d"));

  useEffect(() => {
    canvasContext.current = gameScreen.current?.getContext("2d");
  }, [gameScreenHeight, gameScreenWidth])

  const setShots = (updatedShots) => { shots.current = updatedShots };
  const handleKeyDown = useCallback((e) => {
    handlerSpaceShip.handleKeyDown(
      e, gameState, spaceShip, gameDispatch,
      () => handlerSpaceShip.handleSpaceShipShot(spaceShip, shots.current, munitionCount, setShots, setMunitionCount)
    );
  }, [gameDispatch, gameState, munitionCount]);

  const handleKeyPress = useCallback((e, canvasCtx) => {
    if (paused) return;

    if (e.x != undefined && e.y != undefined) {
      const xmove = e.x * 1.5 * spaceShip.vel;
      const ymove = e.y * 1.5 * spaceShip.vel;
      let [top, bottom, left, right] = [ymove, ymove * -1, xmove * -1, xmove];

      if (top < 0) top = 0;
      if (bottom < 0) bottom = 0;
      if (left < 0) left = 0;
      if (right < 0) right = 0;

      return spaceShip.move({ top, bottom, left, right });
    }
    handlerSpaceShip.handleKeyPress(e, canvasCtx, spaceShip);
  }, [paused]);

  useResetInfos({ spaceShip, asteroids, shots, gameState, setPoints, gameScreenHeight, gameScreenWidth });
  useAsteroidCreation({ asteroids: asteroids.current, gameScreen, gameScreenWidth, gameScreenHeight, gameState });
  useMoveAsteroidsAndShots({
    asteroids: asteroids.current, spaceShip: spaceShip, shots: shots.current,
    gameState, setPoints, canvasCtx: canvasContext.current, gameScreenWidth, gameScreenHeight, gameDispatch, points
  });

  useInitializeHandlers({ gameScreen, handleKeyDown, handleKeyPress });
  useMunitionCooldown({ gameState, spaceShip: spaceShip, munitionCount, setMunitionCount, setMunitionReload });
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
        <PauseButton pauseFunction={() => {
          gameDispatch({ type: "PAUSE" });
        }} />
      </div>
      {gameState.touchScreen &&
        <div className={`${style["mobile-controls"]}`}>
          <ShotButton shotFunction={() => handlerSpaceShip.handleSpaceShipShot(spaceShip, shots.current, munitionCount, setShots, setMunitionCount)} />
          <Joystick move={(args) => handleKeyPress(args, canvasContext)} size={gameState.joystickSize} />
        </div>
      }
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
