/* eslint-disable promise/always-return */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ipcRenderer } from 'electron';
import { useCallback, useState } from 'react';
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
      ipc
        .invoke('cerrar-sesion', args)
        .then((res) => {
          if (res?.Error) {
            localStorage.removeItem('user');
            localStorage.removeItem('puntos');
            history.push('/login');
          }

          if (res?.statusDTO?.code !== '00') {
            setmessageError(res?.statusDTO?.message);
            setOpenError(true);
          }

          localStorage.removeItem('user');
          localStorage.removeItem('puntos');
          history.push('/login');
        })
        .catch(() => {
          localStorage.removeItem('user');
          localStorage.removeItem('puntos');
          history.push('/login');
        });
    }
  };

  const CallbackCloseSession = useCallback(CloseSession, [history]);

  const goToLogin = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('puntos');
    history.push('/login');
  };

  const CallbackUserNull = useCallback(goToLogin, [history]);

  return {
    CallbackCloseSession,
    CallbackUserNull,
    messageError,
    openError,
    setOpenError,
  };
}
