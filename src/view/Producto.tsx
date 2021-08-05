import {
  Backdrop,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  makeStyles,
  Typography,
  Modal,
  Fade,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CardMedia,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';
import { formatMoney, formatNumber } from '../helpers/format'


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
  const [scroll, setScroll] = useState(0);
  const [isMax, setIsMax] = useState(false);
  const classes = useStyles();
  const history = useHistory();

  const puntos = JSON.parse(localStorage.getItem('puntos'));
  const user = JSON.parse(localStorage.getItem('user'));

  const [buyModal, setBuyModal] = useState(false);
  const [redimirModal, setRedimirModal] = useState(false);

  const GotoLeft = () => {
    const content = document.getElementById('content');
    const scroll = (content.scrollLeft -= 300);
    setScroll(scroll);
    if (scroll <= content.scrollWidth - window.outerWidth) {
      setIsMax(false);
    }
  };

  const GotoRight = () => {
    const content = document.getElementById('content');
    let scroll2 = 0;
    if (scroll > content.scrollWidth - (window.outerWidth)  ) {
      setIsMax(true);
    }
    console.log(content.scrollWidth - window.outerWidth, scroll)
    scroll2 = content.scrollLeft += 300;
    setScroll(scroll2);
  };

  const doBuy = () => {
    handleOpenBuyModal();
  };

  const doRedimir = () => {
    handleOpenRedimirModal();
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

  const productos = [
    { nombre: 'Alitas de BBQ', img:"https://i.ytimg.com/vi/2u9Uo5kLAog/maxresdefault.jpg", precio: 50000, puntos: 900000 },
    { nombre: 'Hamburguesa Premium', img:"https://scontent.fbog10-1.fna.fbcdn.net/v/t1.6435-9/75429611_2688963544488122_6773744964363878400_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=730e14&_nc_ohc=iK5jHXfOmeMAX86E3X3&_nc_ht=scontent.fbog10-1.fna&oh=9f6ad7c50c12cb1dee86f2521c80813b&oe=612B4862", precio: 50000, puntos: 900000 },
    { nombre: 'Langostas Asadas', img:"https://i.pinimg.com/originals/2f/df/2d/2fdf2dfaefe6baa120886f9edd5a7fce.jpg", precio: 50000, puntos: 900000 },
    { nombre: 'Churrasco' ,img:"https://i0.wp.com/www.sweetteaandthyme.com/wp-content/uploads/2016/05/Churrasco-hero-shot.jpg?fit=1000%2C1500&ssl=1",  precio: 50000, puntos: 900000 },
    { nombre: 'BRIEF TOMA HAWK 500gr',img:"https://www.reviewjournal.com/wp-content/uploads/2020/10/14377165_web1_RESTBRIEFS2.jpg", precio: 50000, puntos: 900000 },
  ];

  return (
    <Box p={2}>
      <Grid container direction="column" spacing={3}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Grid container direction="row" spacing={2} alignItems="center">
            <Grid item lg={4} md={4} sm={2} xs={2}>
              <Button
                size="large"
                variant="contained"
                color="primary"
                onClick={() => history.goBack()}
              >
                Volver
              </Button>
            </Grid>
            <Grid item lg={4} md={4} sm={4} xs={4}>
              <Typography variant="h4" component="p"  align="center">
                {user ? user.nombre : 'Anonimo'}
              </Typography>
            </Grid>
            <Grid item lg={4} md={4} sm={4} xs={4}>
              <Typography variant="h3" align="right" component="p">
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
              ? productos.map((p, i) => (
                  <Card key={i} className={classes.item}>
                    <CardContent className={classes.content}>
                    <CardMedia
                        className={classes.cover}
                        image={p?.img}
                        title="Live from space album cover"
                      />
                      <Box className={classes.details}>
                      <Typography variant="h4" align="center">
                        {p?.nombre}
                      </Typography>
                      <Grid
                        style={{ marginbottom: 30, padding: 20 }}
                        container
                        justify="space-between"
                        align="center"
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
                                  {formatNumber(p?.puntos)}
                                </Typography>
                              </Typography>
                            </Grid>
                            <Grid item  lg={12} md={12} sm={12} xs={12}>
                              <Button
                                disabled={user === null}
                                onClick={doRedimir}
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
                                  {formatMoney(p?.precio)}
                                </Typography>
                              </Typography>
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                              <Button
                                onClick={doBuy}
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
        fullWidth="md"
        maxWidth="md"
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
        fullWidth="md"
        maxWidth="md"
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
    </Box>
  );
}
