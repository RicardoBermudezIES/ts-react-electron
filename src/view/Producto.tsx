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
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';
import { formatMoney, formatNumber, shortName } from '../helpers/format'
import { ipcRenderer } from 'electron';
import Alert from '../component/Alert/Alert';

const ipc = ipcRenderer;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    overflowX: 'scroll',
    scrollBehavior: 'smooth',
    overflowWrap: 'anywhere',
    height: 300,
    maxWidth: '70%',
    margin: '0 auto',
    padding: '1rem 0',
  },
  item: {
    height: 280,
    minWidth: 600,
    width: 'fit-content',
    margin: '0 1em',

    alignItems: 'center',
    background: 'linear-gradient(180deg, #019aff 0%, #181d45 100%);',
    borderRadius: 20,
    color: '#fff',
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  CardAction: {
    width: '90%',
    margin: '0 auto',
  },
  cover: {
    minWidth: 152,
    width: '40%',
    minHeight:300,
    maxHeight: 100,
    objectFit: 'cover',
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

export default function Producto() {

  const  barList = JSON.parse(localStorage.getItem('bar'))
  const [productos,] = useState(barList);
  const [scroll, setScroll] = useState(0);
  const [isMax, setIsMax] = useState(false);
  const classes = useStyles();
  const history = useHistory();

  const param = useParams()
  const puntos = JSON.parse(localStorage.getItem('puntos'));
  const user = JSON.parse(localStorage.getItem('user'));

  const [buyModal, setBuyModal] = useState(false);
  const [redimirModal, setRedimirModal] = useState(false);

  const [openError, setOpenError] = useState(false);
  const [messageError, setmessageError] = useState('');

  const GotoLeft = () => {
    const content = document.getElementById('content');
    const scroll = (content.scrollLeft -= 300);
    setScroll(scroll);
    if (scroll <= content.scrollWidth) {
      setIsMax(false);
    }
  };

  const GotoRight = () => {
    const content = document.getElementById('content');
    let scroll2 = 0;
    if (scroll > content.scrollWidth ) {
      setIsMax(true);
    }
    scroll2 = content.scrollLeft += 300;
    setScroll(scroll2);
  };

  const doBuy = (puk: string) => {

    const auth = JSON.parse(localStorage.getItem('authConfig'));
    ipc.send('allways-auth', auth);
     const user = JSON.parse(localStorage.getItem('user'));
     const maquina = localStorage.getItem('maquina');
     const localToken = localStorage.getItem('token');

  const args = {
    host: auth.host,
    numeroDocumento: user.numeroDocumento,
    maquina: maquina,
    token: localToken,
    puk:puk
  };


   ipc.send('comprar-productos', args);


    handleOpenBuyModal();
  };

  const doRedimir = (puk: string) => {

    const auth = JSON.parse(localStorage.getItem('authConfig'));
    ipc.send('allways-auth', auth);
     const user = JSON.parse(localStorage.getItem('user'));
     const maquina = localStorage.getItem('maquina');
     const localToken = localStorage.getItem('token');

  const args = {
    host: auth.host,
    numeroDocumento: user.numeroDocumento,
    maquina: maquina,
    token: localToken,
    puk:puk
  };


   ipc.send('realizar-peticion', args);


  };

  const handleOpenBuyModal = () => {
    setBuyModal(true);
  };

  const handleCloseBuyModal = () => {
    setBuyModal(false);
  };

  const handleOpenRedimirModal = () => {
    setRedimirModal(true);
  };

  const handleCloseRedimirModal = () => {
    setRedimirModal(false);
  };

  useEffect(() => {
    ipc.on('comprar-productos', (event, arg) => {
      // eslint-disable-next-line no-console

      if (arg?.statusDTO?.code !== '00') {
        // eslint-disable-next-line no-console
        setmessageError(arg?.statusDTO?.message);
        setOpenError(true);

      }

      if (arg?.statusDTO?.code == '00') {
        handleOpenBuyModal();

      }
    });
  });

  useEffect(() => {
    ipc.on('realizar-peticion', (event, arg) => {
      // eslint-disable-next-line no-console

      if (arg?.statusDTO?.code !== '00') {
        // eslint-disable-next-line no-console
        setmessageError(arg?.statusDTO?.message);
        setOpenError(true);
      }

      if (arg?.statusDTO?.code == '00') {
          handleOpenRedimirModal();
      }
    });
  });

  return (
    <Box p={1}>
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
            <Grid item lg={7} md={7} sm={7} xs={7}>
              <Typography variant="h3" component="p"  align="center"  style={{fontWeight:"bold"}}>
                {user ? shortName(user.nombre) : 'Anonimo'}
              </Typography>
            </Grid>
            <Grid item lg={3} md={3} sm={3} xs={3}>
              <Typography variant="h4" align="right" component="p"  style={{fontWeight:"bold"}}>
                {puntos?.cantidadPuntosDisponibles ? (
                  formatNumber(Number(puntos?.cantidadPuntosDisponibles))
                ) : (
                  <Typography variant="body2" align="right" component="span">
                    cargando..
                  </Typography>
                )}
              </Typography>
              <Typography variant="h6" align="right" component="p">
                Puntos
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        {/* fin del header */}

        <Box width="100%" display="flex" alignItems="center">
          {scroll > 0 ? (
            <Grid id="left" onClick={GotoLeft}>
              <Button style={{ color: 'white' }}>
                <ArrowBackIos style={{ fontSize: 80 }} />
              </Button>
            </Grid>
          ) : null}

          <Box id="content" className={classes.root}>
            {productos
              ? productos.filter(bar => bar.categoriaPremio === param.id).map((p, i) => (
                  <Card key={i} className={classes.item}>
                    <CardContent className={classes.content}>
                    <CardMedia
                        className={classes.cover}
                        image={`data:image/png;base64,${p?.imagen}`}
                        title="Live from space album cover"
                      />
                      <Box className={classes.details}>
                      <Typography variant="h4" align="center">
                        {p?.nombre}
                      </Typography>
                      <Typography variant="h4" align="center">
                         Disponibles:  {p?.unidadesDisponibles}
                      </Typography>
                      <Grid
                        style={{ marginBottom: 30, padding: 20 }}
                        container
                        justify="space-between"
                        alignContent="center"
                      >
                        <Grid item  lg={6} md={6} sm={6} xs={6}>
                          <Grid
                            container
                            direction="row"
                            alignItems="center"
                            spacing={2}
                          >
                            <Grid item  lg={12} md={12} sm={12} xs={12}>
                              <Typography variant="h5" align="center">
                                Puntos
                                <Typography variant="h5" align="center">
                                  {formatNumber(p?.puntosParaCanjear)}
                                </Typography>
                              </Typography>
                            </Grid>
                            <Grid item  lg={12} md={12} sm={12} xs={12}>
                              <Button
                                disabled={user === null}
                                onClick={ ()=> doRedimir(p?.pk)}
                                variant="contained"
                                color="secondary"
                                size="large">
                                redimir
                              </Button>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item lg={6} md={6} sm={6} xs={6}>
                          <Grid
                            container
                            direction="row"
                            spacing={2}
                            alignItems="center"
                          >
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
                                onClick={()=> doBuy(p?.pk)}
                                variant="contained"
                                color="primary"
                                size="large"
                              >
                                Comprar
                              </Button>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      </Box>
                    </CardContent>
                  </Card>
                ))
              : 'cargando...'}
          </Box>

          {isMax ? null : (
            <Grid onClick={GotoRight}>
              <Button style={{ color: 'white' }}>
                <ArrowForwardIos style={{ fontSize: 80 }} />
              </Button>
            </Grid>
          )}
        </Box>
      </Grid>

      <Dialog
        fullWidth
        maxWidth="sm"
        open={buyModal}
        onClose={handleCloseBuyModal}
      >
        <DialogTitle>Producto Comprado</DialogTitle>
        <DialogContent>
          <DialogContentText>
            En un momento, le traeran su pedido.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseBuyModal} color="primary">
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
        <DialogTitle>Producto Redimido</DialogTitle>
        <DialogContent>
          <DialogContentText>
            En un momento, le traeran su pedido.
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
