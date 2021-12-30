/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ipcRenderer } from 'electron';
import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const ipc = ipcRenderer;

export default function useCloseSession() {
  const history = useHistory();
  const [openError, setOpenError] = useState(false);
  const [messageError, setmessageError] = useState('');

  const CloseSession = () => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const authConfig = JSON.parse(localStorage.getItem('authConfig')!);
    const localMaquina = localStorage.getItem('maquina');
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const localToken = localStorage.getItem('token');
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const user = JSON.parse(localStorage.getItem('user')!);
    const args = {
      host: authConfig?.host,
      maquina: localMaquina,
      numeroDocumento: user?.numeroDocumento,
      token: localToken,
    };
    if (user !== null && localMaquina) {
      ipc.send('cerrar-sesion', args);
    }
  };

  const ipcCloseSession = () => {
    ipc.on('cerrar-sesion', (_, arg) => {
      if (arg?.Error) {
        localStorage.removeItem('user');
        localStorage.removeItem('puntos');
        history.push('/login');
      }

      if (arg?.statusDTO?.code !== '00') {
        setmessageError(arg?.statusDTO?.message);
        setOpenError(true);
      }
      if (arg?.statusDTO?.code === '00') {
        localStorage.removeItem('user');
        localStorage.removeItem('puntos');
        history.push('/login');
      }
    });
  };

  const CallbackCloseSession = useCallback(ipcCloseSession, [history]);

  useEffect(() => {
    CallbackCloseSession();
  }, [CallbackCloseSession]);

  return {
    CloseSession,
    messageError,
    openError,
    setOpenError,
  };
}
