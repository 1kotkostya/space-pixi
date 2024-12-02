export const keyMap = {
  Space: 'space',
  ArrowLeft: 'left',
  ArrowRight: 'right'
}

export class Controller {
  constructor () {
    this.keys = {
      space: { pressed: false, timestamp: 0 },
      right: { pressed: false, timestamp: 0 },
      left: { pressed: false, timestamp: 0 }
    }

    window.addEventListener('keydown', (event) => this.keydownHandler(event))
    window.addEventListener('keyup', (event) => this.keyupHandler(event))
  }

  keydownHandler (event) {
    const key = keyMap[event.code]
    if (!key) return
    this.keys[key].pressed = true
  }

  keyupHandler (event) {
    const key = keyMap[event.code]
    if (!key) return

    this.keys[key].pressed = false
  }
}
