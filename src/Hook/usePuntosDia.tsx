/* eslint-disable no-console */
/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
import { ipcRenderer } from 'electron';
import { useCallback, useEffect, useState } from 'react';

const ipc = ipcRenderer;
export default function usePuntosDia() {
  const [puntosBar, setPuntosBar] = useState(0);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const user = JSON.parse(localStorage.getItem('user')!);

  // solicitar el puntosbar.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const puntosXBar = () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const auth = JSON.parse(localStorage.getItem('authConfig')!);
    const localCasino = localStorage.getItem('casino');
    const localToken = localStorage.getItem('token');
    const localMaquina = localStorage.getItem('maquina');
    const args = {
      host: auth.host,
      numeroDocumento: user?.numeroDocumento,
      maquina: localMaquina,
      casino: localCasino,
      token: localToken,
    };
    ipc
      .invoke('visualizarPuntosxDia', args)
      .then((res) => {
        if (res?.statusDTO?.code !== '00') {
          console.log(res);
        }

        if (res?.statusDTO?.code === '00') {
          localStorage.setItem(
            'puntosDiaxBar',
            JSON.stringify(res?.cantidadPuntosDisponibles)
          );

          setPuntosBar(res?.cantidadPuntosDisponibles);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const callback = useCallback(puntosXBar, [user?.numeroDocumento]);

  useEffect(() => {
    if (user) {
      callback();
    }
  }, [callback, user]);
  return {
    puntosBar,
  };
}
