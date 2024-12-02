import { collision } from './utils'
import { Invader } from './Invader'
import { Bullet } from './Bullet'
import { Ship } from './Ship'
import { Controller } from './Controller'
import { Timer } from './Timer'
import { addStars } from './addStars'
import { Popup } from './Popup'
import { MainInvader } from './MainInvader'
import { BulletInvader } from './BulletInvader'
import { YOU_LOST, YOU_WIN } from './constants'

export class Scene {
  constructor () {
    this.stageOne = true
  }

  initScene (app) {
    const ship = new Ship()
    const controller = new Controller()
    const bullet = new Bullet()
    const invader = new Invader()
    const scene = new Scene()
    const timer = new Timer()
    const popup = new Popup()

    invader.invader(app)
    bullet.bulletCounter(app)
    bullet.getBullets()
    timer.drawTime(app)

    const stars = addStars(app)
    const starsTwo = addStars(app)
    starsTwo.y = -app.screen.height
    app.stage.addChild(stars, starsTwo)

    const checkCollision = () => {
      const bullets = bullet.getBullets()
      const invaders = invader.getInvaders()
      if (bullets?.[0] && invaders?.[0]) {
        bullets.forEach((b) => {
          invaders.forEach((i) => {
            if (collision(b, i)) {
              invader.destroyInvader(i)
              bullet.destroyBullet(b)
            }
            if (bullet.getBulletLimit() === 0 && invaders?.length > 0) {
              popup.drawPopup(YOU_LOST, app)
              app.ticker.stop()
            }
            if (!invaders.length) {
              popup.drawPopup(YOU_WIN, app)
              app.ticker.stop()
              setTimeout(() => {
                timer.destroyTimer(app)
                ship.destroyShip(app)
                bullet.destroyInScene(app)
                popup.destroyPopup(app)
                this.stageOne = false
                scene.initMainScene(app)
              }, 2000)
            }
          })
        })
      }
    }
    ship.drawShip(app)
    timer.updateTime()
    app.ticker.add((time) => {
      const delta = time.deltaTime * 0.5

      stars.y += delta
      starsTwo.y += delta

      if (stars.y <= -app.screen.height) {
        stars.y += app.screen.height * 2
      }
      if (starsTwo.y <= -app.screen.height) {
        starsTwo.y += app.screen.height * 2
      }
      bullet.updateCounter(app)
      bullet.bulletAnimation()
      checkCollision()
      invader.invadersAnimation(app)
      if (this.stageOne) {
        if (controller.keys.space.pressed) ship.fire(app, bullet)
        if (controller.keys.right.pressed) ship.moveToRight(app)
        else if (controller.keys.left.pressed) ship.moveToLeft()
        else ship.defaultPosition()
      }
      if ((bullet.getBullets()[bullet.getBullets().length - 1] !== undefined &&
          bullet.getBulletLimit() === 0 && bullet.getBullets()[bullet.getBullets().length - 1].position.y < -app.screen.height) || timer.getTime() === 0) {
        popup.drawPopup(YOU_LOST, app)
        app.ticker.stop()
      }
    })
  }

  initMainScene (app) {
    app.ticker.start()
    const ship = new Ship()
    const controller = new Controller()
    const bullet = new Bullet()
    const timer = new Timer()
    const popup = new Popup()
    const mainInvader = new MainInvader()
    const bulletInvader = new BulletInvader()

    const checkCollision = () => {
      const bullets = bullet.getBullets()
      const invader = mainInvader.getMainInvader()
      const invaderPoints = mainInvader.getPoints()
      const bulletInv = bulletInvader.getBullets()
      if (bullets?.[0] && invaderPoints) {
        bullets.forEach((b) => {
          if (collision(b, invader) && invaderPoints === 1) {
            popup.drawPopup(YOU_WIN, app)
            app.ticker.stop()
          }
          if (collision(b, invader)) {
            mainInvader.setPoints()
            bullet.destroyBullet(b)
          }
          bulletInv.forEach((inv) => {
            if (collision(b, inv)) {
              bullet.destroyBullet(b)
              bulletInvader.destroyBulletInv(inv)
            }
          })
        })
      }
      bulletInv.forEach((inv) => {
        if (collision(inv, ship.getShip())) {
          popup.drawPopup(YOU_LOST, app)
          app.ticker.stop()
        }
      })
    }

    bullet.bulletCounter(app)
    bullet.getBullets()
    timer.drawTime(app)
    ship.drawShip(app)
    timer.updateTime()
    mainInvader.mainInvader(app)
    mainInvader.changeDirect()

    app.ticker.add((time) => {
      mainInvader.fire(app, bulletInvader)
      bulletInvader.bulletAnimation()
      mainInvader.getDirection()
      bullet.updateCounter(app)
      bullet.bulletAnimation()
      checkCollision()
      if (controller.keys.space.pressed) ship.fire(app, bullet)
      if (controller.keys.right.pressed) ship.moveToRight(app)
      else if (controller.keys.left.pressed) ship.moveToLeft()
      else ship.defaultPosition()
      if ((bullet.getBullets()[bullet.getBullets().length - 1] !== undefined &&
          bullet.getBulletLimit() === 0 && bullet.getBullets()[bullet.getBullets().length - 1].position.y < -app.screen.height) || timer.getTime() === 0) {
        popup.drawPopup(YOU_LOST, app)
        app.ticker.stop()
      }
    })
  }
}
