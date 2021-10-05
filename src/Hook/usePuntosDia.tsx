import { ipcRenderer } from 'electron';
import { useEffect, useState } from 'react';
const ipc = ipcRenderer;
export default function usePuntosDia() {
  const [puntosBar, setPuntosBar] = useState();

  const user = JSON.parse(localStorage.getItem('user'));

  // solicitar el puntosbar.
  const puntosXBar = () => {
    const auth = JSON.parse(localStorage.getItem('authConfig'));
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

  useEffect(() => {
    if (user) {
      puntosXBar();
    }
  }, []);

  useEffect(() => {
    ipc.on('visualizarPuntosxDia', (event, arg) => {
      // eslint-disable-next-line no-console
      console.log(arg?.cantidadPuntosDisponibles, 'bar.tsx');

      if (arg?.statusDTO?.code !== '00') {
      }

      if (arg?.statusDTO?.code == '00') {
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
