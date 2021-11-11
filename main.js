const { app, Tray, Menu, clipboard } = require('electron')
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

const createMenu = () => {
  const menu = Menu.buildFromTemplate([
    {
      label: 'Quit',
      click() {
        app.quit()
      },
      accelerator: 'CommandOrControl+Q',
    }
  ])

  tray.setContextMenu(menu)
}

app.dock.hide()

app.whenReady().then(() => {
  createTray()
  // createMenu()
})
