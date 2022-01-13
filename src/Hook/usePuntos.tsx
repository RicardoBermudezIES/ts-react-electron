/* eslint-disable promise/always-return */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ipcRenderer } from 'electron';
import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { setTimeout } from 'timers';
import useCloseSession from './useCloseSession';

const ipc = ipcRenderer;

export default function usePuntos() {
  const history = useHistory();
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

    // eslint-disable-next-line no-console
    console.log('visualizarPuntos');
    ipc
      .invoke('visualizarPuntos', args)
      .then((res) => {
        // eslint-disable-next-line no-console
        console.log(res);
        if (res?.statusDTO?.code === '38') {
          CallbackCloseSession();
          history.push('/login');
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
    history,
    user?.numeroDocumento,
  ]);

  useEffect(() => {
    let id: any;
    if (user !== null) {
      id = setInterval(() => {
        callback();
      }, 1000 * 30);
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
