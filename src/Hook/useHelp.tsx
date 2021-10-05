import { ipcRenderer } from "electron";
import { useEffect, useState } from "react";
const ipc = ipcRenderer;
export default function useHelp() {

  const [isLoading, setIsLoading] = useState(false)
  const [hasPending, setHasPending] = useState(false)
  const [solicitudes, setSolicitudes] = useState([]);


  useEffect(() => {
    ObtenerSolicitudes()
    },[solicitudes]);

  const ObtenerSolicitudes = () => {
    ipc.on('todas-solicitudes', (event, arg) => {
      if (arg?.statusDTO?.code !== '00') {
        setHasPending(false)
        setIsLoading(false)
        setSolicitudes([]);
      }
      if (arg?.statusDTO?.code == '00') {
        setIsLoading(false)
        setSolicitudes(arg?.solicitudes);
      }
    });
  };


  useEffect(() => {
    const myInterval = setInterval(() => {
      PedirSolicitudes();
    }, 1000 * 60 * 2);
    return () => {
      clearInterval(myInterval);
    };
  }, []);

  const PedirSolicitudes = () => {
    const authConfig = JSON.parse(localStorage.getItem('authConfig'));
    const localCasino = localStorage.getItem('casino');
    const localToken = localStorage.getItem('token');
    const arg = {
      userAdmin: authConfig?.user,
      host: authConfig?.host,
      casino: localCasino,
      token: localToken,
    };
    console.log(hasPending);
    if (hasPending == true) {
      console.log("haciedno peticion de solicitudes")
      ipc.send('todas-solicitudes', arg);
    }
  };


  return{
    isLoading,
    hasPending,
    solicitudes,
    setHasPending,
    setIsLoading
  }

}
