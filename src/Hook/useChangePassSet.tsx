import { ipcRenderer } from 'electron';
import { useCallback, useState } from 'react';

const ipc = ipcRenderer;
export default function useChangePassowrdSet() {
    const [openError, setOpenError] = useState(false);
    const [messageError, setMessageError] = useState('');
    
    
    const ChangePassowrd = (claveAnterior: any,claveNueva: any) => {
    const localToken = localStorage.getItem('token');

    const authConfig = JSON.parse(localStorage.getItem('authConfig')!)
      ? JSON.parse(localStorage.getItem('authConfig')!)
      : null;

      const numeroDocumento = localStorage.getItem('numeroDocumento');

    const args = {
        host: authConfig?.host,
        claveAnterior:claveAnterior,
        claveNueva: claveNueva,
        numeroDocumento: numeroDocumento!,
        token: localToken,
      };

      ipc
      .invoke('change-password', args).then( res => {
         // eslint-disable-next-line no-console
         console.log(res);
         if (res?.error === 'No se conecto al servidor') {
           // eslint-disable-next-line no-console
           setMessageError(res?.error);
           setOpenError(true);
           return;
         }
         if (res?.statusDTO?.code !== '00') {
           // eslint-disable-next-line no-console
           setMessageError(res?.statusDTO?.message);
           setOpenError(true);
           return;
         }
         if (res?.statusDTO?.code == '00') {
          // eslint-disable-next-line no-console
          setMessageError(res?.statusDTO?.message);
          setOpenError(true);
          return;
        }
      })

    }

    const callBackChangePassowrd = useCallback(ChangePassowrd, []);

    return {
      openError,
      setOpenError,
      messageError,
      callBackChangePassowrd
    };
}