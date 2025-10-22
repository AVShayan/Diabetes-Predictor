const {app,BrowserWindow} = require('electron');
const {spawn} = require('child_process');
const path = require('path');

let backendProcess;

function createWindow(){
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    win.loadFile('index.html');
    
    // Start Node inside Electron
    const backendPath = path.join(__dirname,"Node","server.js"); 
    backendProcess = spawn("node",[backendPath],{
        stdio: "inherit",
    });
}

app.whenReady().then(createWindow);

// Kill Node when Electron App is closed
app.on("will-quit",() => {
    if(backendProcess)  backendProcess.kill();
});