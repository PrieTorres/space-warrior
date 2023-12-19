import { Sprite } from "../mainSprite";

export class AsteroidSprite extends Sprite {
  constructor(props) {
    super(props);
    this.cbFalling = props.cbFalling;
    this.cbEndFall = props.cbEndFall;
    this.finalCordinates = props.finalCordinates;
    this.vel = props.vel;
    this.damage = props.damage;
    this.isAnimating = false;
    this.active = true;
    this.health = props.health;
    this.type = props.type;
    this.gameScreen = {
      width: props.gameScreenWidth,
      height: props.gameScreenHeight,
    };
    this.image.onload = () => {
      this.isLoaded = true;
    };
  }

  clearCanvas(c) {
    c.clearRect(
      this.position.x,
      this.position.y - this.vel,
      this.width,
      this.height,
    );
  }

  move({ finalPositionX, finalPositionY, cb, finalCb }) {
    if (!finalPositionX) finalPositionX = this.finalCordinates.x;
    if (!finalPositionY) finalPositionY = this.finalCordinates.y;

    switch (this.type) {
      case "ZIGZAG":
        if (this.onEndSide === "right" || this.finalCordinates.x === undefined) finalPositionX = 0;
        if (this.onEndSide === "left" || this.finalCordinates.x === undefined) finalPositionX = this.gameScreen.width;

        this.onEndSide = undefined;

        super.move({ finalPositionX, finalPositionY, cb, finalCb });
        break;
      default:
        super.move({ finalPositionX, finalPositionY, cb, finalCb });
        break;
    }
  }

  draw(c) {
    if (this.isLoaded)
      c.drawImage(
        this.image,
        this.position.x - this.width / 2,
        this.position.y - this.height / 2,
        this.width,
        this.height,
      );
  }
};
