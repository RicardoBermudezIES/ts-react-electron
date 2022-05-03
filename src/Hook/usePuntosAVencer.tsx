import { ipcRenderer } from 'electron';
import { useCallback, useEffect, useState } from 'react';

const ipc = ipcRenderer;

export default function usepuntosVencer() {

  const [openPuntosVencerError, setOpenPuntosVencerrror] = useState(false);
  const [msnPuntosVencerError, setMsnPuntosVencerError] = useState('');

  const [dataVencer, setDataVencer] = useState([
    { data: 0, label: 'hoy' },
    { data: 0, label: '+1' },
    { data: 0, label: '+10' },
    { data: 0, label: '+20' },
    { data: 0, label: '+30' }
  ]);
  // const transformPuntos = () => {
  //   setDataVencer([
  //     { data: puntosVencer[0], label: 'hoy' },
  //     { data: puntosVencer[1], label: '+1' },
  //     { data: puntosVencer[2], label: '+10' },
  //     { data: puntosVencer[3], label: '+20' },
  //     { data: puntosVencer[4], label: '+30' }
  //   ])
  // }

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const user = JSON.parse(localStorage.getItem('user')!);

  const sendPuntosVencer = () => {
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
      intervalos: '0,1,10,20,30',
      token: localToken,
    };

    // eslint-disable-next-line no-console
    console.log('visualizarPuntosVencer');
    ipc
      .invoke('visualizarPuntosVencer', args)
      .then((res) => {
        // eslint-disable-next-line no-console
        console.log(res);
        if (res?.statusDTO?.code === '00') {
          setDataVencer(res?.puntosVencer);
        }
      })
      .catch((err) => {
        if (err?.error === 'No se conecto al servidor') {
          setMsnPuntosVencerError(err?.error);
          setOpenPuntosVencerrror(true);
        }
      });
  };

  const callback = useCallback(sendPuntosVencer, [
    user?.numeroDocumento,
  ]);

  useEffect(() => {
    if (user !== null) {
      callback();
    }
    return () =>
    setDataVencer([]);
  }, []);


  return { openPuntosVencerError, setOpenPuntosVencerrror, msnPuntosVencerError, dataVencer };
}
