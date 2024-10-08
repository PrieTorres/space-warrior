import { useEffect } from "react";
import { createAsteroid } from "../../../gameAssets/functional/Sprites/asteroids/createAsteroids.js";
import { LEVELS_DATA } from "../../../gameAssets/functional/Global.js";

export const useAsteroidCreation = ({ asteroids, gameScreen, gameScreenWidth, gameScreenHeight, gameState }) => {
  useEffect(() => {
    const levelData = LEVELS_DATA[gameState.level];
    const canvasCtx = gameScreen?.current?.getContext("2d");
    const idsAsteroids = levelData?.typesAsteroids || [1];

    const interval = setInterval(() => {
      if (gameState.paused) return;
      const asteroid = createAsteroid({
        canvasCtx,
        gameScreenWidth,
        gameScreenHeight,
        idsAsteroids,
      });

      asteroids.push(...asteroid);
    }, levelData.respawnAsteroid);

    return () => {
      clearInterval(interval);
    };
  }, [asteroids, gameScreen, gameScreenWidth, gameScreenHeight, gameState.paused, gameState.level]);
};
