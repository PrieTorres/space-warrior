import { filterActives } from "../helper/helper.js";

export const handleSpaceShipShot = (spaceShip, shots, munitionCount, setShots, setMunitionCount) => {
  if (munitionCount > 0) {
    const shot = spaceShip.shoot();
    const updatedShots = filterActives(shots);

    updatedShots.push(...shot);
    setShots(updatedShots);

    setMunitionCount((prev) => prev - 1);
  }
}

export const handleKeyDown = (e, gameState, spaceShip, gameDispatch, shotFunction) => {
  if (e.Code?.toLowerCase() === "p" || e.key?.toLowerCase() === "p") {
    spaceShip.active = gameState.paused;
    gameDispatch({ type: "PAUSE" });
  }

  if (gameState.paused) return;

  if (e.Code === "Space" || e.key === " " || e.keyCode === 32) {
    shotFunction();
  }
};

export const handleKeyPress = (e, canvasCtx, spaceShip) => {
  if (e.key === "w"?.toLowerCase() || e.key === "ArrowUp") {
    const upInterval = setInterval(() => {
      spaceShip.move({ top: spaceShip.vel });
    }, 25);

    window.addEventListener("keyup", (upKeyEvent) => {
      if (upKeyEvent.key?.toLowerCase() === e.key?.toLowerCase()) {
        clearInterval(upInterval);
      }
    });
  }
  if (e.key?.toLowerCase() === "s" || e.key === "ArrowDown") {
    const downInterval = setInterval(() => {
      spaceShip.move({ bottom: spaceShip.vel });
    }, 25);

    window.addEventListener("keyup", (upKeyEvent) => {
      if (upKeyEvent.key?.toLowerCase() === e.key?.toLowerCase()) {
        clearInterval(downInterval);
      }
    });
  }
  if (e.key?.toLowerCase() === "d" || e.key === "ArrowRight") {
    const rightInterval = setInterval(() => {
      spaceShip.move({ right: spaceShip.vel });
    }, 25);

    window.addEventListener("keyup", (upKeyEvent) => {
      if (upKeyEvent.key?.toLowerCase() === e.key?.toLowerCase()) {
        clearInterval(rightInterval);
      }
    });
  }
  if (e.key?.toLowerCase() === "a" || e.key === "ArrowLeft") {
    const letfInterval = setInterval(() => {
      spaceShip.move({ left: spaceShip.vel });
    }, 25);

    window.addEventListener("keyup", (upKeyEvent) => {
      if (upKeyEvent.key?.toLowerCase() === e.key?.toLowerCase()) {
        clearInterval(letfInterval);
      }
    });
  }
};
