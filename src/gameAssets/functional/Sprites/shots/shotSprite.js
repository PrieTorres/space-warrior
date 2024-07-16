import { CONST } from "../../Global.js";
import { Sprite } from "../mainSprite.js";

export class Shot extends Sprite {
  constructor({
    width,
    height,
    duration,
    color,
    damage,
    position,
    finalCordinates,
    finalSizes,
    vel,
    spaceshipData,
  }) {
    super({ width, height, position, finalCordinates });
    this.duration = duration;
    this.color = color;
    this.damage = damage;
    this.finalSizes = finalSizes;
    this.spaceshipData = spaceshipData;
    this.vel = vel;
    this.active = true;
  }

  draw(c) {
    c.fillStyle = this.color;
    c.beginPath();
    c.arc(
      this.position.x - this.width / 2,
      this.position.y - this.height / 2,
      this.width,
      0,
      2 * Math.PI,
    );
    c.fill();
  }

  moveUntilFinalCordinates(
    finalPositionX = this.finalCordinates.x,
    finalPositionY = this.finalCordinates.y,
  ) {
    if (this.intervalMove) clearInterval(this.intervalMove);

    this.intervalMove = setInterval(() => {
      if (!this.active) {
        this.destroyIntervals();
        return;
      }

      if (finalPositionY >= this.position.y) {
        this.active = false;
        clearInterval(this.intervalMove);
      }

      if (finalPositionY > this.position.y) this.position.y += this.vel;
      if (finalPositionX && finalPositionX > this.position.x)
        this.position.x += this.vel;
      if (finalPositionY < this.position.y) this.position.y -= this.vel;
      if (finalPositionX && finalPositionX < this.position.x)
        this.position.x -= this.vel;
    }, CONST.defaultInterval);
  }

  expandUntilFinalSize(
    c,
    finalWidth = this.finalSizes.width,
    finalHeight = this.finalSizes.height,
  ) {
    if (this.intervalExpand) clearInterval(this.intervalExpand);

    this.intervalExpand = setInterval(() => {
      if (finalWidth > this.width) this.width += this.vel;
      if (finalHeight > this.height) this.height += this.vel;
      if (finalWidth < this.width) this.width -= this.vel;
      if (finalHeight < this.height) this.height -= this.vel;

      this.draw(c);
    }, CONST.velSizingAnimation);
  }

  destroyIntervals() {
    if (this.intervalExpand) clearInterval(this.intervalExpand);
    if (this.intervalMove) clearInterval(this.intervalMove);
    if (this.timeout) clearTimeout(this.timeout);
    if (this.moveTimeOut) clearTimeout(this.moveTimeOut);
  }
}