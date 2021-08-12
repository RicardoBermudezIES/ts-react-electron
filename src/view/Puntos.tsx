import { Box, Button, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';
import { formatNumber, shortName } from '../helpers/format';
const useStyles = makeStyles(() => ({
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
}));

export default function Puntos() {
  const classes = useStyles();
  const history = useHistory();

  const user = JSON.parse(localStorage.getItem('user'));
  const puntos = JSON.parse(localStorage.getItem('puntos'));
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
            style={{fontWeight:"bold"}}>
                {user ? shortName(user?.nombre) : 'Anonimo'}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        {/* fin del header */}
        <Box p={2}>
          <Grid container direction="row" spacing={3}>
            <Grid item lg={6} md={6} sm={6} xs={6}>
              <Typography variant="h1" align="center" component="p" style={{fontWeight:"bold"}}>
                {puntos?.cantidadPuntosDisponibles
                  ? formatNumber(puntos?.cantidadPuntosDisponibles)
                  : 'cargando..'}
              </Typography>
              <Typography variant="h4" align="center" component="p">
                Puntos Totales
              </Typography>
            </Grid>
            <Grid item lg={6} md={6} sm={6} xs={6}>
              <Typography variant="h1" align="center" component="p"  style={{fontWeight:"bold"}}>
                {puntos?.cantidadPuntosRedimidos
                  ? formatNumber(puntos?.cantidadPuntosRedimidos)
                  : 'cargando..'}
              </Typography>
              <Typography variant="h4" align="center" component="p">
                Puntos hoy
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Box>
  );
}
