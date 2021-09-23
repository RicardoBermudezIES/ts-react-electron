import { Button, Typography } from '@material-ui/core';
import React, { ReactElement, useEffect, useState } from 'react';
import { PhoneIcon } from '../../iconos/PhoneIcon';
import { ipcRenderer } from 'electron';
import { setTimeout } from 'timers';

const ipc = ipcRenderer;
export default function ButtonHelper(): ReactElement {
  const [solicitudes, setSolicitudes] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  ///********* */

  const solicitarAyuda = () => {
    const auth = JSON.parse(localStorage.getItem('authConfig'));
    ipc.send('allways-auth', auth);

    //userAdmin, host, numeroDocumento, maquina, token, casino
    const authConfig = JSON.parse(localStorage.getItem('authConfig'));
    const localMaquina = localStorage.getItem('maquina');
    const localCasino = localStorage.getItem('casino');
    const localToken = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    const args = {
      userAdmin: authConfig?.user,
      host: authConfig?.host,
      casino: localCasino,
      maquina: localMaquina,
      numeroDocumento: user?.numeroDocumento,
      token: localToken,
    };

    setTimeout(() => {  ipc.send('crearSolicitud', args)}, 500)

  };

  const solicitar = () => {
    setIsLoading(true)
    solicitarAyuda();
    PedirSolicitudes();
  };

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
    setTimeout(() => {  ipc.send('todas-solicitudes', arg)}, 2000)
  };

  useEffect(() => {
   const myInterval = setInterval( () => PedirSolicitudes(), 1000 * 60 * 1);
    myInterval
    return () => {
      clearInterval(myInterval);
    }
  }, []);

  const ObtenerSolicitudes = () => {
    ipc.on('todas-solicitudes', (event, arg) => {
      if (arg?.statusDTO?.code == '126') {
        setIsLoading(false)
        setSolicitudes(null);
      }
      if (arg?.statusDTO?.code == '00') {
        setIsLoading(false)
        setSolicitudes(arg?.solicitudes);
      }
    });
  };

  useEffect(() => {
    ObtenerSolicitudes();
  }, [solicitudes]);

  const hasSolicitudes = () => {
    const localMaquina = localStorage.getItem('maquina');
    if (solicitudes === null) {
      return false;
    }
    return solicitudes?.filter( s => s?.serial === localMaquina) ? true : false;
  }

  return (
    <>
      {
        hasSolicitudes() ? (
          <Button style={{ display: 'grid' }} disabled>
          <PhoneIcon color="#efb810" />
          <Typography variant="h6" style={{ color: 'white' }}>
            En camino
          </Typography>
        </Button>

        ) : (
          <Button
          disabled={isLoading}
          style={{ display: 'grid' }}
          onClick={solicitar}>
         <PhoneIcon color="" />
         <Typography variant="h6" style={{ color: 'white' }}>
           Ayuda
         </Typography>
       </Button>

        )
      }
    </>
  );
}
