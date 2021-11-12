const { app, Tray, clipboard } = require('electron')
const path = require('path')

// Tray icon
let tray = null
const createTray = () => {
  tray = new Tray(path.join(__dirname, 'iconTemplate@2x.png'))
  tray.setToolTip('TidyPaste')
  tray.on('click', () => {
    const rt = clipboard.readText().toString().trim()
    clipboard.clear()
    clipboard.write({ text: rt })
  })
  tray.on('right-click', () => {
    app.quit()
  })
}

app.dock.hide()

app.whenReady().then(() => {
  createTray()
})

app.on('activate', () => {})
