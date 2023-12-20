import * as helper from "../helper/helper";
import { calcShotOnAsteroidRange } from "../asteroids/handleAsteroids";

export const moveShots = ({ asteroids, shots, setPoints }) => {
  const _asteroids = helper.filterActives(asteroids);
  const _shots = helper.filterActives(shots);

  for (let indexShot = 0; indexShot <= _shots.length; indexShot++) {
    const shot = _shots[indexShot];

    if (shot?.move) {
      shot.move({
        cb: () => {
          const { collapsed, asteroidsToAdd } = calcShotOnAsteroidRange(shot, _asteroids);

          if (collapsed) {
            shot.active = false;
            setPoints(prev => prev + 1);
          }

          if (asteroidsToAdd?.length) {
            asteroids.push(...asteroidsToAdd);
          }
        }
      });
    }
  }
}

export const drawShots = ({ shots, canvasCtx }) => {
  const _shots = helper.filterActives(shots);

  for (const shot of _shots) {
    if (shot?.active) shot.draw(canvasCtx);
  }
}
