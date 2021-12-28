/* eslint-disable no-nested-ternary */
/* eslint-disable import/prefer-default-export */
import { Button, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { formatMoney, formatNumber } from '../helpers/format';
import useListarPedido from '../Hook/useListarPedido';

export const ButtonProductos = ({ p }) => {
  const {
    hasQueque,
    doBuy,
    doRedimir,
    cancelarPeticion,
    confirmarPeticion,
  } = useListarPedido();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const user = JSON.parse(localStorage.getItem('user')!);

  return (
    <>
      {hasQueque(p?.pk, 'EN_COLA') ? (
        <>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Grid container direction="row" alignItems="center" spacing={1}>
              <Grid item lg={6} md={6} sm={6} xs={6}>
                <Button
                  onClick={() => cancelarPeticion(p?.pk)}
                  variant="contained"
                  color="secondary"
                >
                  Anular
                </Button>
              </Grid>

              <Grid item lg={6} md={6} sm={6} xs={6}>
                <Button
                  onClick={() => confirmarPeticion(p?.pk)}
                  disabled
                  variant="contained"
                  color="primary"
                >
                  Aceptar
                </Button>
              </Grid>
            </Grid>
            <Typography
              style={{ color: '#efb810' }}
              variant="h4"
              align="center"
            >
              En cola
            </Typography>
          </Grid>
        </>
      ) : hasQueque(p?.pk, 'EN_CAMINO') ? (
        <>
          <Grid container direction="row" alignItems="center" spacing={2}>
            <Grid item lg={6} md={6} sm={6} xs={6}>
              <Button
                onClick={() => cancelarPeticion(p?.pk)}
                disabled
                variant="contained"
                color="secondary"
                size="medium"
              >
                Anular
              </Button>
            </Grid>

            <Grid item lg={6} md={6} sm={6} xs={6}>
              <Button
                onClick={() => confirmarPeticion(p?.pk)}
                variant="contained"
                color="primary"
              >
                Aceptar
              </Button>
            </Grid>
            <Typography
              style={{ color: '#efb810' }}
              variant="h4"
              align="center"
            >
              En camino
            </Typography>
          </Grid>
        </>
      ) : (
        <>
          <Grid item lg={6} md={6} sm={6} xs={6}>
            <Grid container direction="row" alignItems="center" spacing={2}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Typography variant="h5" align="center">
                  Puntos
                  <Typography variant="h5" align="center">
                    {formatNumber(p?.puntosParaCanjear)}
                  </Typography>
                </Typography>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Button
                  disabled={user === null}
                  onClick={() => doRedimir(p?.pk)}
                  variant="contained"
                  color="secondary"
                  size="large"
                >
                  redimir
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid item lg={6} md={6} sm={6} xs={6}>
            <Grid container direction="row" spacing={2} alignItems="center">
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Typography variant="h5" align="center">
                  Precio
                  <Typography variant="h5" align="center">
                    {formatMoney(p?.valorParaCanjear)}
                  </Typography>
                </Typography>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Button
                  onClick={() => doBuy(p?.pk)}
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  Comprar
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};