import { useEffect } from "react";
import { inactiveAll } from "../helper/helper.js";
import { createSpaceShip } from "../../../gameAssets/functional/Sprites/spaceship/createSpaceShip.js";

export const useInitializeHandlers = ({handleKeyDown, handleKeyPress }) => {
  useEffect(() => {
    const handleDown = (e) => handleKeyDown(e);
    const handlePress = (e) => handleKeyPress(e);

    window.addEventListener("keydown", handleDown);
    window.addEventListener("keypress", handlePress);

    return () => {
      window.removeEventListener("keydown", handleDown);
      window.removeEventListener("keypress", handlePress);
    };
  }, [handleKeyDown, handleKeyPress]);
};

export const isTouchDevice = () => {
  let isTouch = false;
  if(window.matchMedia("(pointer: coarse)").matches) {
    isTouch = true;
  }

  return isTouch;
}

export const useDetectDevice = ({}) => {

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

