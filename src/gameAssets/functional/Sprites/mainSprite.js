export class Sprite {
  constructor({ position, imageSrc, width, height, finalCordinates }) {
    this.initialPosition = { ...position };
    this.position = position;
    this.width = width;
    this.height = height;
    this.finalCordinates = finalCordinates;
    this.image = new Image(1000, 1000);
    this.image.src = imageSrc;
    this.imageSrc = imageSrc;
    this.image.onload = () => {
      this.isLoaded = true;
    };
  }

  draw(c) {
    if (this.isLoaded)
      c.drawImage(
        this.image,
        this.position.x,
        this.position.y,
        this.width,
        this.height,
      );
  }

  move({ finalPositionX, finalPositionY, cb, finalCb }) {
    if (!finalPositionX) finalPositionX = this.finalCordinates.x;
    if (!finalPositionY) finalPositionY = this.finalCordinates.y;

    const goingDown = this.initialPosition.y < finalPositionY;
    const goingRigth = this.initialPosition.x < finalPositionX;
    const xDistanceMove = this.vel;

    if (
      (goingDown && finalPositionY <= this.position.y) ||
      (!goingDown && finalPositionY >= this.position.y)
    ) {
      this.active = false;
      if (finalCb) finalCb();
    }

    if (goingDown && finalPositionY > this.position.y) {
      this.position.y += this.vel;
    } else if (!goingDown && finalPositionY < this.position.y) {
      this.position.y -= this.vel;
    }

    if (
      goingRigth &&
      finalPositionX !== undefined &&
      finalPositionX > this.position.x
    ) {
      this.position.x += xDistanceMove;
      if (this.position.x + xDistanceMove === finalPositionX) this.onEndSide = "right";
    } else if (
      !goingRigth &&
      finalPositionX !== undefined &&
      finalPositionX < this.position.x
    ) {
      this.position.x -= xDistanceMove;
      if (this.position.x - xDistanceMove === finalPositionX) this.onEndSide = "left";
    }

    if (cb) cb();
  }
}