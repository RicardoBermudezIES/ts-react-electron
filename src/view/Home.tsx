import React, { useEffect, useState } from 'react';
import { Button, Box, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Odometer from 'react-odometerjs';
import NavButton from '../component/NavButton';
import Alert from '../component/Alert/Alert';
import usePuntos from '../Hook/usePuntos';
import useCloseSession from '../Hook/useCloseSession';

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
  const [isShow, setIsShow] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'))
    ? JSON.parse(localStorage.getItem('user'))
    : null;

  const { puntos } = usePuntos();

  const { CloseSession, messageError, openError } = useCloseSession();

  const goToLogin = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('puntos');
    history.push('/login');
  };

  useEffect(() => {
    user === null ? goToLogin() : null;
  }, []);

  const leaveLobby = () => {
    CloseSession();
  };

  const classes = useStyles();
  return (
    <Box height="100vh" p={1}>
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
        spacing={2}
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
                    cargando puntos
                  </Typography>
                )}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h4" component="p">
                Puntos Totales{' '}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
          <Grid
            container
            alignItems="flex-end"
            justify="flex-end"
            direction="column"
          >
            <Grid item xl={10} lg={10} md={10} sm={10} xs={10}>
              <Box display="flex" flexDirection="column">
                <Typography
                  variant="h2"
                  component="h2"
                  color="secondary"
                  align="right"
                  className={classes.NumberPoint}
                >
                  {isShow && user ? user?.nombre : ''}
                </Typography>
                <Button
                  size="small"
                  onClick={() => setIsShow(!isShow)}
                  variant="contained"
                  color="secondary"
                >
                  {isShow ? 'Ocultar nombre' : 'Mostrar nombre'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
          <NavButton />
        </Grid>
      </Grid>
      {messageError ? (
        <Alert
          open={openError}
          onClose={() => setOpenError(false)}
          message={messageError}
        />
      ) : null}
    </Box>
  );
}

export default React.memo(Home);
