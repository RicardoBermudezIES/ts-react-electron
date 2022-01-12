/* eslint-disable promise/always-return */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ipcRenderer } from 'electron';
import { useCallback, useEffect, useState } from 'react';
import useCloseSession from './useCloseSession';

const ipc = ipcRenderer;

export default function usePuntos() {
  const { CallbackCloseSession } = useCloseSession();

  const [puntos, setPuntos] = useState({
    cantidadPuntosDisponibles: 0,
    cantidadPuntosRedimidos: 0,
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

      ipc
        .invoke('visualizarPuntos', args)
        .then((res) => {
          if (res?.error === 'No se conecto al servidor') {
            console.log(res);
            return;
          }
          if (res?.statusDTO?.code === '38') {
            CallbackCloseSession();
            return;
          }
          if (res?.statusDTO?.code === '00') {
            localStorage.setItem(
              'puntos',
              JSON.stringify({
                cantidadPuntosDisponibles: res.cantidadPuntosDisponibles,
                cantidadPuntosRedimidos: res.cantidadPuntosRedimidos,
              })
            );
            setPuntos({
              cantidadPuntosDisponibles: res.cantidadPuntosDisponibles,
              cantidadPuntosRedimidos: res.cantidadPuntosRedimidos,
            });
          }
        })
        .catch((err) => {
          if (err?.error === 'No se conecto al servidor') {
            console.log(err);
          }
        });
    }
  };

  const callback = useCallback(
    () => setInterval(() => sendPuntos(), 1000 * 30),
    []
  );

  useEffect(() => {
    callback();
    return () => {
      clearInterval(callback());
    };
  }, []);

  useEffect(() => {
    sendPuntos();
    return () =>
      setPuntos({
        cantidadPuntosDisponibles: 0,
        cantidadPuntosRedimidos: 0,
      });
  }, []);

  return { puntos };
}
