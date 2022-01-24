/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Box, Button, Grid, makeStyles, Typography } from '@material-ui/core';
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
    bottom: -140,
    right: -110,
    zIndex: -1,
  },
  blue: {
    height: 250,
    width: 250,
    borderRadius: 999,
    background: 'linear-gradient(180deg, #3af0b0 0%, #029af9 100%)',
    position: 'absolute',
    top: -150,
    right: -150,
    zIndex: -1,
  },
  items: {
    padding: theme.spacing(0.5),
  },
  vence: {
    fontWeight: 'bold',
    color: theme.palette.secondary.main,
  },
  disponibles: {
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(0.5),
    border: 'none',
  },
  itemGrid: {
    width: '96%',
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
      <Grid container direction="column" spacing={1}>
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
            <Grid item lg={8} md={8} sm={8} xs={8}>
              <Grid container alignItems="flex-end" style={{ marginBottom: 5 }}>
                <Typography variant="h4" align="right" component="p">
                  Detalle de puntos
                </Typography>
              </Grid>
              <Grid
                container
                direction="column"
                spacing={2}
                alignItems="flex-end"
              >
                <Grid item className={classes.itemGrid}>
                  <Grid
                    container
                    direction="row"
                    spacing={3}
                    alignItems="center"
                    justify="space-between"
                    className={classes.items}
                  >
                    <Typography variant="h5" align="right" component="p">
                      Iniciales hoy
                    </Typography>
                    <Typography
                      variant="h3"
                      align="right"
                      component="p"
                      style={{ fontWeight: 'normal' }}
                    >
                      {puntos?.cantidadPuntosDisponibles
                        ? formatNumber(puntos?.cantidadPuntosDisponibles)
                        : 'cargando..'}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid item className={classes.itemGrid}>
                  <Grid
                    container
                    direction="row"
                    spacing={3}
                    alignItems="center"
                    justify="space-between"
                    className={classes.items}
                  >
                    <Typography variant="h5" align="right" component="p">
                      Acomulados hoy
                    </Typography>
                    <Typography
                      variant="h3"
                      align="right"
                      component="p"
                      style={{ fontWeight: 'normal' }}
                    >
                      {puntos?.cantidadPuntosDisponibles
                        ? formatNumber(puntos?.cantidadPuntosDisponibles)
                        : 'cargando..'}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid item className={classes.itemGrid}>
                  <Grid
                    container
                    direction="row"
                    spacing={3}
                    alignItems="center"
                    justify="space-between"
                    className={classes.items}
                  >
                    <Typography variant="h5" align="right" component="p">
                      Redimidos hoy
                    </Typography>
                    <Typography
                      variant="h3"
                      align="right"
                      component="p"
                      style={{ fontWeight: 'normal' }}
                    >
                      -{' '}
                      {puntos?.cantidadPuntosDisponibles
                        ? formatNumber(puntos?.cantidadPuntosDisponibles)
                        : 'cargando..'}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid item className={classes.itemGrid}>
                  <Grid
                    container
                    direction="row"
                    spacing={3}
                    alignItems="center"
                    justify="space-between"
                    className={classes.disponibles}
                  >
                    <Typography
                      variant="h5"
                      align="right"
                      component="p"
                      style={{ fontWeight: 'bolder' }}
                    >
                      Disponibles
                    </Typography>
                    <Typography
                      variant="h3"
                      align="right"
                      component="p"
                      style={{ fontWeight: 'bolder' }}
                    >
                      {puntos?.cantidadPuntosDisponibles
                        ? formatNumber(puntos?.cantidadPuntosDisponibles)
                        : 'cargando..'}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item lg={4} md={4} sm={4} xs={4}>
              <Box
                padding={4}
                justifyContent="center"
                alignItems="center"
                justifyItems="center"
              >
                <Typography variant="h5" align="right" component="p">
                  Puntos a vencer
                </Typography>
                <Typography
                  variant="h3"
                  align="right"
                  component="p"
                  className={classes.vence}
                >
                  {puntos?.cantidadPuntosRedimidos
                    ? formatNumber(puntos?.cantidadPuntosRedimidos)
                    : 'cargando..'}
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
