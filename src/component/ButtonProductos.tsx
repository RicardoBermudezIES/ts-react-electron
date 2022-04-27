/* eslint-disable no-nested-ternary */
/* eslint-disable import/prefer-default-export */
import {
  Button,
  Chip, Grid,
  makeStyles, Typography
} from '@material-ui/core';
import { AlarmAddRounded, SendRounded } from '@material-ui/icons';
import React from 'react';
import { formatMoney, formatNumber } from '../helpers/format';
import useDinamica from '../Hook/useDinamica';
import useListarPedido from '../Hook/useListarPedido';
import { Iclave } from '../types/clave';
import { IProduct } from '../types/Products';
import ValidarClaveDinamicaComponent from './ClaveDinamica/ClaveDinamica';
import ValidarClaveFijaComponent from './validarClaveFija/ValidarClaveFija';
interface Props {
  p: IProduct;
}

const useStyles = makeStyles((theme) => ({
  chipPending: {
    background: theme.palette.warning.main,
    color: '#000',
  },
  chipSend: {
    background: theme.palette.success.main,
    color: '#fff',
  },
}));

export const ButtonProductos = ({ p }: Props): JSX.Element => {
  const classes = useStyles();
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
  const puntos = JSON.parse(localStorage.getItem('puntos')!);

  const [openFija, setOpenFija] = React.useState(false);

  const [openDinamica, setOpenDinamica] = React.useState(false);

  const [pk, setPk] = React.useState('');

  const {
    callbackSolictarClave
  } = useDinamica();

  const handleCloseFija = () => {
    setOpenFija(false);
  };

  const handleCloseDinamica = () => {
    setOpenDinamica(false);
  };

  const redimir = (pk: string) => {
    setPk(pk);
    if (user?.clave === Iclave.FIJA) {
      setOpenFija(true);
    }
    if (user?.clave === Iclave.DINAMICA) {
      callbackSolictarClave()
      setOpenDinamica(true);
    }
    if (user?.clave === Iclave.NINGUNA) {
      doRedimir(p?.pk);
    }
  };

  return (
    <>
      {hasQueque(p?.pk, 'EN_COLA') ? (
        <>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Grid
              container
              direction="row"
              alignItems="center"
              alignContent="center"
              justify="center"
              spacing={2}
            >
              <Grid item lg={6} md={6} sm={6} xs={6}>
                <Button
                  onClick={() => cancelarPeticion(p?.pk)}
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
                  disabled
                  variant="contained"
                  color="primary"
                  size="medium"
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
              <Chip
                icon={<AlarmAddRounded />}
                className={classes.chipPending}
                label="Pendiente"
                color="secondary"
              />
            </Grid>
          </Grid>
        </>
      ) : hasQueque(p?.pk, 'EN_CAMINO') ? (
        <>
          <Grid
            container
            direction="row"
            alignItems="center"
            alignContent="center"
            justify="center"
            spacing={3}
          >
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
                size="medium"
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
              <Chip
                icon={<SendRounded style={{ color: '#fff' }} />}
                className={classes.chipSend}
                label="Enviado"
              />
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          <Grid item lg={6} md={6} sm={6} xs={6}>
            <Grid
              container
              direction="row"
              alignItems="center"
              alignContent="center"
              justify="center"
              spacing={1}
            >
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Typography variant="h5" align="center">
                  Puntos
                  <Typography variant="h5" align="center">
                    {formatNumber(p?.puntosParaCanjear)}
                  </Typography>
                </Typography>
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12} alignItems="flex-end">
                <Button
                  disabled={
                    user === null ||
                    !(
                      Number(puntos?.cantidadPuntosDisponibles) >=
                      Number(p?.puntosParaCanjear)
                    )
                  }
                  onClick={() => redimir(p?.pk)}
                  variant="contained"
                  color="secondary"
                  size="medium"
                >
                  redimir
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid item lg={6} md={6} sm={6} xs={6}>
            <Grid
              container
              direction="row"
              spacing={1}
              alignItems="center"
              justify="center"
            >
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Typography variant="h5" align="center">
                  Precio
                  <Typography variant="h5" align="center">
                    {formatMoney(p?.valorParaCanjear)}
                  </Typography>
                </Typography>
              </Grid>
              <Grid
                item
                lg={12}
                md={12}
                sm={12}
                xs={12}
                alignItems="flex-start"
              >
                <Button
                  onClick={() => doBuy(p?.pk)}
                  variant="contained"
                  color="primary"
                  size="medium"
                >
                  Comprar
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <ValidarClaveFijaComponent  pk={pk} openFija={openFija} handleCloseFija={handleCloseFija} />

         <ValidarClaveDinamicaComponent pk={pk} openDinamica={openDinamica} handleCloseDinamica={handleCloseDinamica}   />
         
        </>
      )}
    </>
  );
};
