/* eslint-disable promise/catch-or-return */
/* eslint-disable promise/always-return */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ipcRenderer } from 'electron';
import { useCallback, useEffect, useState } from 'react';

const ipc = ipcRenderer;
export default function useHelp() {
  const [hasPending, setHasPending] = useState(false);
  const [solicitudes, setSolicitudes] = useState([]);

  const PedirSolicitudes = useCallback(() => {
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

    ipc
      .invoke('todas-solicitudes', arg)
      .then((res) => {
        if (res?.statusDTO?.code !== '00') {
          setHasPending(false);
          setSolicitudes([]);
        }
        if (res?.statusDTO?.code === '00') {
          setSolicitudes(res?.solicitudes);
        }
      })
      .catch(() => {
        setSolicitudes([]);
      });
    console.log('haciedno peticion de solicitudes');
  }, [hasPending]);

  useEffect(() => {
    PedirSolicitudes();

    return () => setSolicitudes([]);
  }, [PedirSolicitudes]);

  useEffect(() => {
    let myInterval: NodeJS.Timeout;
    if (hasPending === true) {
      myInterval = setInterval(() => {
        PedirSolicitudes();
      }, 1000 * 60);
    }
    return () => {
      clearInterval(myInterval);
    };
  }, [PedirSolicitudes, hasPending]);

  const solicitarAyuda = () => {
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

    ipc
      .invoke('crearSolicitud', args)
      .then((res) => {
        if (res?.statusDTO?.code === '00') {
          setHasPending(true);
          PedirSolicitudes();
        }
      })
      .catch(() => {
        console.log('Hubo un error');
      });
  };

  const solicitar = useCallback(solicitarAyuda, [PedirSolicitudes]);

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
