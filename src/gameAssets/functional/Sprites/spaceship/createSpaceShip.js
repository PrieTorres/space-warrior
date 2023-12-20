import { spaceshipsTypes } from "../spaceship/spaceshipsTypes";
import { SpaceShipSprite } from "../spaceship/spaceShipSprite";

export const createSpaceShip = ({
  props = {},
  canvasWidth = 1000,
  canvasHeight = 1000,
  id = 0,
}) => {
  const spaceShipType = spaceshipsTypes[id];
  const spaceShip = new SpaceShipSprite({
    ...spaceShipType,
    position: {
      x: canvasWidth / 2 - (props.size || 20) / 2,
      y: canvasHeight / 2 + (props.size || 20),
    },
    width: spaceShipType.width || 10,
    height: spaceShipType.height || 10,
    maxPositions: { x: canvasWidth, y: canvasHeight },
    ...props,
  });

  return spaceShip;
};
