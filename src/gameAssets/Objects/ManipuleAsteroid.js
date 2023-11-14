import { cloneDeep } from 'lodash';
import { AsteroidSprite } from './Sprites';
import { asteroidsTypes } from './asteroidData/asteroidsTypes';
import * as helper from "../../Components/lib/helper/helper";

export const createAsteroid = ({
  gameScreenWidth,
  gameScreenHeight,
  idsAsteroids
}) => {
  const randomType = Math.floor(idsAsteroids.length * Math.random());
  const asteroidData = asteroidsTypes.find(asteroid => asteroid.id === idsAsteroids[randomType]) || asteroidsTypes[0];

  const Asteroid = new AsteroidSprite({
    position: {
      y: 0,
      x: Math.floor(Math.random() * (gameScreenWidth - asteroidData.size)),
    },
    finalCordinates: { y: gameScreenHeight },
    width: asteroidData.size,
    height: asteroidData.size,
    ...asteroidData,
    gameScreenWidth,
    gameScreenHeight,
  });

  return Asteroid;
};

export const copyAsteroid = (asteroid) => {
  const Asteroid = new AsteroidSprite(cloneDeep(asteroid));

  return Asteroid;
};

export const mitoseTheAsteroid = (asteroid, asteroids) => {
  const infoAsteroid = {
    ...asteroid,
    active: true,
    width: asteroid.width / 1.5,
    height: asteroid.height / 1.5,
    vel: asteroid.vel / 2,
  };
  const parentXPosition = asteroid.position.x;

  asteroids.push(
    copyAsteroid({
      ...cloneDeep(infoAsteroid),
      finalCordinates: {
        x: parentXPosition - asteroid.width / 2,
        y: asteroid.finalCordinates.y,
      },
    }),
  );

  asteroids.push(
    copyAsteroid({
      ...cloneDeep(infoAsteroid),
      finalCordinates: {
        x: parentXPosition + asteroid.width / 2,
        y: asteroid.finalCordinates.y,
      },
    }),
  );
};

export const calcShotOnAsteroidRange = (shot, asteroids, setPoints) => {
  for (let indexAsteroid = 0; indexAsteroid <= asteroids.length; indexAsteroid++) {
    const asteroid = asteroids[indexAsteroid];
    let returnedAsteroids;

    if (helper.calcCollapse(asteroid, shot) && shot.active) {
      asteroid.active = false;
      asteroid.health -= shot.damage;
      setPoints((prev) => prev + 1);

      if (asteroid.health >= 1) {
        returnedAsteroids = mitoseTheAsteroid(asteroid, asteroids);
      }

      return { collapsed: true, returnedAsteroids };
    };

  };

  return {};
};
