/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ipcRenderer } from 'electron';
import { useCallback, useEffect, useMemo, useState } from 'react';

const ipc = ipcRenderer;
export default function useToken() {
  const [token, setToken] = useState('');

  const sendAuth = () => {
    setInterval(() => {
      const auth = JSON.parse(window.localStorage.getItem('authConfig')!);
      ipc.send('allways-auth', auth);
    }, 1000 * 60 * 4);
  };

  const callback = useCallback(sendAuth, []);

  useEffect(() => {
    let id: unknown | NodeJS.Timeout;
    if (localStorage.getItem('authConfig')) {
      id = callback();
    }
    return () => clearInterval(id);
  }, [callback]);

  const getAuth = () => {
    ipc.on('allways-auth', (_event, arg) => {
      setToken(arg?.token);
      localStorage.setItem('token', arg.token);
    });
  };

  const callbackgetAuth = useCallback(getAuth, []);
  useEffect(() => {
    callbackgetAuth();
  }, [callbackgetAuth]);

  const tokenMemo = useMemo(() => token, [token]);
  return { tokenMemo };
}
