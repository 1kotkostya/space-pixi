import { Container, Sprite } from 'pixi.js'

export class Invader {
  constructor () {
    this.invaderLimit = 6
    this.invaderContainer = new Container()
    this.invaderSpeed = 2.5
  }

  invader (app) {
    for (let i = 0; i < this.invaderLimit; i++) {
      this.invader = Sprite.from('invader')
      this.invader.width = 50
      this.invader.height = 50
      this.invader.anchor.set(0.5, 0.5)
      this.invader.x = (10 + i * 10) * 10
      this.invader.y = 100
      this.invaderContainer.addChild(this.invader)
    }
    app.stage.addChild(this.invaderContainer)
  }

  invadersAnimation (app) {
    if (this.invaderContainer.x <= app.screen.width / 4) {
      this.invaderContainer.x += this.invaderSpeed
    }
  }

  getInvaders () {
    return this.invaderContainer.children
  }

  destroyInvader (child) {
    this.invaderContainer.removeChild(child)
    child.destroy()
  }
}
