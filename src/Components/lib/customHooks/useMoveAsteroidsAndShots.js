import { useEffect } from "react";
import { CONST } from "../../../gameAssets/functional/Global.js";
import { drawAsteroids, moveAsteroids } from "../asteroids/handleAsteroids.js";
import { drawShots, moveShots } from "../shots/handleShots.js";
import * as types from "../../../contexts/types.js";

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

const takeHit = ({ asteroid, points, gameState, gameDispatch }) => {
  if ((gameState.health - asteroid.health) > 0) {
    gameDispatch({ type: types.LOSE_LIFE, payload: asteroid.health });
  } else {
    gameDispatch({ type: types.GAME_OVER, payload: points });
  }
};

export const useMoveAsteroidsAndShots = ({ asteroids, shots, gameState, setPoints, canvasCtx, gameScreenWidth, gameScreenHeight, spaceShip, points, gameDispatch }) => {
  useEffect(() => {
    const interval = setInterval(() => {
      if (gameState.paused) return;
      moveEverything({ asteroids, shots, takeHit: (asteroid) => takeHit({ asteroid, points, gameState, gameDispatch }), setPoints });
      drawEverything({ canvasCtx, gameState, gameScreenWidth, gameScreenHeight, spaceShip, asteroids, shots });
    }, CONST.defaultInterval);

    return () => {
      clearInterval(interval);
    };
  }, [asteroids, shots, gameState.paused, setPoints, canvasCtx, gameState, gameScreenWidth, gameScreenHeight, spaceShip, points, gameDispatch]);
};
