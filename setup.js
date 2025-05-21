const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');
const { setupEnvironment } = require('./config/env-manager');

// Create the application window
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 500,
    height: 500,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // Load the HTML file
  mainWindow.loadFile('config/env-selector.html');

  // Open DevTools for debugging (uncomment if needed)
  // mainWindow.webContents.openDevTools();
}

// Initialize the app
app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

// Handle IPC messages from the renderer
ipcMain.on('set-environment', async (event, env) => {
  try {
    await setupEnvironment(env);
    event.reply('environment-set', { success: true, message: `Environment set to ${env}` });
  } catch (error) {
    event.reply('environment-set', { success: false, message: `Error setting environment: ${error.message}` });
  }
});

ipcMain.on('run-command', (event, { command, env }) => {
  try {
    const isWindows = process.platform === 'win32';
    const prefix = isWindows ? 'set ' : '';
    const nodeEnvSetting = `${prefix}NODE_ENV=${env === 'production' ? 'production' : 'development'}`;
    
    let result;
    switch(command) {
      case 'build':
        result = execSync(`${nodeEnvSetting} && npm run build`).toString();
        break;
      case 'serve':
        result = execSync(`${nodeEnvSetting} && npm run serve`).toString();
        break;
      case 'start':
        result = execSync(`${nodeEnvSetting} && npm run start`).toString();
        break;
      default:
        throw new Error(`Unknown command: ${command}`);
    }
    event.reply('command-result', { success: true, result });
  } catch (error) {
    event.reply('command-result', { success: false, message: error.message });
  }
});
