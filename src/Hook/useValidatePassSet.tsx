/* eslint-disable no-console */
/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
import { ipcRenderer } from 'electron';
import { useCallback, useEffect, useState } from 'react';
import useListarPedido from './useListarPedido';

const ipc = ipcRenderer;
export default function useValidatePassSet() {
  const { doRedimir } = useListarPedido();

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const user = JSON.parse(localStorage.getItem('user')!);

  // solicitar el puntosbar.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const validatePassSet = (clave: string, pk: string) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const auth = JSON.parse(localStorage.getItem('authConfig')!);
    const localToken = localStorage.getItem('token');
    const args = {
      host: auth.host,
      numeroDocumento: user?.numeroDocumento,
      clave: clave,
      token: localToken,
    };

    ipc
      .invoke('validar-fija', args)
      .then((res) => {
        if (res?.statusDTO?.code !== '00') {
          console.log(res);
        }

        if (res?.statusDTO?.code === '00') {
          doRedimir(pk);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const callbackValidate = useCallback(validatePassSet, []);


  return {
    callbackValidate,
  };
}
