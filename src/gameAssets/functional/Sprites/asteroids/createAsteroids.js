import { cloneDeep } from "lodash";
import { AsteroidSprite } from "./asteroidSprite.js";
import { asteroidsTypes } from "./asteroidsTypes.js";

function checkCreateMultipleAsteroids(asteroidToCreate) {
  const extraAsteroids = [];

  if (asteroidToCreate?.quant) {
    for (let i = 1; i < asteroidToCreate.quant; i++) {
      const newAsteroid = copyAsteroid(asteroidToCreate);
      const distanceMainAsterX = Math.ceil(asteroidToCreate.width * i / 2);
      const distanceMainAsterY = Math.ceil(asteroidToCreate.height * i / 2) / 2;

      newAsteroid.position.x += i % 2 === 0 ? (distanceMainAsterX * -1) : distanceMainAsterX;
      newAsteroid.position.y -= distanceMainAsterY;

      extraAsteroids.push(newAsteroid)
    }
  }

  return extraAsteroids;
}

export const createAsteroid = ({
  gameScreenWidth,
  gameScreenHeight,
  idsAsteroids
}) => {
  const randomType = Math.floor(idsAsteroids.length * Math.random());
  const asteroidData = asteroidsTypes.find(asteroid => asteroid.id === idsAsteroids[randomType]) || asteroidsTypes[0];
  const w = asteroidData.width ?? asteroidData.size;
  const h = asteroidData.height ?? asteroidData.size;
  const maxScreen = gameScreenWidth - w;

  const xPos = Math.floor(Math.random() * (maxScreen));
  if (asteroidData.range) {
    const finalCordinates = {
      x: xPos + asteroidData.range,
      y: gameScreenHeight,
    };

    const rangePosition = {
      left: xPos,
      right: xPos + asteroidData.range
    }

    asteroidData.finalCordinates = finalCordinates;
    asteroidData.rangePosition = rangePosition;
  }

  const dataToSprite = {
    position: {
      y: 0,
      x: xPos,
    },
    finalCordinates: { y: gameScreenHeight },
    width: w,
    height: h,
    ...asteroidData,
    gameScreenWidth,
    gameScreenHeight,
  }

  const Asteroid = new AsteroidSprite(dataToSprite);

  const otherAsteroids = checkCreateMultipleAsteroids(dataToSprite);

  return [Asteroid, ...otherAsteroids];
};

export const copyAsteroid = (asteroid) => {
  const Asteroid = new AsteroidSprite(cloneDeep(asteroid));

  return Asteroid;
};
