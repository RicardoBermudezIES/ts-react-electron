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
  const CallBackObtenerSolicitudes = useCallback(ObtenerSolicitudes, []);

  useEffect(() => {
    CallBackObtenerSolicitudes();

    return () => setSolicitudes([]);
  }, [CallBackObtenerSolicitudes]);

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
    console.log('haciedno peticion de solicitudes');
    ipc.send('todas-solicitudes', arg);
  };

  const callBackPedirSolicitudes = useCallback(PedirSolicitudes, [hasPending]);

  useEffect(() => {
    const myInterval = setInterval(() => {
      if (hasPending === true) {
        callBackPedirSolicitudes();
      }
    }, 1000 * 30);
    return () => {
      clearInterval(myInterval);
    };
  }, [callBackPedirSolicitudes, hasPending]);

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

    ipc
      .invoke('crearSolicitud', args)
      .then((res) => {
        if (res?.statusDTO?.code === '00') {
          console.log('haciedno peticion de solicitudes');
          setHasPending(false);
          callBackPedirSolicitudes();
        }
      })
      .catch(() => setHasPending(false));
  };

  const solicitar = useCallback(solicitarAyuda, [callBackPedirSolicitudes]);

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
