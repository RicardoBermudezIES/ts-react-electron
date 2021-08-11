import { ipcRenderer } from 'electron';
import React, { useEffect, useState } from 'react';
import { Button, Box, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import NavButton from '../component/NavButton';
import { formatNumber } from '../helpers/format';
import Odometer from 'react-odometerjs';
const ipc = ipcRenderer;

const useStyles = makeStyles(() => ({
  root: {
    background:
      'linear-gradient(180deg, rgba(250, 93, 185, 1) 0%, rgba(239, 35, 35, 1) 100% )',
  },
  grid: {
    height: '90%',
  },
  NumberPoint: {
    fontWeight: 900,
  },
}));

function Home() {
  const history = useHistory();

  const user = JSON.parse(localStorage.getItem('user'))
    ? JSON.parse(localStorage.getItem('user'))
    : null;


  const [puntos, setPuntos] = useState({
    cantidadPuntosDisponibles: null,
    cantidadPuntosRedimidos: null,
  });

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    user === null ? history.push('/login') : null;
  }, []);


  const sendPuntos = () => {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const authConfig = JSON.parse(localStorage.getItem('authConfig'));
      const localMaquina = localStorage.getItem('maquina');
      const localCasino = localStorage.getItem('casino');
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const localToken = localStorage.getItem('token');
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const user = JSON.parse(localStorage.getItem('user'));
      const args = {
        host: authConfig?.host,
        casino: localCasino,
        maquina: localMaquina,
        numeroDocumento: user?.numeroDocumento,
        token: localToken,
      };
      if (user !== null) {
        ipc.send('visualizarPuntos', args);
      }

  }

  useEffect(() => {
    sendPuntos()
  }, []);


  useEffect(() => {
    setInterval(() => {
      sendPuntos()
    }, 1000 * 30);
  }, []);

  const getPuntos = () => {
    ipc.on('visualizarPuntos', (event, arg) => {
      if (arg?.Error) {
        console.log(arg?.Error);
      }

      if (arg?.statusDTO?.code !== '00') {
        console.log(arg?.statusDTO?.message);
      }
      if (arg?.statusDTO?.code == '00') {
        localStorage.setItem(
          'puntos',
          JSON.stringify({
            cantidadPuntosDisponibles: arg.cantidadPuntosDisponibles,
            cantidadPuntosRedimidos: arg.cantidadPuntosRedimidos,
          })
        );
        setPuntos({
          cantidadPuntosDisponibles: arg.cantidadPuntosDisponibles,
          cantidadPuntosRedimidos: arg.cantidadPuntosRedimidos,
        });
      }
    });
  };

  useEffect(() => {
    getPuntos();
  }, []);

  const leaveLobby = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('puntos');
    history.push('/login');
  };

  const classes = useStyles();
  return (
    <Box height="100vh" p={2}>
      <Box
        position="absolute"
        top="-15%"
        left="-33%"
        zIndex="-9999"
        minHeight="150vh"
        width="70%"
        borderRadius="50%"
        className={classes.root}
      />
      <Grid container justify="flex-end">
        <Grid item>
          <Button
            size="large"
            onClick={leaveLobby}
            variant="contained"
            color="secondary"
          >
            Salir
          </Button>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        spacing={4}
        className={classes.grid}
      >
        <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
          <Grid
            container
            alignItems="flex-end"
            justify="center"
            direction="column"
          >
            <Grid item>
              <Typography
                variant="h2"
                component="h2"
                align="right"
                className={classes.NumberPoint}
              >
                {puntos?.cantidadPuntosDisponibles ? (
                  <Odometer
                  value={Number(puntos?.cantidadPuntosDisponibles)}
                  format="(.ddd),dd" />
                ) : (
                  <Typography variant="body2" component="span" align="right">
                    cargando puntos
                  </Typography>
                )}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5" component="p">
                Puntos Totales{' '}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
          <Grid
            container
            alignItems="flex-end"
            justify="center"
            direction="column"
          >
            <Grid item xl={10} lg={10} md={10} sm={10} xs={10}>
              <Typography
                variant="h2"
                component="h2"
                color="secondary"
                align="right"
                className={classes.NumberPoint}
              >
                {user ? user?.nombre : ''}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
          <NavButton />
        </Grid>
      </Grid>
    </Box>
  );
}

export default React.memo(Home);
