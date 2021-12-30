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
    ipc.send('visualizarPuntosxDia', args);
  };

  const callback = useCallback(puntosXBar, [user?.numeroDocumento]);

  useEffect(() => {
    if (user) {
      callback();
    }
  }, [callback, user]);

  useEffect(() => {
    ipc.on('visualizarPuntosxDia', (_event, arg) => {
      // eslint-disable-next-line no-console
      console.log(arg?.cantidadPuntosDisponibles, 'bar.tsx');

      // eslint-disable-next-line no-empty
      if (arg?.statusDTO?.code !== '00') {
      }

      if (arg?.statusDTO?.code === '00') {
        localStorage.setItem(
          'puntosDiaxBar',
          JSON.stringify(arg?.cantidadPuntosDisponibles)
        );

        setPuntosBar(arg?.cantidadPuntosDisponibles);
      }
    });
  }, []);

  return {
    puntosBar,
  };
}
