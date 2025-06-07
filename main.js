const { app, BrowserWindow, Tray, Menu } = require("electron");
const path = require("path");
const AutoLaunch = require("auto-launch");

let mainWindow;
let tray;

const autoLauncher = new AutoLaunch({
  name: "ElectronBackgroundService",
  path: app.getPath("exe"),
});

function createWindow() {
  mainWindow = new BrowserWindow({
    show: false,
    skipTaskbar: true,
    width: 400,
    height: 300,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadFile("index.html");
}

app.whenReady().then(async () => {
  const isEnabled = await autoLauncher.isEnabled();
  if (!isEnabled) {
    await autoLauncher.enable();
  }

  createWindow();

  const versionInfo = require("./build/version");
  tray = new Tray(path.join(__dirname, "trayIcon.png"));
  const contextMenu = Menu.buildFromTemplate([
    { label: "Show App", click: () => mainWindow.show() },
    { label: "Quit", click: () => app.quit() },
  ]);
  tray.setContextMenu(contextMenu);
  tray.setToolTip(
    `Background Service Running MyApp v${versionInfo.version} (${versionInfo.commit})`
  );

  require("./background"); // Start background task
});

app.on("window-all-closed", (e) => {
  e.preventDefault(); // Keep app running in background
});
