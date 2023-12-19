import { useEffect } from "react";
import { inactiveAll } from "../helper/helper";
import { createSpaceShip } from "../../../gameAssets/functional/Sprites/spaceship/createSpaceShip";

export const useInitializeHandlers = ({ gameScreen, handleKeyDown, handleKeyPress }) => {
  useEffect(() => {
    const canvasCtx = gameScreen?.current?.getContext("2d");
    const handleDown = (e) => handleKeyDown(e);
    const handlePress = (e) => handleKeyPress(e, canvasCtx);

    window.addEventListener("keydown", handleDown);
    window.addEventListener("keypress", handlePress);

    return () => {
      window.removeEventListener("keydown", handleDown);
      window.removeEventListener("keypress", handlePress);
    };
  }, [gameScreen, handleKeyDown, handleKeyPress]);
};

export const useResetInfos = ({ spaceShip, gameState, asteroids, shots, setPoints, gameScreenWidth, gameScreenHeight }) => {
  useEffect(() => {
    if (gameState.initial === true) {
      setPoints(0);

      inactiveAll(shots.current);
      inactiveAll(asteroids.current);

      asteroids.current = [];
      shots.current = [];
    }

    spaceShip.current = createSpaceShip({
      props: {
        size: 150,
      },
      canvasWidth: gameScreenWidth,
      canvasHeight: gameScreenHeight,
      id: gameState.spaceShipId,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState.initial, gameState.spaceShipId]);
};

