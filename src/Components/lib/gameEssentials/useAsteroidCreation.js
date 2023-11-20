import { useEffect } from "react";
import { createAsteroid } from "../../../gameAssets/Objects/ManipuleAsteroid";
import { filterActives } from "../helper/helper";
import { LEVELS_DATA } from "../../../gameAssets/Objects/Global";

export const useAsteroidCreation = ({ asteroids, gameScreen, gameScreenWidth, gameScreenHeight, gameState }) => {
  useEffect(() => {
    const levelData = LEVELS_DATA[gameState.level];
    const _asteroids = filterActives(asteroids);
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

      _asteroids.push(asteroid);

      asteroids = _asteroids;
    }, levelData.respawnAsteroid);

    return () => {
      clearInterval(interval);
    };
  }, [asteroids, gameScreen, gameScreenWidth, gameScreenHeight, gameState.paused, gameState.level]);
};
