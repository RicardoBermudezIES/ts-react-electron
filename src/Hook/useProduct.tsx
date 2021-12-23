import { ipcRenderer } from 'electron';
import { useEffect, useState } from 'react';
import { Product } from '../types/Products';

const ipc = ipcRenderer;


export default function useProduct() {
  const [productos, setProductos] = useState<string[]>();
  const [openError, setOpenError] = useState(false);
  const [messageError, setmessageError] = useState('');

  const getBar = () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const auth = JSON.parse(localStorage.getItem('authConfig'));
    ipc.send('allways-auth', auth);

    const localCasino = localStorage.getItem('casino');
    const localToken = localStorage.getItem('token');

    const args = {
      host: auth.host,
      casino: localCasino,
      token: localToken,
    };
    ipc.send('bar', args);
  };

  const saveProduct = (Products: Product[]) => {
    const newSet = new Set<string>();
    Products.forEach((l: Product) => {
      return newSet.add(l.categoriaPremio);
    });
    const uniq = [...newSet];
    setProductos(uniq);
  };

  useEffect(() => {
    getBar();
  }, []);

  useEffect(() => {
    ipc.on('bar', (_event, arg) => {
      if (arg?.statusDTO?.code !== '00') {
        // eslint-disable-next-line no-console
        setmessageError(arg?.statusDTO?.message);
        setOpenError(true);
      }

      if (arg?.statusDTO?.code === '00') {
        localStorage.setItem(
          'bar',
          JSON.stringify(arg?.listaVisualizarPremiosDTO)
        );
        saveProduct(arg?.listaVisualizarPremiosDTO);
      }
    });
  }, []);

  return {
    productos,
    openError,
    messageError,
    setOpenError,
  };
}
