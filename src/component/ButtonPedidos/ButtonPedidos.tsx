import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { AlarmAddRounded, SendRounded } from '@material-ui/icons';
import React, { ReactElement } from 'react';
import { formatMoney, formatNumber } from '../../helpers/format';
import useListarPedido from '../../Hook/useListarPedido';
import Cart from '../../iconos/Cart';
import { IProduct } from '../../types/Products';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '8px !important',
    gap: 12,
    '&:last-child': {
      padding: 0,
    },
  },
  details: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-betwween',
    gap: 16,
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 90,
    height: 90,
    objectFit: 'cover',
    backgroundSize: 'contain',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  notificationYellow: {
    width: 32,
    height: 32,
    backgroundColor: 'yellow',
    position: 'absolute',
    top: 0,
    right: 0,
    borderRadius: 99,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationGreen: {
    width: 32,
    height: 32,
    backgroundColor: 'Green',
    position: 'absolute',
    top: 0,
    right: 0,
    borderRadius: 99,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipPending: {
    background: theme.palette.warning.main,
    color: '#000',
  },
  chipSend: {
    background: theme.palette.success.main,
    color: '#fff',
  },
}));

export default function ButtonPedidos(): ReactElement {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const {
    pedidos,
    cancelarPeticion,
    confirmarPeticion,
    getListProducts,
  } = useListarPedido();

  const handleClickOpen = () => {
    setOpen(true);
    getListProducts();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const CancelPedido = (pk: string) => {
    cancelarPeticion(pk);
    getListProducts();
  };

  const ConfirmPedido = (pk: string) => {
    confirmarPeticion(pk);
    getListProducts();
  };

  return (
    <div>
      <Button
        style={{ display: 'grid', position: 'relative' }}
        onClick={handleClickOpen}
      >
        {pedidos?.length > 0 ? (
          <Box
            className={`${
              pedidos[0].estado === 'EN_COLA'
                ? classes.notificationYellow
                : classes.notificationGreen
            }`}
          >
            {pedidos?.length}
          </Box>
        ) : (
          ''
        )}
        <Cart />
        <Typography component="p" variant="h6" style={{ color: 'white' }}>
          Pedidos
        </Typography>
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
        <DialogTitle>Mis Pedidos</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Grid
              container
              direction="row"
              justify="center"
              alignContent="center"
              spacing={1}
            >
              {pedidos?.length > 0 ? (
                pedidos?.map((pedido: IProduct) => (
                  <Grid item key={pedido?.pk}>
                    <Card variant="outlined" className={classes.root}>
                      <CardMedia
                        className={classes.cover}
                        image={
                          pedido?.imagen
                            ? pedido?.imagen
                            : 'https://via.placeholder.com/150'
                        }
                        title={pedido.nombre}
                      />
                      <Box className={classes.details}>
                        <CardContent className={classes.content}>
                          <Typography component="p" variant="h5">
                            {pedido.nombre}
                          </Typography>
                          <Typography
                            component="p"
                            variant="subtitle1"
                            color="textSecondary"
                          >
                            {pedido.categoriaPremio}
                          </Typography>
                          <Chip
                            size="medium"
                            icon={
                              pedido.estado === 'EN_COLA' ? (
                                <AlarmAddRounded />
                              ) : (
                                <SendRounded style={{ color: '#fff' }} />
                              )
                            }
                            className={`${
                              pedido.estado === 'EN_COLA'
                                ? classes.chipPending
                                : classes.chipSend
                            }`}
                            label={
                              pedido.estado === 'EN_COLA'
                                ? 'Pendiente'
                                : 'Enviado'
                            }
                          />
                        </CardContent>

                        <Box className={classes.controls}>
                          <Typography component="p" variant="h5">
                            {pedido.medioPago === 'Efectivo'
                              ? formatMoney(pedido.valorParaCanjear)
                              : formatNumber(pedido.puntosParaCanjear)}
                          </Typography>
                          {pedido.estado === 'EN_COLA' ? (
                            <Button
                              size="medium"
                              variant="contained"
                              color="primary"
                              onClick={() => CancelPedido(pedido.pk)}
                            >
                              {' '}
                              Anular
                            </Button>
                          ) : (
                            <Button
                              size="medium"
                              variant="contained"
                              color="secondary"
                              onClick={() => ConfirmPedido(pedido.pk)}
                            >
                              {' '}
                              Confirmar
                            </Button>
                          )}
                        </Box>
                      </Box>
                    </Card>
                  </Grid>
                ))
              ) : (
                <Typography
                  color="error"
                  align="center"
                  component="p"
                  variant="h5"
                >
                  Sin pedidos
                </Typography>
              )}
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="contained"
            color="primary"
            autoFocus
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
