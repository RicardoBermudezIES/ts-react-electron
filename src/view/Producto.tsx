/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-shadow */
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  makeStyles,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CardMedia,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';
import { formatNumber, shortName } from '../helpers/format';
import Alert from '../component/Alert/Alert';
import useListarPedido from '../Hook/useListarPedido';
import { ButtonProductos } from '../component/ButtonProductos';
import { IProduct } from '../types/Products';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    gridAutoFlow: 'column',
    overflowX: 'hidden',
    gap: '1rem',
    maxWidth: '1200px',
    margin: '50px auto',
    padding: '1rem 0',
  },
  item: {
    height: 280,
    minWidth: 500,
    width: 'fit-content',
    padding: '0 1em',
    alignItems: 'center',
    background: 'linear-gradient(180deg, #019aff 0%, #181d45 100%);',
    borderRadius: 20,
    color: '#fff',
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },
  CardAction: {
    width: '95%',
    margin: '0 auto',
  },
  cover: {
    minWidth: 120,
    width: 120,
    minHeight: 300,
    maxHeight: 100,
    objectFit: 'cover',
    backgroundSize: 'auto !important',
    marginBottom: 20,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function Io() {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const barList = JSON.parse(localStorage.getItem('bar')!);
  const classes = useStyles();
  const history = useHistory();

  const param = useParams();
  const [Ios] = useState<IProduct[]>(
    barList.filter(
      (bar: { categoriaPremio: string }) => bar?.categoriaPremio === param?.id
    )
  );
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const puntos = JSON.parse(localStorage.getItem('puntosDiaxBar')!);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const user = JSON.parse(localStorage.getItem('user')!);

  const [currentItemIdx, setCurrentItemgIdx] = useState(0);

  const {
    openError,
    setOpenError,
    messageError,
    handleCloseRedimirModal,
    CloseModalBuy,
    redimirModal,
    buyModal,
  } = useListarPedido();

  const prevSlide = () => {
    if (Ios) {
      const resetToVeryBack = currentItemIdx === 0;
      const index = resetToVeryBack ? Ios.length - 1 : currentItemIdx - 1;
      setCurrentItemgIdx(index);
    }
  };

  const nextSlide = () => {
    if (Ios) {
      const resetIndex = currentItemIdx === Ios.length - 1;
      const index = resetIndex ? 0 : currentItemIdx + 1;
      setCurrentItemgIdx(index);
    }
  };

  const activeItemsSourcesFromState = Ios
    ? Ios.slice(currentItemIdx, currentItemIdx + 2)
    : [];

  const itemsSourcesToDisplay = () => {
    if (Ios) {
      return activeItemsSourcesFromState.length < 2
        ? [
            ...activeItemsSourcesFromState,
            ...Ios.slice(0, 2 - activeItemsSourcesFromState.length),
          ]
        : activeItemsSourcesFromState;
    }
    return [];
  };

  return (
    <Box p={1}>
      <Grid container direction="column" spacing={3}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Grid
            container
            direction="row"
            spacing={2}
            alignItems="center"
            alignContent="center"
            justify="space-between"
          >
            <Grid item lg={2} md={2} sm={2} xs={2}>
              <Button
                size="large"
                variant="contained"
                color="primary"
                onClick={() => history.go(-1)}
              >
                Volver
              </Button>
            </Grid>
            <Grid item lg={7} md={7} sm={7} xs={7}>
              <Typography
                variant="h3"
                component="p"
                align="center"
                style={{ fontWeight: 'bold' }}
              >
                {user ? shortName(user.nombre) : 'Anónimo'}
              </Typography>
            </Grid>
            <Grid item lg={3} md={3} sm={3} xs={3}>
              <Typography
                variant="h4"
                align="right"
                component="p"
                style={{ fontWeight: 'bold' }}
              >
                {user ? formatNumber(Number(puntos)) : null}
              </Typography>
              <Typography component="p" variant="h6" align="right">
                Puntos
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        {/* fin del header */}

        <Box width="100%" display="flex" alignItems="center">
          <Grid id="left" onClick={prevSlide}>
            <Button style={{ color: 'white' }}>
              <ArrowBackIos style={{ fontSize: 80 }} />
            </Button>
          </Grid>

          <Box id="content" className={classes.root}>
            {Ios
              ? itemsSourcesToDisplay().map((p) => (
                  <Card key={p.nombre} className={classes.item}>
                    <CardContent className={classes.content}>
                      <CardMedia
                        className={classes.cover}
                        image={p.imagen}
                        title={p.imagen}
                      />
                      <Box className={classes.details}>
                        <Typography component="p" variant="h4" align="center">
                          {p.nombre}
                        </Typography>
                        <Typography component="p" variant="h4" align="center">
                          Disponibles: {p.unidadesDisponibles}
                        </Typography>
                        <Grid
                          style={{ marginBottom: 30, padding: 15 }}
                          container
                          justify="space-between"
                          alignContent="center"
                        >
                          <ButtonProductos p={p} />
                        </Grid>
                      </Box>
                    </CardContent>
                  </Card>
                ))
              : 'cargando...'}
          </Box>

          <Grid onClick={nextSlide}>
            <Button style={{ color: 'white' }}>
              <ArrowForwardIos style={{ fontSize: 80 }} />
            </Button>
          </Grid>
        </Box>
      </Grid>

      <Dialog fullWidth maxWidth="sm" open={buyModal} onClose={CloseModalBuy}>
        <DialogTitle>Comprado</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography component="p" variant="h4" align="center">
              En un momento, le traeran su pedido.
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={CloseModalBuy} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        fullWidth
        maxWidth="sm"
        open={redimirModal}
        onClose={handleCloseRedimirModal}
      >
        <DialogTitle> Redimido</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography component="p" variant="h4" align="center">
              En un momento, le traeran su pedido.
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRedimirModal} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

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
