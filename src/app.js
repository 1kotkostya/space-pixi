import './styles.css'
import { Application, Assets } from 'pixi.js'
import { Scene } from './Scene'

(async () => {
  const app = new Application()

  await app.init({
    autoDensity: true,
    resolution: window.devicePixelRatio ?? 1,
    width: 1280,
    height: 720,
    resizeTo: window
  })

  document.body.appendChild(app.canvas)

  await Assets.load([
    {
      alias: 'ship',
      src: 'assets/ship.png'
    },
    {
      alias: 'invader',
      src: './assets/invader.png'
    },
    {
      alias: 'mainInvader',
      src: './assets/mainInvader.png'
    },
    {
      alias: 'star',
      src: './assets/star.png'
    }
  ])

  const scene = new Scene()
  scene.initScene(app)
})()
