import { filterActives } from "../helper/helper";

export const handleSpaceShipShot = ({ spaceShip, shots, munitionCount, setShots, setMunitionCount }) => {
  if (munitionCount > 0) {
    const shot = spaceShip.shoot();
    const updatedShots = filterActives(shots);

    updatedShots.push(...shot);
    setShots(updatedShots);

    setMunitionCount((prev) => (prev -= 1));
  }
}

export const handleKeyDown = (e, gameState, spaceShip, gameDispatch, shotFunction) => {
  if (e.Code === "p" || e.key === "p") {
    spaceShip.active = gameState.paused;
    gameDispatch({ type: "PAUSE" });
  }

  if (gameState.paused) return;

  if (e.Code === "Space" || e.key === " " || e.keyCode === 32) {
    shotFunction();
  }
};

export const handleKeyPress = (e, canvasCtx, spaceShip) => {
  if (e.key === "w" || e.key === "ArrowUp") {
    const upInterval = setInterval(() => {
      spaceShip.move({ top: spaceShip.vel, canvasCtx });
    }, 25);

    window.addEventListener("keyup", (upKeyEvent) => {
      if (upKeyEvent.key === e.key) {
        clearInterval(upInterval);
      }
    });
  }
  if (e.key === "s" || e.key === "ArrowDown") {
    const downInterval = setInterval(() => {
      spaceShip.move({ bottom: spaceShip.vel, canvasCtx });
    }, 25);

    window.addEventListener("keyup", (upKeyEvent) => {
      if (upKeyEvent.key === e.key) {
        clearInterval(downInterval);
      }
    });
  }
  if (e.key === "d" || e.key === "ArrowRight") {
    const rightInterval = setInterval(() => {
      spaceShip.move({ right: spaceShip.vel, canvasCtx });
    }, 25);

    window.addEventListener("keyup", (upKeyEvent) => {
      if (upKeyEvent.key === e.key) {
        clearInterval(rightInterval);
      }
    });
  }
  if (e.key === "a" || e.key === "ArrowLeft") {
    const letfInterval = setInterval(() => {
      spaceShip.move({ left: spaceShip.vel, canvasCtx });
    }, 25);

    window.addEventListener("keyup", (upKeyEvent) => {
      if (upKeyEvent.key === e.key) {
        clearInterval(letfInterval);
      }
    });
  }
};