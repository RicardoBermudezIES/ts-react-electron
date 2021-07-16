import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';

const useStyles = makeStyles({
  root: {
    overflowY: 'scroll',
    scrollBehavior: 'smooth',
    height: 300,
    padding: '1rem 0',
  },
});

export default function Bar() {
  const classes = useStyles();
  const history = useHistory();

  const puntos = JSON.parse(localStorage.getItem('puntos'))
  const user = JSON.parse(localStorage.getItem('user'))
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
               {user ? user.nombre : 'cargando..'}
              </Typography>
            </Grid>
            <Grid item lg={4} md={4} sm={4} xs={4}>
              <Typography variant="h3" align="right" component="p">
              {puntos.cantidadPuntosDisponibles
                  ? puntos.cantidadPuntosDisponibles
                  : 'cargando..'}
              </Typography>
              <Typography variant="h5" align="right" component="p">
                puntos
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        {/* fin del header */}

        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Box className={classes.root}>
            <Grid container direction="column" spacing={2}>
              {[ 0, 0, 0].map((_,i) => (
                <Grid key={i} item lg={12} md={12} sm={12} xs={12}>
                  <Card>
                    <CardContent>
                      <Typography variant="h3" align="center">
                        Categoria {i + 1}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button onClick={() => history.push('/producto/'+i)} size="medium">ver productos</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
