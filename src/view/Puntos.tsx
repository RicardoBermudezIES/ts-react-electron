/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Box,
  Button,
  Divider,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';
import { formatNumber, shortName } from '../helpers/format';
const useStyles = makeStyles((theme) => ({
  root: {
    overflowX: 'hidden',
    height: '100%',
  },
  red: {
    height: 250,
    width: 250,
    borderRadius: 999,
    background:
      'linear-gradient(180deg, rgba(250, 93, 185, 1) 0%, rgba(239, 35, 35, 1) 100% )',
    position: 'absolute',
    bottom: -150,
    left: -100,
    zIndex: -1,
  },
  blue: {
    height: 250,
    width: 250,
    borderRadius: 999,
    background: 'linear-gradient(180deg, #3af0b0 0%, #029af9 100%)',
    position: 'absolute',
    top: -100,
    right: -150,
    zIndex: -1,
  },
  divider: {
    width: '40%',
    height: 1,
    backgroundColor: theme.palette.error.main,
    border: 'none',
  },
}));

export default function Puntos() {
  const classes = useStyles();
  const history = useHistory();

  const user = JSON.parse(localStorage.getItem('user')!);
  const puntos = JSON.parse(localStorage.getItem('puntos')!);
  return (
    <Box p={2} className={classes.root}>
      <Box className={classes.red} />
      <Box className={classes.blue} />
      <Grid container direction="column" spacing={3}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Grid container direction="row" spacing={2} alignItems="center">
            <Grid item lg={2} md={2} sm={2} xs={2}>
              <Button
                size="large"
                variant="contained"
                color="primary"
                onClick={() => history.goBack()}
              >
                Volver
              </Button>
            </Grid>
            <Grid item lg={8} md={8} sm={8} xs={8}>
              <Typography
                variant="h3"
                component="p"
                align="right"
                style={{ fontWeight: 'bold' }}
              >
                {user ? shortName(user?.nombre) : 'Anonimo'}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        {/* fin del header */}
        <Box p={2}>
          <Grid container direction="row" spacing={3}>
            <Grid item lg={6} md={6} sm={6} xs={6}>
              <Grid
                container
                direction="column"
                spacing={3}
                alignItems="flex-end"
              >
                <Grid item>
                  <Grid
                    container
                    direction="row"
                    spacing={3}
                    alignItems="center"
                    justify="center"
                  >
                    <Typography variant="h5" align="right" component="p">
                      Puntos Totales
                    </Typography>
                    <Typography
                      variant="h3"
                      align="right"
                      component="p"
                      style={{ fontWeight: 'bold' }}
                    >
                      {puntos?.cantidadPuntosDisponibles
                        ? formatNumber(puntos?.cantidadPuntosDisponibles)
                        : 'cargando..'}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid item>
                  <Grid
                    container
                    direction="row"
                    spacing={3}
                    alignItems="center"
                    justify="center"
                  >
                    <Typography variant="h5" align="right" component="p">
                      Puntos hoy
                    </Typography>
                    <Typography
                      variant="h3"
                      align="right"
                      component="p"
                      style={{ fontWeight: 'bold' }}
                    >
                      {puntos?.cantidadPuntosDisponibles
                        ? formatNumber(puntos?.cantidadPuntosDisponibles)
                        : 'cargando..'}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid item>
                  <Grid
                    container
                    direction="row"
                    spacing={3}
                    alignItems="center"
                    justify="center"
                  >
                    <Typography variant="h5" align="right" component="p">
                      - Puntos Redimidos
                    </Typography>
                    <Typography
                      variant="h3"
                      align="right"
                      component="p"
                      style={{ fontWeight: 'bold' }}
                    >
                      {puntos?.cantidadPuntosDisponibles
                        ? formatNumber(puntos?.cantidadPuntosDisponibles)
                        : 'cargando..'}
                    </Typography>
                  </Grid>
                </Grid>

                <Divider variant="fullWidth" className={classes.divider} />

                <Grid item>
                  <Grid
                    container
                    direction="row"
                    spacing={3}
                    alignItems="center"
                    justify="center"
                  >
                    <Typography variant="h5" align="right" component="p">
                      Puntos Disponibles
                    </Typography>
                    <Typography
                      variant="h3"
                      align="right"
                      component="p"
                      style={{ fontWeight: 'bold' }}
                    >
                      {puntos?.cantidadPuntosDisponibles
                        ? formatNumber(puntos?.cantidadPuntosDisponibles)
                        : 'cargando..'}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={6}>
              <Box
                padding={4}
                justifyContent="center"
                alignItems="center"
                justifyItems="center"
              >
                <Typography
                  variant="h3"
                  align="right"
                  component="p"
                  style={{ fontWeight: 'bold' }}
                >
                  {puntos?.cantidadPuntosRedimidos
                    ? formatNumber(puntos?.cantidadPuntosRedimidos)
                    : 'cargando..'}
                </Typography>
                <Typography variant="h5" align="right" component="p">
                  Puntos a vencer
                </Typography>
                <Typography variant="h5" align="right" component="p">
                  01/05/2021
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Box>
  );
}
