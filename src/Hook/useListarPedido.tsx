import { ipcRenderer } from 'electron';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

const ipc = ipcRenderer;

export default function useListarPedido() {
  const history = useHistory();
  const [listarProductos, setListarProductos] = useState<[]>([]);
  const [openError, setOpenError] = useState(false);
  const [messageError, setmessageError] = useState('');
  const [buyModal, setBuyModal] = useState(false);
  const [redimirModal, setRedimirModal] = useState(false);

  const handleOpenRedimirModal = () => {
    setRedimirModal(true);
  };

  const handleCloseRedimirModal = () => {
    setRedimirModal(false);
    history.go(-2);
  };

  const CloseModalBuy = () => {
    setBuyModal(!buyModal);
    history.go(-2);
  };

  const getListProducts = () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const auth = JSON.parse(localStorage.getItem('authConfig')!);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const user = JSON.parse(localStorage.getItem('user')!);
    const maquina = localStorage.getItem('maquina');
    const localToken = localStorage.getItem('token');
    const args = {
      host: auth.host,
      numeroDocumento: user?.numeroDocumento ?? null,
      maquina,
      token: localToken,
    };
    ipc.send('listar-peticiones', args);
  };
  useEffect(() => {
    getListProducts();
  }, []);

  useEffect(() => {
    ipc.on('listar-peticiones', (_event, arg) => {
      // eslint-disable-next-line no-console
      // eslint-disable-next-line no-empty
      if (arg?.statusDTO?.code !== '00') {
      }
      if (arg?.statusDTO?.code === '00') {
        setListarProductos(arg?.peticiones);
      }
    });
  }, []);

  const doBuy = (puk: string) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const auth = JSON.parse(localStorage.getItem('authConfig')!);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const user = JSON.parse(localStorage.getItem('user')!);
    const maquina = localStorage.getItem('maquina');
    const localToken = localStorage.getItem('token');

    const args = {
      host: auth.host,
      numeroDocumento: user?.numeroDocumento ?? null,
      maquina,
      token: localToken,
      puk,
    };

    ipc.send('comprar-productos', args);
    setBuyModal(true);
  };

  const doRedimir = (puk: string) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const auth = JSON.parse(localStorage.getItem('authConfig')!);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const user = JSON.parse(localStorage.getItem('user')!);
    const maquina = localStorage.getItem('maquina');
    const localToken = localStorage.getItem('token');

    const args = {
      host: auth.host,
      numeroDocumento: user?.numeroDocumento ?? null,
      maquina,
      token: localToken,
      puk,
    };

    ipc.send('realizar-peticion', args);
  };

  const cancelarPeticion = (idPremio: string) => {
    const product: [] = listarProductos?.find((l) => l?.idPremio === idPremio);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const auth = JSON.parse(localStorage.getItem('authConfig')!);

    const maquina = localStorage.getItem('maquina');
    const localToken = localStorage.getItem('token');

    const args = {
      host: auth.host,
      numeroDocumento: auth?.numeroDocumento,
      maquina,
      token: localToken,
      puk: product?.idPeticion,
    };

    ipc.send('anular-peticiones', args);
  };

  const confirmarPeticion = (idPremio: string) => {
    const product = listarProductos?.find((l) => l?.idPremio === idPremio);
    const auth = JSON.parse(localStorage.getItem('authConfig'));

    const maquina = localStorage.getItem('maquina');
    const localToken = localStorage.getItem('token');

    const args = {
      host: auth.host,
      numeroDocumento: auth?.numeroDocumento,
      maquina,
      token: localToken,
      puk: product?.idPeticion,
    };

    ipc.send('confirmar-peticiones', args);
  };

  useEffect(() => {
    ipc.on('anular-peticiones', (_event, arg) => {
      // eslint-disable-next-line no-console

      if (arg?.statusDTO?.code !== '00') {
        // eslint-disable-next-line no-console
        setmessageError(arg?.statusDTO?.message);
        setOpenError(true);
      }

      if (arg?.statusDTO?.code === '00') {
        getListProducts();
      }
    });
  }, []);

  useEffect(() => {
    ipc.on('confirmar-peticiones', (_event, arg) => {
      // eslint-disable-next-line no-console

      if (arg?.statusDTO?.code !== '00') {
        // eslint-disable-next-line no-console
        setmessageError(arg?.statusDTO?.message);
        setOpenError(true);
      }

      if (arg?.statusDTO?.code === '00') {
        getListProducts();
        handleOpenRedimirModal();
      }
    });
  }, []);

  useEffect(() => {
    ipc.on('comprar-productos', (_event, arg) => {
      // eslint-disable-next-line no-console

      if (arg?.statusDTO?.code !== '00') {
        // eslint-disable-next-line no-console
        setmessageError(arg?.statusDTO?.message);
        setOpenError(true);
      }

      if (arg?.statusDTO?.code === '00') {
        getListProducts();
        setBuyModal(true);
      }
    });
  }, []);

  useEffect(() => {
    ipc.on('realizar-peticion', (_event, arg) => {
      // eslint-disable-next-line no-console

      if (arg?.statusDTO?.code !== '00') {
        // eslint-disable-next-line no-console
        setmessageError(arg?.statusDTO?.message);
        setOpenError(true);
      }

      if (arg?.statusDTO?.code === '00') {
        getListProducts();
      }
    });
  }, []);


  const hasQueque = (idPremio: string, estado: string) => {
    const product = listarProductos?.find((l) => l?.idPremio === idPremio);

    if (product?.estadoPeticion === estado) {
      return true;
    }
    return false;
  };

  return {
    listarProductos,
    doBuy,
    doRedimir,
    cancelarPeticion,
    confirmarPeticion,
    openError,
    setOpenError,
    messageError,
    handleCloseRedimirModal,
    CloseModalBuy,
    redimirModal,
    buyModal,
    hasQueque,
  };
}
