const { app, Tray, clipboard } = require('electron')
const path = require('path')
const updater = require('./updater')
const isDev = !app.isPackaged

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

// Load electron-reload in dev
if (isDev) {
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
  })
}

// Hide the doc icon
app.dock.hide()

// Load tray and check for updates
app.whenReady().then(() => {
  createTray()
  !isDev && setTimeout(updater, 3000)
})

// Empty event registration to prevent tray garbage collection
app.on('activate', () => {})
