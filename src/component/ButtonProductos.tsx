/* eslint-disable no-nested-ternary */
/* eslint-disable import/prefer-default-export */
import React from 'react';
import { Button, Chip, Grid, Typography } from '@material-ui/core';
import { formatMoney, formatNumber } from '../helpers/format';
import useListarPedido from '../Hook/useListarPedido';
import { IProduct } from '../types/Products';

interface Props {
  p: IProduct;
}

export const ButtonProductos = ({ p }: Props): JSX.Element => {
  const {
    hasQueque,
    doBuy,
    doRedimir,
    cancelarPeticion,
    confirmarPeticion,
  } = useListarPedido();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const user = JSON.parse(localStorage.getItem('user')!);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const puntos = JSON.parse(localStorage.getItem('puntosDiaxBar')!);
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
            <Grid
              style={{ marginTop: 10 }}
              container
              justify="center"
              alignItems="center"
              spacing={1}
            >
              <Chip label="Pendiente" color="secondary" />
            </Grid>
          </Grid>
        </>
      ) : hasQueque(p?.pk, 'EN_CAMINO') ? (
        <>
          <Grid container direction="row" alignItems="center" spacing={1}>
            <Grid item lg={6} md={6} sm={6} xs={6}>
              <Button
                onClick={() => cancelarPeticion(p?.pk)}
                disabled
                variant="contained"
                color="secondary"
                size="small"
              >
                Anular
              </Button>
            </Grid>

            <Grid item lg={6} md={6} sm={6} xs={6}>
              <Button
                onClick={() => confirmarPeticion(p?.pk)}
                variant="contained"
                color="primary"
                size="small"
              >
                Aceptar
              </Button>
            </Grid>
            <Grid
              style={{ marginTop: 10 }}
              container
              justify="center"
              alignItems="center"
              spacing={1}
            >
              <Chip label="En proceso" color="primary" />
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          <Grid item lg={6} md={6} sm={6} xs={6}>
            <Grid container direction="row" alignItems="center" spacing={1}>
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
                  disabled={user === null || puntos < p?.puntosParaCanjear}
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
