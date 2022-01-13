/* eslint-disable promise/always-return */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ipcRenderer } from 'electron';
import { useCallback, useEffect, useState } from 'react';
import { setTimeout } from 'timers';
import useCloseSession from './useCloseSession';

const ipc = ipcRenderer;

export default function usePuntos() {
  const { CallbackCloseSession } = useCloseSession();

  const [puntos, setPuntos] = useState({
    cantidadPuntosDisponibles: 0,
    cantidadPuntosRedimidos: 0,
  });
  const [openPuntosError, setOpenPuntosError] = useState(false);
  const [msnPuntosError, setMsnPuntosError] = useState('');

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const user = JSON.parse(localStorage.getItem('user')!);

  const sendPuntos = () => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const authConfig = JSON.parse(localStorage.getItem('authConfig')!);
    const localMaquina = localStorage.getItem('maquina');
    const localCasino = localStorage.getItem('casino');
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const localToken = localStorage.getItem('token');

    const args = {
      host: authConfig?.host,
      casino: localCasino,
      maquina: localMaquina,
      numeroDocumento: user?.numeroDocumento,
      token: localToken,
    };
    ipc
      .invoke('visualizarPuntos', args)
      .then((res) => {
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
          setMsnPuntosError(err?.error);
          setOpenPuntosError(true);
        }
      });
  };

  const callback = useCallback(sendPuntos, [
    CallbackCloseSession,
    user?.numeroDocumento,
  ]);

  useEffect(() => {
    let id: any;
    if (user !== null) {
      id = setTimeout(() => {
        callback();
      }, 1000 * 60);
    }
    return () => clearInterval(id);
  }, [callback]);

  useEffect(() => {
    if (user !== null) {
      callback();
    }
    return () =>
      setPuntos({
        cantidadPuntosDisponibles: 0,
        cantidadPuntosRedimidos: 0,
      });
  }, []);

  return { openPuntosError, setOpenPuntosError, msnPuntosError, puntos };
}
