/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ipcRenderer } from 'electron';
import { useCallback, useEffect, useState } from 'react';
import useCloseSession from './useCloseSession';

const ipc = ipcRenderer;

export default function usePuntos() {
  const { CallbackCloseSession } = useCloseSession();

  const [puntos, setPuntos] = useState({
    cantidadPuntosDisponibles: null,
    cantidadPuntosRedimidos: null,
  });

  const sendPuntos = () => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const authConfig = JSON.parse(localStorage.getItem('authConfig')!);
    const localMaquina = localStorage.getItem('maquina');
    const localCasino = localStorage.getItem('casino');
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const localToken = localStorage.getItem('token');
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const user = JSON.parse(localStorage.getItem('user')!);
    const args = {
      host: authConfig?.host,
      casino: localCasino,
      maquina: localMaquina,
      numeroDocumento: user?.numeroDocumento,
      token: localToken,
    };
    if (user !== null) {
      // eslint-disable-next-line no-console
      console.log('pidiendo puntos');

      ipc.send('visualizarPuntos', args);
    }
  };

  const callback = useCallback(
    () => setInterval(() => sendPuntos(), 1000 * 30),
    []
  );

  useEffect(() => {
    const myInterval = callback();
    myInterval;
    return () => {
      clearInterval(myInterval);
    };
  }, [callback]);

  useEffect(() => {
    sendPuntos();
    return () =>
      setPuntos({
        cantidadPuntosDisponibles: null,
        cantidadPuntosRedimidos: null,
      });
  }, []);

  const getPuntos = () => {
    ipc.on('visualizarPuntos', (_event, arg) => {
      if (arg?.statusDTO?.code === '38') {
        CallbackCloseSession();
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

  const callbackGetPuntos = useCallback(getPuntos, [CallbackCloseSession]);

  useEffect(() => {
    callbackGetPuntos();
  }, [callbackGetPuntos]);
  return { puntos };
}
