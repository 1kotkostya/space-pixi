import { Container, Graphics } from 'pixi.js'

export class BulletInvader {
  constructor () {
    this.timeout = null
    this.bullets = new Container()
    this.bulletSpeed = 1
    this.counter = null
  }

  createBullet (x, y, app) {
    if (this.timeout) return
    const bullet = new Graphics()
    bullet.fill('0xff0000').circle(x, y, 8).fill()
    this.bullets.children.push(bullet)

    app.stage.addChild(bullet)
    this.timeout = setTimeout(() => {
      this.timeout = null
    }, 2000)
  }

  bulletAnimation () {
    this.bullets.children.forEach((bullet) => {
      if (!bullet.destroyed) {
        bullet.position.y += this.bulletSpeed * 2
      }
    })
  }

  getBullets () {
    return this.bullets.children
  }

  destroyBulletInv (child) {
    this.bullets.removeChild(child)
    child.clear()
  }

  destroyInScene (app) {
    app.stage.removeChild(this.bullets)
    app.stage.removeChild(this.counter)
  }
}
