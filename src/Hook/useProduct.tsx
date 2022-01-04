/* eslint-disable promise/always-return */
import { ipcRenderer } from 'electron';
import { useCallback, useEffect, useState } from 'react';
import { IProduct } from '../types/Products';

const ipc = ipcRenderer;

export default function useProduct() {
  const [productos, setProductos] = useState<string[]>();
  const [openError, setOpenError] = useState(false);
  const [messageError, setmessageError] = useState('');

  const saveProduct = (Products: IProduct[]) => {
    const newSet = new Set<string>();
    Products.forEach((l: IProduct) => {
      return newSet.add(l.categoriaPremio);
    });
    const uniq = [...newSet];
    setProductos(uniq);
  };

  const getBar = () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const auth = JSON.parse(localStorage.getItem('authConfig')!);
    ipc.send('allways-auth', auth);

    const localCasino = localStorage.getItem('casino');
    const localToken = localStorage.getItem('token');

    const args = {
      host: auth.host,
      casino: localCasino,
      token: localToken,
    };
    ipc
      .invoke('bar', args)
      .then((res) => {
        if (res?.statusDTO?.code !== '00') {
          // eslint-disable-next-line no-console
          setmessageError(res?.statusDTO?.message);
          setOpenError(true);
        }

        if (res?.statusDTO?.code === '00') {
          localStorage.setItem(
            'bar',
            JSON.stringify(res?.listaVisualizarPremiosDTO)
          );
          saveProduct(res?.listaVisualizarPremiosDTO);
        }
      })
      .catch((err) => {
        setmessageError(err?.statusDTO?.message);
        setOpenError(true);
      });
  };

  const CallBackGetBar = useCallback(getBar, []);

  useEffect(() => {
    CallBackGetBar();
    return () => setProductos([]);
  }, [CallBackGetBar]);

  return {
    productos,
    openError,
    messageError,
    setOpenError,
  };
}
