import { Container, Graphics, Text } from 'pixi.js'

export class Popup {
  constructor () {
    this.popupContainer = new Container()
  }

  drawPopup (text, app) {
    const textContainer = new Text(` ${text} `, {
      fontFamily: 'Arial',
      fontSize: 30,
      fill: 0xffffff
    })
    textContainer.position.x = app.screen.width / 2 - textContainer.width / 2
    textContainer.position.y = app.screen.height / 2 - textContainer.height / 2
    const popupGraphics = new Graphics()
    popupGraphics.fill('0x00000090').rect(0, 0, app.screen.width, app.screen.height).fill()

    popupGraphics.addChild(textContainer)
    this.popupContainer.addChild(popupGraphics)
    app.stage.addChild(this.popupContainer)
  }

  destroyPopup (app) {
    app.stage.removeChild(this.popupContainer)
  }
}
