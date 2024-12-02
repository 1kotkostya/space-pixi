import { Container, Graphics, Sprite } from 'pixi.js'

export class MainInvader {
  constructor () {
    this.invaderContainer = new Container()
    this.invaderSpeed = 1
    this.deviderPoints = 4
    this.changeDirection = true
    this.progressLine = new Graphics()
  }

  mainInvader (app) {
    this.invader = Sprite.from('mainInvader')
    this.invader.width = 100
    this.invader.height = 100
    this.invader.anchor.set(0.5, 0.5)
    this.invaderContainer.x = app.screen.width / 2
    this.invaderContainer.y = 100

    const progress = new Graphics()
    progress.fill('0x00ff00').rect(-40, -80, 100, 20).fill()
    this.progressLine.fill('0x0000FF').rect(-40, -80, 100, 20).fill()
    this.invaderContainer.addChild(this.invader, progress, this.progressLine)
    app.stage.addChild(this.invaderContainer)
  }

  changeDirect () {
    function getRandomInt (max) {
      return Math.floor(Math.random() * max)
    }
    const random = getRandomInt(2000)
    setInterval(() => {
      this.changeDirection = !this.changeDirection
    }, random)
  }

  getDirection () {
    if (this.changeDirection) {
      this.invaderContainer.position.x -= this.invaderSpeed
    } else {
      this.invaderContainer.position.x += this.invaderSpeed
    }
  }

  fire (app, bullet) {
    bullet.createBullet(this.invaderContainer.x, this.invaderContainer.y, app)
  }

  setPoints () {
    this.deviderPoints -= 1
    this.progressLine.width -= 25
    this.progressLine.x -= 10
  }

  getPoints () {
    return this.deviderPoints
  }

  getMainInvader () {
    return this.invader
  }
}
