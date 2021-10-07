import { Button, Typography } from '@material-ui/core';
import React, { ReactElement } from 'react';
import { PhoneIcon } from '../../iconos/PhoneIcon';
import { ipcRenderer } from 'electron';
import { setTimeout } from 'timers';
import useHelp from '../../Hook/useHelp';

const ipc = ipcRenderer;
export default function ButtonHelper(): ReactElement {
  const {
    isLoading,
    hasPending,
    setHasPending,
    setIsLoading,
    solicitudes,
  } = useHelp();

  ///********* */

  const solicitarAyuda = () => {
    setHasPending(true);
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

    setTimeout(() => {
      ipc.send('crearSolicitud', args);
    }, 500);
  };

  const solicitar = () => {
    setIsLoading(true);
    solicitarAyuda();
  };

  const hasSolicitudes = () => {
    const localMaquina = localStorage.getItem('maquina');
    if (solicitudes.length === 0) {
      return false;
    }
    return solicitudes?.filter((s) => s?.serial === localMaquina)
      ? true
      : false;
  };

  console.log(solicitudes, hasPending);

  return (
    <>
      {hasSolicitudes() ? (
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
          className={`${hasPending == true ? 'inactive' : ''}`}
          onClick={solicitar}
        >
          <PhoneIcon color="" />
          <Typography variant="h6" style={{ color: 'white' }}>
            Ayuda
          </Typography>
        </Button>
      )}
    </>
  );
}
