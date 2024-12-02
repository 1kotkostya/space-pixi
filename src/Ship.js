import { Sprite } from 'pixi.js'

export class Ship {
  constructor () {
    this.angle = 0.3
    this.ship = Sprite.from('ship')
  }

  drawShip (app) {
    this.ship.width = 70
    this.ship.height = 70
    this.ship.anchor.set(0.5, 0.5)
    this.ship.x = app.screen.width / 2
    this.ship.y = app.screen.height - this.ship.height
    app.stage.addChild(this.ship)
  }

  moveToLeft () {
    if (this.ship.x < this.ship.width / 2) {
      return this.ship.x
    } else {
      this.ship.x -= 1
      this.ship.rotation = -this.angle
    }
  }

  moveToRight (app) {
    if (this.ship.x > app.screen.width - this.ship.width / 2) {
      return this.ship.x
    } else {
      this.ship.x += 1
      this.ship.rotation = +this.angle
    }
  }

  getShip () {
    return this.ship
  }

  defaultPosition () {
    this.ship.rotation = 0
  }

  fire (app, bullet) {
    if (this.ship.x) {
      bullet.createBullet(this.ship.x, this.ship.y, app)
    }
  }

  destroyShip (app) {
    app.stage.removeChild(this.ship)
    this.ship.destroy()
  }
}
