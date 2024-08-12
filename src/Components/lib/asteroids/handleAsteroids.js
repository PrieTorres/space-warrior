import { copyAsteroid } from "../../../gameAssets/functional/Sprites/asteroids/createAsteroids.js";
import * as helper from "../helper/helper.js";
import { cloneDeep } from 'lodash';

export const mitoseTheAsteroid = (asteroid) => {
  const infoAsteroid = {
    ...asteroid,
    active: true,
    width: asteroid.width / 1.5,
    height: asteroid.height / 1.5,
    vel: asteroid.vel / 2,
  };
  const parentXPosition = asteroid.position.x;
  const mitosedAsteroids = [];

  let leftAsteroidX = parentXPosition - asteroid.width / 2;
  let rightAsteroidX = parentXPosition + asteroid.width / 2;

  const maxRightPos = window.innerWidth - (infoAsteroid.width / 2);

  if(leftAsteroidX < 0) leftAsteroidX = 0;
  if(rightAsteroidX > maxRightPos) rightAsteroidX = maxRightPos;

  mitosedAsteroids.push(
    copyAsteroid({
      ...cloneDeep(infoAsteroid),
      finalCordinates: {
        x: leftAsteroidX,
        y: asteroid.finalCordinates.y,
      },
    }),
  );

  mitosedAsteroids.push(
    copyAsteroid({
      ...cloneDeep(infoAsteroid),
      finalCordinates: {
        x: rightAsteroidX,
        y: asteroid.finalCordinates.y,
      },
    }),
  );

  return mitosedAsteroids;
};

export const calcShotOnAsteroidRange = (shot, asteroids) => {
  for (let indexAsteroid = 0; indexAsteroid <= asteroids.length; indexAsteroid++) {
    const asteroid = asteroids[indexAsteroid];
    let asteroidsToAdd;

    if (helper.calcCollapse(asteroid, shot) && shot.active) {
      asteroid.active = false;
      asteroid.health -= shot.damage;

      if (asteroid.health >= 1) {
        asteroidsToAdd = mitoseTheAsteroid(asteroid);
      }

      return { collapsed: true, asteroidsToAdd };
    };

  };

  return {};
};

export const moveAsteroids = ({ asteroids, takeHit }) => {
  const _asteroids = helper.filterActives(asteroids);

  for (let indexAster = 0; indexAster <= _asteroids.length; indexAster++) {
    const asteroid = _asteroids[indexAster];

    if (asteroid?.move) {
      asteroid.move({
        finalCb: () => {
          asteroid.active = false;

          takeHit(asteroid);
        }
      });
    }
  }
}

export const drawAsteroids = ({ asteroids, canvasCtx }) => {
  const _asteroids = helper.filterActives(asteroids);

  for (const asteroid of _asteroids) {
    if (asteroid?.active) asteroid.draw(canvasCtx);
  }
}
