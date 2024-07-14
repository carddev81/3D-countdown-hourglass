let { ipcRenderer } = require('electron');
let hgContainer = document.getElementById('sandy3DGlass');
let config = {//default settings
    x: 0,
    y: 0,
    dateTime: undefined,
    sandColor: '#cfcffe',
    frameColor: 'darkorchid'
}
initConfig();//initialize configuration settings using the localStorage available by the browser
//for testing uncomment the following:
//localStorage.clear();
ipcRenderer.send('initialize', config);//send the message
ipcRenderer.on('reset-settings', () => localStorage.clear());
/**
 * Initializes the configuration settings
 */
function initConfig(){
    Object.keys(config).forEach(key => config[key] = localStorage.getItem(key));
}//end function

timeglass3D({
    container: hgContainer,
    date: config.dateTime,
    mode: 'countdown',
    theme: 'dark',
    transparent: true,
    onTableMode: true,
    lookAroundMode: true,
    scale: 1,
    hourglasses: {
        all: {
            sides: {
                material: 'glossy', // Make the framing glossy.
                color: config.frameColor    // Set the color of the framing.
            },
        sands: {
            color: config.sandColor // Set the color of the sand.
            }
        }
    }
}, false, false);

ipcRenderer.on('get-and-opensettings', () => {
    ipcRenderer.send('open-settings', config);
});
ipcRenderer.on('save-state', (event, obj) => {
    localStorage.setItem('x', obj[0]);
    localStorage.setItem('y', obj[1]);
});
