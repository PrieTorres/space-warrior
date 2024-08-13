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

export const handleKeyPress = (e, spaceShip) => {
  const directions = {
    w: { axis: 'top', key: 'w' },
    ArrowUp: { axis: 'top', key: 'ArrowUp' },
    s: { axis: 'bottom', key: 's' },
    ArrowDown: { axis: 'bottom', key: 'ArrowDown' },
    d: { axis: 'right', key: 'd' },
    ArrowRight: { axis: 'right', key: 'ArrowRight' },
    a: { axis: 'left', key: 'a' },
    ArrowLeft: { axis: 'left', key: 'ArrowLeft' },
  };

  const activeIntervals = spaceShip.activeIntervals ?? {};

  const startMovement = (axis) => {
    if (!activeIntervals[axis]) {
      activeIntervals[axis] = setInterval(() => {
        spaceShip.move({ [axis]: spaceShip.vel });
        spaceShip.activeIntervals = activeIntervals;
      }, 25);
    }
  };

  const stopMovement = (axis) => {
    clearInterval(activeIntervals[axis]);
    delete activeIntervals[axis];
    spaceShip.activeIntervals = activeIntervals;
  };

  const direction = directions[e.key?.toLowerCase()];
  if (direction) {
    startMovement(direction.axis);

    const handleKeyUp = (upKeyEvent) => {
      if (upKeyEvent.key?.toLowerCase() === direction.key?.toLowerCase()) {
        stopMovement(direction.axis);
        window.removeEventListener('keyup', handleKeyUp);
      }
    };

    window.addEventListener('keyup', handleKeyUp);
  }
};
