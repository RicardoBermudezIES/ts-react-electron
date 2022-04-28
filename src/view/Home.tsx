/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Box, Button, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import Odometer from 'react-odometerjs';
import Alert from '../component/Alert/Alert';
import ChangePassowrd from '../component/ChangePassword';
import NavButton from '../component/NavButton';
import useCloseSession from '../Hook/useCloseSession';
import usePuntos from '../Hook/usePuntos';
import { Iclave } from '../types/clave';

const useStyles = makeStyles(() => ({
  root: {
    background:
      'linear-gradient(180deg, rgba(250, 93, 185, 1) 0%, rgba(239, 35, 35, 1) 100% )',
  },
  grid: {
    height: '90%',
  },
  NumberPoint: {
    display:'flex',
    fontWeight: 600,
    marginRight:-70,
    fontSize:45

  },
}));

function Home() {
  const [isShow, setIsShow] = useState(false);

  const user = JSON.parse(localStorage.getItem('user')!)
    ? JSON.parse(localStorage.getItem('user')!)
    : null;

  const {
    openPuntosError,
    setOpenPuntosError,
    msnPuntosError,
    puntos,
  } = usePuntos();

  const {
    CallbackCloseSession,
    CallbackUserNull,
    messageError,
    openError,
    setOpenError,
  } = useCloseSession();

  const leaveLobby = () => {
    CallbackCloseSession();
  };

  useEffect(() => {
    if (user === null) {
      CallbackUserNull();
    }
    return () => user;
  }, [CallbackUserNull, user]);

  const classes = useStyles();
  return (
    <Box  position="relativo" height="100vh" p={1}>
      <Box
        position="absolute"
        top="-20%"
        left="-30%"
        zIndex="-9999"
        minHeight="160vh"
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
            Cerrar Sesión
          </Button>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        spacing={1}
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
                variant="h3"
                component="h2"
                align="right"
                className={classes.NumberPoint}
              >
                {puntos?.cantidadPuntosDisponibles ? (
                  <Odometer
                    value={Number(puntos?.cantidadPuntosDisponibles)}
                    format="(.ddd),dd"
                  />
                ) : (
                  <Typography variant="body2" component="span" align="right">
                    0
                  </Typography>
                )}
              </Typography>
            </Grid>
            <Grid item>
              <Typography style={{ marginRight:-70 }} variant="h4" component="p">
                Puntos Totales{' '}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xl={8} lg={8} md={8} sm={8} xs={8}>
          <Grid
            container
            alignItems="flex-end"
            justify="flex-end"
            direction="row"
          >
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <Box display="flex" flexDirection="column" alignItems="flex-end" justifyContent="space-between" p={2}>
                <Typography
                  variant="h3"
                  component="h2"
                  color="secondary"
                  align="right"
                  className={classes.NumberPoint}
                >
                  {isShow && user ? user?.nombre : ''}
                </Typography>
                <Box display="flex" flexDirection="row" alignItems="flex-end" justifyContent="space-between">
                <Button
                  size="small"
                  onClick={() => setIsShow(!isShow)}
                  variant="text"
                  color="secondary"
                >
                  {isShow ? 'Ocultar' : 'Mostrar'}
                </Button>
                
                {
                  user?.clave === Iclave.FIJA ? <ChangePassowrd /> : null
                }
                
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <NavButton />
          </Grid>
        </Grid>

      </Grid>
      {messageError ? (
        <Alert
          open={openError}
          onClose={() => setOpenError(false)}
          message={messageError}
        />
      ) : null}

      {msnPuntosError ? (
        <Alert
          open={openPuntosError}
          onClose={() => {
            setOpenPuntosError(false);
          }}
          message={msnPuntosError}
        />
      ) : null}
    </Box>
  );
}

export default React.memo(Home);
