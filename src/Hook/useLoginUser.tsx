/* eslint-disable promise/always-return */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useCallback, useState } from 'react';
import { ipcRenderer } from 'electron';
import { useHistory } from 'react-router-dom';

const ipc = ipcRenderer;

export default function useLoginUser() {
  const [openError, setOpenError] = useState(false);
  const [messageError, setMessageError] = useState('');

  const [inputs, setInputs] = useState<{
    username: string;
    token: string;
    passwordMaster: string;
  }>({
    username: '',
    token: '',
    passwordMaster: '',
  });

  const history = useHistory();

  const fidelizar = () => {
    const auth = JSON.parse(localStorage.getItem('authConfig')!);
    ipc.send('allways-auth', auth);

    const localToken = localStorage.getItem('token');

    const authConfig = JSON.parse(localStorage.getItem('authConfig')!)
      ? JSON.parse(localStorage.getItem('authConfig')!)
      : null;

    const localMaquina = localStorage.getItem('maquina');
    localStorage.setItem('numeroDocumento', inputs?.username);
    const args = {
      host: authConfig?.host,
      serial: localMaquina,
      numeroDocumento: inputs?.username!,
      token: localToken,
    };

    ipc
      .invoke('fidelizarMaquina', args)
      .then((res) => {
        // eslint-disable-next-line no-console
        console.log(res);
        if (res?.error === 'No se conecto al servidor') {
          // eslint-disable-next-line no-console
          setMessageError(res?.error);
          setOpenError(true);
          history.push('/login');
          return;
        }
        if (res?.statusDTO?.code !== '00') {
          // eslint-disable-next-line no-console
          setMessageError(res?.statusDTO?.message);
          setOpenError(true);
          return;
        }
        // eslint-disable-next-line no-console
        const numeroDocumento = localStorage.getItem('numeroDocumento');
        localStorage.setItem(
          'user',
          JSON.stringify({
            numeroDocumento,
            nombre: res?.nombreCompleto,
            clave: res?.clave,
            billetero: res?.enableBilletero,
          })
        );

        if (localStorage.getItem('user')) history.push('/');
      })
      .catch((err) => {
        setMessageError(err?.statusDTO?.message);
        setOpenError(true);
      });
  };

  const callBackFidelizar = useCallback(fidelizar, [history, inputs?.username]);

  return {
    openError,
    setOpenError,
    messageError,
    callBackFidelizar,
    inputs,
    setInputs,
  };
}
