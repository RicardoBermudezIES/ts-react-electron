import { ipcRenderer } from 'electron';
import { useEffect, useState } from 'react';
import useCloseSession from './useCloseSession';

const ipc = ipcRenderer;

export default function usePuntos() {
  const { CloseSession } = useCloseSession();

  const [puntos, setPuntos] = useState({
    cantidadPuntosDisponibles: null,
    cantidadPuntosRedimidos: null,
  });

  const sendPuntos = () => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const authConfig = JSON.parse(localStorage.getItem('authConfig'));
    const localMaquina = localStorage.getItem('maquina');
    const localCasino = localStorage.getItem('casino');
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const localToken = localStorage.getItem('token');
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const user = JSON.parse(localStorage.getItem('user'));
    const args = {
      host: authConfig?.host,
      casino: localCasino,
      maquina: localMaquina,
      numeroDocumento: user?.numeroDocumento,
      token: localToken,
    };
    if (user !== null) {
      ipc.send('visualizarPuntos', args);
    }
  };

  useEffect(() => {
    const myInterval = setInterval(() => sendPuntos(), 1000 * 30);
    myInterval;
    return () => {
      clearInterval(myInterval);
    };
  }, []);

  useEffect(() => {
    sendPuntos();
  }, []);

  const getPuntos = () => {
    ipc.on('visualizarPuntos', (event, arg) => {
      if (arg?.statusDTO?.code === '38') {
        CloseSession();
      }
      if (arg?.statusDTO?.code === '00') {
        localStorage.setItem(
          'puntos',
          JSON.stringify({
            cantidadPuntosDisponibles: arg.cantidadPuntosDisponibles,
            cantidadPuntosRedimidos: arg.cantidadPuntosRedimidos,
          })
        );
        setPuntos({
          cantidadPuntosDisponibles: arg.cantidadPuntosDisponibles,
          cantidadPuntosRedimidos: arg.cantidadPuntosRedimidos,
        });
      }
    });
  };

  useEffect(() => {
    getPuntos();
  }, []);
  return { puntos };
}
