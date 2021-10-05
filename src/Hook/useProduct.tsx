import { ipcRenderer } from "electron";
import { useEffect, useState } from "react";
const ipc = ipcRenderer;

export default function useProduct(){
  const [productos, setProductos] = useState();
  const [openError, setOpenError] = useState(false);
  const [messageError, setmessageError] = useState('');

  const getBar = () => {
    const auth = JSON.parse(localStorage.getItem('authConfig'));
    ipc.send('allways-auth', auth);

    setTimeout(() => {
      const localCasino = localStorage.getItem('casino');
      const localToken = localStorage.getItem('token');

      const args = {
        host: auth.host,
        casino: localCasino,
        token: localToken,
      };
        ipc.send('bar', args);
    }, 500);

   }

   useEffect(() => {

      getBar()


   }, [])

   useEffect(() => {
    ipc.on('bar', (event, arg) => {

      if (arg?.statusDTO?.code !== '00') {
        // eslint-disable-next-line no-console
        setmessageError(arg?.statusDTO?.message);
        setOpenError(true);
      }

      if (arg?.statusDTO?.code == '00') {
        localStorage.setItem(
          'bar',
          JSON.stringify(arg?.listaVisualizarPremiosDTO)
        );
        const newSet = new Set()
        arg?.listaVisualizarPremiosDTO.forEach(( l => newSet.add(l?.categoriaPremio)));
        setProductos(newSet)

      }

    });

  },[]);


  return {
    productos,
    openError,
    messageError
  }

}
