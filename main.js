/** Purpose of logic within this file will setup gui components and display the main hourglass gui window.
 *  @author Richard Salas
 */
const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const path = require("path");
const url = require("url");
const fs = require("fs");
const ICON_PATH = './icons/sandy-glass.png';
let child;

//setting up right-click menu
let menu = Menu.buildFromTemplate([
    {
        label: 'Settings...',
        accelerator: 'CommandOrControl+D',
        role: 'settings',
        click() {
            timeglassWin.webContents.send('get-and-opensettings');
        }//end function
    },
    { type: 'separator' },
    {
        label: 'Exit',
        accelerator: 'CommandOrControl+X',
        role: 'exit',
        click() { 
            timeglassWin.webContents.send('save-state', timeglassWin.getPosition());
            app.quit();
         }//end function
    },
    { type: 'separator' },
    {
        label: 'Reset/Reload (DevOnly)',
        role: 'Reset Settings',
        click() {//created this for development ONLY remove when complete
            timeglassWin.webContents.send('reset-settings');
            timeglassWin.reload();
         }//end function
    },
    { type: 'separator' },
    {//created this for development ONLY remove when complete
        label: 'Show Window (DevOnly)',
        role: 'show',
        click() {
            console.log('timeglassWin.isVisible()=',timeglassWin.isVisible());
            while(!timeglassWin.isVisible()){
                timeglassWin.show();
            }//end while
         }//end function
    },
    { type: 'separator' },
    {
        label: 'About (Coming Soon)',
        accelerator: 'CommandOrControl+A',
        role: 'about'
    }
]);

/**
 * Creates the main window.
 */
function createWindow() {
    timeglassWin = new BrowserWindow({ icon: ICON_PATH, transparent: true, 
        width: 750,
        height: 510, 
        maximizable: false,
        minimizable: false,
        fullscreenable: false,
        frame: false, 
        show: false,
        titleBarStyle: 'hiddenInset', parent: 'top', skipTaskbar: false, autoHideMenuBar: true, resizable: false, webPreferences: { nodeIntegration: true, enableRemoteModule: true } });

    //show splashscreen here
    let loadingWindow = new BrowserWindow({
        width:          700,
        height:         200,
        transparent:    true, // Transparency doesn't work on Linux.
        resizable:      false,
        frame:          false,
        alwaysOnTop:    true,
        hasShadow:      false,
        title:          "Loading ..."
    });
    loadingWindow.loadURL(url.format({
        pathname: path.join(__dirname, './html/splash.html'),
        protocol: 'file',
        slashes: true
    }));

    timeglassWin.loadURL(url.format({
        pathname: path.join(__dirname, './html/sandy-glass.html'),
        protocol: 'file',
        slashes: true
    }));

    timeglassWin.on('closed', () => {
        timeglassWin = null;
        console.log("window was closed");
    })//end method

    let WM_INITMENU = 0x0116;
    timeglassWin.hookWindowMessage(WM_INITMENU, () => {
        timeglassWin.setEnabled(false);
        timeglassWin.setEnabled(true);
        menu.popup();
        console.log("context menu enabled");
    });

    console.log("preventing system contextmenu to display");
    timeglassWin.on("system-context-menu", (event, _point) => {
        event.preventDefault();
    });

    timeglassWin.once('ready-to-show', () => {
        loadingWindow.destroy();
        while(!timeglassWin.isVisible()){
            console.log('timeglassWin.isVisible()=',timeglassWin.isVisible());
            timeglassWin.show();
        }//end while
    });
}//end function

console.log('creating sand-glass window...');
app.on('ready', () => {
    createWindow();
});

/**
 * Opens settings window
 * @param {object} config configuration settings object
 */
function openSettings(config){
    //hide main window
    timeglassWin.webContents.send('save-state', timeglassWin.getPosition());
    //timeglassWin.hide();
        //need to grab module to resize and pixelate the pics correctly.
    //positioning the window
    let x, y;
    const currentWindow = BrowserWindow.getFocusedWindow();
    if (currentWindow) {
        const [currentWindowX, currentWindowY] = currentWindow.getPosition();
        x = currentWindowX + 100;
        y = currentWindowY + 20;
    }//end if

    child = new BrowserWindow({ 
        icon: ICON_PATH, 
        titleBarStyle: 'hiddenInset', 
        frame: false, 
        show: false, 
        x, 
        y, 
        width: 650,
        height: 610, 
        modal: true, 
        parent: timeglassWin, 
        resizable: true, //debug mode
        autoHideMenuBar: true, 
        webPreferences: { 
            nodeIntegration: true, 
            enableRemoteModule: true 
        }
    });
    child.loadURL(url.format({
        pathname: path.join(__dirname, './html/settings.html'),
        protocol: 'file',
        slashes: true
    }));

    child.on('closed', () => {
        timeglassWin.reload();
        while(!timeglassWin.isVisible()){
            console.log('timeglassWin.isVisible()=',timeglassWin.isVisible());
            timeglassWin.show();
        }//end while
        child.destroy();
        child = null;

    })//end method

    child.once('ready-to-show', () => {
        child.show();
    });
}//end fuction

ipcMain.on('initialize', (event, config) => {
    //for testing uncomment:
        // app.quit();
        // return;
    if(!config.dateTime){//date has to exist or settings need to be configured
        openSettings(config);
    }else{
        timeglassWin.setPosition(Number(config.x), Number(config.y));
    }//end if
});
ipcMain.on('open-settings', openSettings);
ipcMain.on('reload-settings', () => child.reload());
ipcMain.on('close-settings', () => child.close());

