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
} from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  root: {
    overflowY: 'scroll',
    scrollBehavior: 'smooth',
    height: 300,
    padding: '1rem 0',
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
  const classes = useStyles();
  const history = useHistory();
  const [buyModal, setBuyModal] = useState(false);
  const [redimirModal, setRedimirModal] = useState(false);

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

  return (
    <Box p={2}>
      <Grid container direction="column" spacing={3}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Grid container direction="row" spacing={2} alignItems="center">
            <Grid item lg={4} md={4} sm={2} xs={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => history.goBack()}
              >
                Volver
              </Button>
            </Grid>
            <Grid item lg={4} md={4} sm={4} xs={4}>
              <Typography variant="h4" component="p">
                Yelitza Anabuzimake
              </Typography>
            </Grid>
            <Grid item lg={4} md={4} sm={4} xs={4}>
              <Typography variant="h3" align="right" component="p">
                999999
              </Typography>
              <Typography variant="h5" align="right" component="p">
                Puntos
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        {/* fin del header */}

        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Box className={classes.root}>
            <Grid container direction="column" spacing={2}>
              {[0, 1, 2].map((_, i) => (
                <Grid key={i} item lg={12} md={12} sm={12} xs={12}>
                  <Card>
                    <CardContent>
                      <Typography variant="h3" align="center">
                        Producto {i + 1}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Grid container justify="space-between">
                        <Grid item>
                          <Button
                            onClick={doBuy}
                            variant="contained"
                            color="primary"
                            size="medium"
                          >
                            Comprar
                          </Button>
                        </Grid>
                        <Grid item>
                          {' '}
                          <Button
                            onClick={doRedimir}
                            variant="contained"
                            color="secondary"
                            size="medium"
                          >
                            redimir
                          </Button>
                        </Grid>
                      </Grid>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Dialog open={buyModal} onClose={handleCloseBuyModal}>
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

      <Dialog open={redimirModal} onClose={handleCloseRedimirModal}>
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
