/* eslint-disable prefer-const */

/* eslint global-require: off, no-console: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build:main`, this file is compiled to
 * `./src/main.prod.js` using webpack. This gives us some performance wins.
 */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { getCasino } from './servicios/getCasinos';
import { getMaquinas } from './servicios/getMaquinas';
import { VincularMaquina } from './servicios/VincularMaquina';
import { fidelzarMaquina } from './servicios/Login';
import { visualizarPuntos } from './servicios/visualizarPuntos';
import { loginSmol } from './servicios/auth';
import { closeSession } from './servicios/closeSession';
import { barServices } from './servicios/bar';
import { comprarPremio } from './servicios/comprarPremio';
import { realizarPeticion } from './servicios/realizarPeticion';
import { listarPeticionesXCliente } from './servicios/listarPeticionxCliente';
import { anularPeticion } from './servicios/anularPeticion';
import { visualizarPuntosDia } from './servicios/visualizarPuntosDia';
import { confirmarPeticion } from './servicios/confirmarPeticion';
import { crearSolicitud } from './servicios/crearSolicitud';
import { todasSolicitudes } from './servicios/todasSolicitudes';

const ipc = ipcMain;

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | undefined;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1280,
    height: 480,
    frame: false,
    kiosk: true,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });

  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  mainWindow.webContents.session.webRequest.onHeadersReceived(
    { urls: ['*://*/*'] },
    (d, c) => {
      if (d?.responseHeaders!['X-Frame-Options']) {
        delete d.responseHeaders['X-Frame-Options'];
      } else if (d?.responseHeaders!['x-frame-options']) {
        delete d.responseHeaders['x-frame-options'];
      }

      c({ cancel: false, responseHeaders: d.responseHeaders });
    }
  );

  mainWindow.on('closed', () => {
    mainWindow = undefined;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

// recibe y envia el token a la configuración
ipc.on('message-config', async (event, arg) => {
  const res = await loginSmol(arg);
  event.reply('message-config', res);
});

// peticiones de tokens
ipc.on('allways-auth', async (event, arg) => {
  let token;
  // eslint-disable-next-line prefer-const
  token = await loginSmol(arg);
  event.reply('allways-auth', token);
});

// peticion para listar casino
ipc.on('get-casinos', async (event, arg) => {
  const casinos = await getCasino(arg);
  event.reply('get-casinos', casinos);
});

// peticion de listar maquinas
ipc.on('get-maquinas', async (event, arg) => {
  const maquinas = await getMaquinas(arg);
  event.reply('get-maquinas', maquinas);
});

// vincularMaquina
ipc.on('VincularMaquina', async (event, arg) => {
  const res = await VincularMaquina(arg);
  event.reply('VincularMaquina', res);
});

// fidelizarMaquina
ipc.on('fidelizarMaquina', async (event, arg) => {
  const res = await fidelzarMaquina(arg);
  console.log(res);
  event.reply('fidelizarMaquina', res);
});

// VisualizarPuntos
ipc.on('visualizarPuntos', async (event, arg) => {
  console.log(arg);
  let res;
  // eslint-disable-next-line prefer-const
  res = await visualizarPuntos(arg);

  if (res.response?.status === 400) {
    event.reply('visualizarPuntos', { Error: 'bad request' });
  }
  if (res.statusDTO?.code !== '00') {
    console.log(res);
    event.reply('visualizarPuntos', res);
  }
  if (res.statusDTO?.code === '00') {
    console.log(res);
    event.reply('visualizarPuntos', res);
  }
});

ipc.on('cerrar-sesion', async (event, arg) => {
  let res;

  res = await closeSession(arg);

  if (res?.response?.status === 400) {
    event.reply('cerrar-sesion', { Error: 'bad request' });
  }

  if (res?.statusDTO?.code !== '00') {
    event.reply('cerrar-sesion', res);
  }

  if (res?.statusDTO?.code === '00') {
    console.log(res, 'cerrar sesion');
    event.reply('cerrar-sesion', res);
  }
});

// consultar bar
ipc.on('bar', async (event, arg) => {
  let res;
  // eslint-disable-next-line prefer-const
  res = await barServices(arg);

  if (res.response?.status === 400) {
    event.reply('bar', { Error: 'bad request' });
  }

  if (res.response?.status === 404) {
    event.reply('bar', { Error: 'Recurso no encontrado' });
  }

  if (res.statusDTO?.code !== '00') {
    console.log(res);
    event.reply('bar', res);
  }
  if (res.statusDTO?.code === '00') {
    console.log(res);
    event.reply('bar', res);
  }
});

// consulta comprar productos
ipc.on('comprar-productos', async (event, arg) => {
  let res;
  // eslint-disable-next-line prefer-const
  res = await comprarPremio(arg);

  if (res.response?.status === 400) {
    event.reply('comprar-productos', { Error: 'bad request' });
  }

  if (res.response?.status === 404) {
    event.reply('bcomprar-productosar', { Error: 'Recurso no encontrado' });
  }

  if (res.statusDTO?.code !== '00') {
    console.log(res);
    event.reply('comprar-productos', res);
  }
  if (res.statusDTO?.code === '00') {
    console.log(res);
    event.reply('comprar-productos', res);
  }
});

// consulta realizar peticion
ipc.on('realizar-peticion', async (event, arg) => {
  let res;
  // eslint-disable-next-line prefer-const
  res = await realizarPeticion(arg);

  if (res.response?.status === 400) {
    event.reply('realizar-peticion', { Error: 'bad request' });
  }

  if (res.response?.status === 404) {
    event.reply('realizar-peticion', { Error: 'Recurso no encontrado' });
  }

  if (res.statusDTO?.code !== '00') {
    event.reply('realizar-peticion', res);
  }
  if (res.statusDTO?.code === '00') {

    event.reply('realizar-peticion', res);
  }
});

// consulta listar peticion por peticiones
ipc.on('listar-peticiones', async (event, arg) => {
  let res;
  // eslint-disable-next-line prefer-const
  res = await listarPeticionesXCliente(arg);

  if (res.response?.status === 400) {
    event.reply('listar-peticiones', { Error: 'bad request' });
  }

  if (res.response?.status === 404) {
    event.reply('listar-peticiones', { Error: 'Recurso no encontrado' });
  }

  if (res.statusDTO?.code !== '00') {
    event.reply('listar-peticiones', res);
  }
  if (res.statusDTO?.code === '00') {
    event.reply('listar-peticiones', res);
  }
});

// consulta anular peticiones
ipc.on('anular-peticiones', async (event, arg) => {
  let res;
  // eslint-disable-next-line prefer-const
  res = await anularPeticion(arg);

  if (res.response?.status === 400) {
    event.reply('anular-peticiones', { Error: 'bad request' });
  }

  if (res.response?.status === 404) {
    event.reply('anular-peticiones', { Error: 'Recurso no encontrado' });
  }

  if (res.statusDTO?.code !== '00') {
    event.reply('anular-peticiones', res);
  }
  if (res.statusDTO?.code === '00') {
    event.reply('anular-peticiones', res);
  }
});

// consulta confirmar peticiones
ipc.on('confirmar-peticiones', async (event, arg) => {
  let res;
  // eslint-disable-next-line prefer-const
  res = await confirmarPeticion(arg);

  if (res.response?.status === 400) {
    event.reply('confirmar-peticiones', { Error: 'bad request' });
  }

  if (res.response?.status === 404) {
    event.reply('confirmar-peticiones', { Error: 'Recurso no encontrado' });
  }

  if (res.statusDTO?.code !== '00') {
    event.reply('confirmar-peticiones', res);
  }

  if (res.statusDTO?.code === '00') {
    event.reply('confirmar-peticiones', res);
  }
});

// VisualizarPuntos
ipc.on('visualizarPuntosxDia', async (event, arg) => {
  let res;
  // eslint-disable-next-line prefer-const
  res = await visualizarPuntosDia(arg);

  if (res.response?.status === 400) {
    event.reply('visualizarPuntosxDia', { Error: 'bad request' });
  }
  if (res.statusDTO?.code !== '00') {
    console.log(res);
    event.reply('visualizarPuntosxDia', res);
  }
  if (res.statusDTO?.code === '00') {
    console.log(res);
    event.reply('visualizarPuntosxDia', res);
  }
});


// soporte ***** crear solicitud
ipc.on('crearSolicitud', async (event, arg) => {
  let res;
  // eslint-disable-next-line prefer-const
  res = await crearSolicitud(arg);

  if (res.response?.status === 400) {
    event.reply('crearSolicitud', { Error: 'bad request' });
  }
  if (res.statusDTO?.code !== '00') {
    console.log(res);
    event.reply('crearSolicitud', res);
  }
  if (res.statusDTO?.code === '00') {
    console.log(res);
    event.reply('crearSolicitud', res);
  }
});

/// todas-solicitudes
ipc.on('todas-solicitudes', async (event, arg) => {
  let res;
  // eslint-disable-next-line prefer-const
  res = await todasSolicitudes(arg);

  if (res.response?.status === 400) {
    event.reply('todas-solicitudes', { Error: 'bad request' });
  }
  if (res.statusDTO?.code !== '00') {
    console.log(res);
    event.reply('todas-solicitudes', res);
  }
  if (res.statusDTO?.code === '00') {
    console.log(res);
    event.reply('todas-solicitudes', res);
  }
});

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.whenReady().then(createWindow).catch(console.log);

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});
