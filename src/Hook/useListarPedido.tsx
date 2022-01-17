/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable promise/always-return */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ipcRenderer } from 'electron';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { IPedidos } from '../types/Pedidos';
import { IProduct } from '../types/Products';

const ipc = ipcRenderer;

export default function useListarPedido() {
  const history = useHistory();
  const [listarProductos, setListarProductos] = useState<[]>([]);
  const [openError, setOpenError] = useState(false);
  const [messageError, setmessageError] = useState('');
  const [buyModal, setBuyModal] = useState(false);
  const [redimirModal, setRedimirModal] = useState(false);
  const [pedidos, setPedidos] = useState<IProduct[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const barList = JSON.parse(localStorage.getItem('bar')!);

  const handleCloseRedimirModal = () => {
    history.go(-2);
    setRedimirModal(false);
  };

  const CloseModalBuy = () => {
    history.go(-2);
    setBuyModal(false);
  };

  const filterProducts = (arr: IPedidos[]) => {
    const newArr = [...arr];
    const results = barList.filter((b: IProduct) =>
      newArr?.some((p: IPedidos) => {
        b.estado = p.estadoPeticion;
        b.medioPago = p.medioPago;
        return b.pk === p.idPremio;
      })
    );
    setPedidos([...results]);
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
    ipc
      .invoke('listar-peticiones', args)
      .then((res) => {
        filterProducts(res?.peticiones);
        setListarProductos(res?.peticiones);
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getListProducts();
    return () => {
      setListarProductos([]); // This worked for me
    };
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
    const product: IPedidos = listarProductos?.find(
      (l: IPedidos) => l?.idPremio === idPremio
    )!;
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
    const product: IPedidos = listarProductos?.find(
      (l: IPedidos) => l?.idPremio === idPremio
    )!;
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
        setRedimirModal(true);
      }
    });
  }, []);
  const hasQueque = (idPremio: string, estado: string) => {
    const product: IPedidos = listarProductos?.find(
      (l: IPedidos) => l?.idPremio === idPremio
    )!;

    if (product?.estadoPeticion === estado) {
      return true;
    }
    return false;
  };

  return {
    pedidos,
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
    getListProducts,
    setBuyModal,
    setRedimirModal,
  };
}
