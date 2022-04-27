/* eslint-disable no-console */
/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
import { ipcRenderer } from 'electron';
import { useCallback, useState } from 'react';
import useListarPedido from './useListarPedido';

const ipc = ipcRenderer;
export default function useDinamica() {
  const { doRedimir } = useListarPedido();
    const [ errorDinamica, setErrorDinamica] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const user = JSON.parse(localStorage.getItem('user')!);

  // solicitar el puntosbar.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const SolictarClave = () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const auth = JSON.parse(localStorage.getItem('authConfig')!);
    const localToken = localStorage.getItem('token');
    const args = {
      host: auth.host,
      numeroDocumento: user?.numeroDocumento,
      nombreUsuario: auth?.user,
      token: localToken,
    };

    ipc
      .invoke('reenviar-dinamica', args)
      .then((res) => {
        if (res?.statusDTO?.code !== '00') {
          console.log(res);
        }

        if (res?.statusDTO?.code === '00') {
          const dinamica = res?.clave;
          localStorage.setItem('dinamica', dinamica);
          // 
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const ValidarClaveDinamica = (clave: string, pk: string) => {
    const dinamica = localStorage.getItem('dinamica');

        if (clave === dinamica) {
            doRedimir(pk);
        }

        if (clave !== dinamica) {
            setErrorDinamica(true)
        }
  };

  const callbackSolictarClave = useCallback(SolictarClave, []);
  const callbackValidarClaveDinamica = useCallback(ValidarClaveDinamica, []);
  
  return {
    callbackSolictarClave,
    callbackValidarClaveDinamica,
    errorDinamica,

  };
}
