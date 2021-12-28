/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ipcRenderer } from 'electron';
import { useEffect, useState } from 'react';
import { setTimeout } from 'timers';

const ipc = ipcRenderer;
export default function useHelp() {
  const [hasPending, setHasPending] = useState(false);
  const [solicitudes, setSolicitudes] = useState([]);

  useEffect(() => {
    const ObtenerSolicitudes = () => {
      ipc.on('todas-solicitudes', (_event, arg) => {
        if (arg?.statusDTO?.code !== '00') {
          setSolicitudes([]);
        }
        if (arg?.statusDTO?.code === '00') {
          setHasPending(false);
          setSolicitudes(arg?.solicitudes);
        }
      });
    };
    ObtenerSolicitudes();
  }, [solicitudes]);

  useEffect(() => {
    const PedirSolicitudes = () => {
      const authConfig = JSON.parse(localStorage.getItem('authConfig')!);
      const localCasino = localStorage.getItem('casino');
      const localToken = localStorage.getItem('token');
      const arg = {
        userAdmin: authConfig?.user,
        host: authConfig?.host,
        casino: localCasino,
        token: localToken,
      };
      console.log(hasPending);
      if (hasPending === true) {
        console.log('haciedno peticion de solicitudes');
        ipc.send('todas-solicitudes', arg);
      }
    };

    const myInterval = setInterval(() => {
      PedirSolicitudes();
    }, 1000 * 60 * 2);
    return () => {
      clearInterval(myInterval);
    };
  }, [hasPending]);

  const solicitarAyuda = () => {
    setHasPending(true);
    const auth = JSON.parse(localStorage.getItem('authConfig')!);
    ipc.send('allways-auth', auth);

    // userAdmin, host, numeroDocumento, maquina, token, casino
    const authConfig = JSON.parse(localStorage.getItem('authConfig')!);
    const localMaquina = localStorage.getItem('maquina');
    const localCasino = localStorage.getItem('casino');
    const localToken = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user')!);
    const args = {
      userAdmin: authConfig?.user,
      host: authConfig?.host,
      casino: localCasino,
      maquina: localMaquina,
      numeroDocumento: user?.numeroDocumento,
      token: localToken,
    };

    setTimeout(() => {
      ipc.send('crearSolicitud', args);
    }, 500);
  };

  const solicitar = () => {
    solicitarAyuda();
  };

  const hasSolicitudes = () => {
    const localMaquina = localStorage.getItem('maquina');
    if (solicitudes.length === 0) {
      return false;
    }
    return solicitudes?.filter((s) => s?.serial === localMaquina).length > 0;
  };

  return {
    hasPending,
    solicitudes,
    setHasPending,
    solicitar,
    hasSolicitudes,
  };
}
