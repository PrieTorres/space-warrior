import { useEffect } from "react";
import { CONST } from "../../../gameAssets/Objects/Global";
import { drawAsteroids, moveAsteroids } from "./handleAsteroids";
import { drawShots, moveShots } from "./handleShots";
import * as types from "../../../contexts/types";

const fillCanvas = (c, gameScreenWidth, gameScreenHeight) => {
  c.clearRect(0, 0, gameScreenWidth, gameScreenHeight);
};

const drawEverything = ({ canvasCtx, gameState, gameScreenWidth, gameScreenHeight, spaceShip, asteroids, shots }) => {
  if (gameState.paused) return;
  if (!canvasCtx) return;

  fillCanvas(canvasCtx, gameScreenWidth, gameScreenHeight);

  drawAsteroids({ asteroids, canvasCtx });
  drawShots({ shots, canvasCtx });

  spaceShip.draw(canvasCtx);
};

const moveEverything = ({ asteroids, shots, takeHit, setPoints }) => {
  moveAsteroids({ asteroids, takeHit });
  moveShots({ asteroids, shots, setPoints });
};

const takeHit = (asteroid, points, gameState, gameDispatch) => {
  if ((gameState.health - asteroid.health) > 0) {
    gameDispatch({ type: types.LOSE_LIFE, payload: asteroid.health });
  } else {
    gameDispatch({ type: types.GAME_OVER, payload: points });
  }
};

export const useMoveAsteroidsAndShots = ({ asteroids, shots, gameState, setPoints, gameScreen, gameScreenWidth, gameScreenHeight, spaceShip, points, gameDispatch }) => {
  useEffect(() => {
    const canvasCtx = gameScreen?.current?.getContext("2d");

    const interval = setInterval(() => {
      if (gameState.paused) return;
      moveEverything({asteroids, shots, takeHit: () => takeHit({asteroids, points, gameState, gameDispatch}), setPoints});
      drawEverything({ canvasCtx, gameState, gameScreenWidth, gameScreenHeight, spaceShip, asteroids, shots });
    }, CONST.defaultInterval);

    return () => {
      clearInterval(interval);
    };
  }, [asteroids, shots, gameState.paused, setPoints, gameScreen, gameState, gameScreenWidth, gameScreenHeight, spaceShip, points, gameDispatch]);
};
