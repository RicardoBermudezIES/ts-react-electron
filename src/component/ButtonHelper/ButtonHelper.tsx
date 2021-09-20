import { Button, Typography } from '@material-ui/core';
import React, { ReactElement, useEffect, useState } from 'react';
import { PhoneIcon } from '../../iconos/PhoneIcon';
import { ipcRenderer } from 'electron';

const ipc = ipcRenderer;
export default function ButtonHelper(): ReactElement {
  const [solicitudes, setSolicitudes] = useState([]);
  ///********* */

  const solicitarAyuda = () => {
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
    if (user !== null) {
      ipc.send('crearSolicitud', args);
    }
  };

  const solicitar = () => {
    console.log('Solcitando..')
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
    ipc.send('todas-solicitudes', arg);
  };

  useEffect(() => {
    setInterval(() => {
      PedirSolicitudes();
    }, 1000 * 60 * 1);
  }, []);

  const ObtenerSolicitudes = () => {
    ipc.on('todas-solicitudes', (event, arg) => {
      if (arg?.statusDTO?.code !== '00') {
        setSolicitudes([]);
      }
      if (arg?.statusDTO?.code == '00') {
        setSolicitudes(arg?.solicitudes);
      }
    });
  };

  useEffect(() => {
    ObtenerSolicitudes();
  }, []);

  return (
    <>
      {solicitudes ? (
        solicitudes.length == 0 ? (
          <Button style={{ display: 'grid' }} onClick={solicitar}>
          <PhoneIcon color="" />
          <Typography variant="h6" style={{ color: 'white' }}>
            {' '}
            Ayuda{' '}
          </Typography>
        </Button>

        ) : (
          <Button style={{ display: 'grid' }} disabled>
          <PhoneIcon color="#efb810" />
          <Typography variant="h6" style={{ color: 'white' }}>
            En camino
          </Typography>
        </Button>
        )
      ) : null}
    </>
  );
}
