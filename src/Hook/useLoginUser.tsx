import { useEffect, useState } from 'react';
import { ipcRenderer } from 'electron';
import { useHistory } from 'react-router-dom';

const ipc = ipcRenderer;

export default function useLoginUser() {
  const [openError, setOpenError] = useState(false);
  const [messageError, setMessageError] = useState('');

  const [inputs, setInputs] = useState<
    | {
        username: string;
        token: string;
        passwordMaster: string;
      }
    // eslint-disable-next-line @typescript-eslint/ban-types
    | {}
  >({
    username: '',
    token: '',
    passwordMaster: '',
  });

  const history = useHistory();

  const fidelizar = () => {
    const auth = JSON.parse(localStorage.getItem('authConfig'));
    ipc.send('allways-auth', auth);

    const localToken = localStorage.getItem('token');

    const authConfig = JSON.parse(localStorage.getItem('authConfig'))
      ? JSON.parse(localStorage.getItem('authConfig'))
      : null;

    const localMaquina = localStorage.getItem('maquina');
    localStorage.setItem('numeroDocumento', inputs?.username);
    const args = {
      host: authConfig.host,
      serial: localMaquina,
      numeroDocumento: inputs?.username,
      token: localToken,
    };
    ipc.send('fidelizarMaquina', args);
  };

  useEffect(() => {
    ipc.on('fidelizarMaquina', (_event, arg) => {
      // eslint-disable-next-line eqeqeq
      if (arg === undefined) {
        // eslint-disable-next-line no-console
        setMessageError('intente de nuevo, por favor.');
        setOpenError(true);
      }
      if (arg?.statusDTO?.code !== '00') {
        // eslint-disable-next-line no-console
        setMessageError(arg?.statusDTO?.message);
        setOpenError(true);
      }

      if (arg?.statusDTO?.code === '00') {
        // eslint-disable-next-line no-console
        const numeroDocumento = localStorage.getItem('numeroDocumento');
        localStorage.setItem(
          'user',
          JSON.stringify({
            numeroDocumento,
            nombre: arg.nombreCompleto,
            clave: arg.clave,
            billetero: arg.enableBilletero,
          })
        );

        if (localStorage.getItem('user')) history.push('/');
      }
    });
  }, []);

  return {
    openError,
    setOpenError,
    messageError,
    fidelizar,
    inputs,
    setInputs,
  };
}
