import { Container, Graphics, Text } from 'pixi.js'

export class Bullet {
  constructor () {
    this.timeout = null
    this.bullets = new Container()
    this.bulletSpeed = 1
    this.bulletLimit = 10
    this.counter = null
  }

  createBullet (x, y, app) {
    if (this.timeout) return
    if (!this.bulletLimit) return
    const bullet = new Graphics()
    bullet.fill('0xffff00').circle(x, y, 10).fill()
    this.bullets.children.push(bullet)

    app.stage.addChild(bullet)
    this.bulletLimit -= 1
    this.timeout = setTimeout(() => {
      this.timeout = null
    }, 1000)
  }

  bulletAnimation () {
    this.bullets.children.forEach((bullet) => {
      if (!bullet.destroyed) {
        bullet.position.y -= this.bulletSpeed * 2
      }
    })
  }

  bulletCounter (app) {
    this.counter = new Text(`Bullets: ${this.bulletLimit}`, {
      fontFamily: 'Arial',
      fontSize: 40,
      fill: 0xffffff
    })
    this.counter.position.x = 20
    this.counter.position.y = 20

    app.stage.addChild(this.counter)
  }

  updateCounter (app) {
    this.counter.text = `Bullets: ${this.bulletLimit}`
  }

  getBulletLimit () {
    return this.bulletLimit
  }

  getBullets () {
    return this.bullets.children
  }

  destroyBullet (child) {
    this.bullets.removeChild(child)
    child.clear()
  }

  destroyInScene (app) {
    app.stage.removeChild(this.bullets)
    app.stage.removeChild(this.counter)
  }
}
