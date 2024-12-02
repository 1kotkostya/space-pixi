import { Text } from 'pixi.js'

export class Timer {
  constructor () {
    this.roundTime = 60
    this.currentTime = null
  }

  drawTime (app) {
    this.time = new Text(`Timer: ${this.roundTime}`, {
      fontFamily: 'Arial',
      fontSize: 40,
      fill: 0xffffff
    })
    this.time.position.x = app.screen.width - this.time.width - 20
    this.time.position.y = 20
    this.currentTime = this.roundTime
    app.stage.addChild(this.time)
  }

  updateTime () {
    const interval = setInterval(() => {
      if (this.currentTime > 0) {
        this.currentTime -= 1
        this.time.text = `Timer: ${this.currentTime}`
      } else {
        clearInterval(interval)
      }
    }, 1000)
  }

  getTime () {
    return this.currentTime
  }

  destroyTimer (app) {
    app.stage.removeChild(this.time)
    this.time.destroy({ children: true })
    this.currentTime = null
  }
}
