const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
  'electronAPI',
  {
    setEnvironment: (env) => {
      ipcRenderer.send('set-environment', env);
    },
    runCommand: (command, env) => {
      ipcRenderer.send('run-command', { command, env });
    },
    onEnvironmentSet: (callback) => {
      ipcRenderer.on('environment-set', callback);
    },
    onCommandResult: (callback) => {
      ipcRenderer.on('command-result', callback);
    }
  }
);
