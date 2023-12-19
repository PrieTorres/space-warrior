import { ShotTypes } from "../shots/shotTypes";
import { Sprite } from "../mainSprite";

export class SpaceShipSprite extends Sprite {
  constructor({
    damage,
    position,
    width,
    height,
    imageSrc,
    shotType = "default",
    maxPositions,
    vel,
    munition,
    initialMunition,
    cooldown,
  }) {
    super({
      position,
      width,
      height,
      imageSrc,
    });

    this.damage = damage;
    this.isAnimating = false;
    this.shots = [];
    this.shotType = shotType;
    this.maxPositions = maxPositions;
    this.vel = vel;
    this.active = true;
    this.munition = munition;
    this.initialMunition = initialMunition;
    this.cooldown = cooldown;
  }

  move({ top = 0, bottom = 0, right = 0, left = 0, canvasCtx }) {
    if (!this.active) return;
    if (
      this.position.x + right + this.width - this.width / 3 <=
      this.maxPositions.x
    ) {
      this.position.x += right;
    }

    if (this.position.x - left >= 0 - this.width / 3) this.position.x -= left;
    if (this.position.y + bottom + this.height / 2 <= this.maxPositions.y)
      this.position.y += bottom;
    if (this.position.y - top >= 0 - this.height / 2) this.position.y -= top;

    if (this.isLoaded) {
      this.draw(canvasCtx);
    }
  }

  shoot(type) {
    const shots = ShotTypes[type || this.shotType].getSprite(this);

    shots.forEach((shot) => {
      shot.move({});
    });

    return shots
  }
};
