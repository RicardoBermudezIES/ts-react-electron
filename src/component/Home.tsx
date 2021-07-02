import React from 'react';
import { Button, Box, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  root: {
    background:
      'linear-gradient(180deg, rgba(250, 93, 185, 1) 0%, rgba(239, 35, 35, 1) 100% )',
  },
  grid:{
    height:"90%"
  }
}));

export default function Home() {
  const classes = useStyles();
  return (
    <Box height="100vh" p={2}>
      <Box
        position="absolute"
        top="-5%"
        left="-30%"
        zIndex="-9999"
        minHeight="120vh"
        width="70%"
        borderRadius="50%"
        className={classes.root}
      ></Box>
      <Grid container justify="flex-end">
        <Grid item>
          <Link to="/login">
            <Button variant="contained" color="secondary">
              Salir
            </Button>
          </Link>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
        spacing={2}
        className={classes.grid}
      >
        <Grid item lg={5}>
          <Grid
            container
            alignItems="flex-end"
            justify="center"
            direction="column"
          >
            <Grid item>
              <Typography variant="h2" component="h2">
                99999999{' '}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5" component="p">
                Puntos Totales{' '}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={3}>
          <Typography variant="h4" component="h1">
            Juancho Castro{' '}
          </Typography>
        </Grid>
        <Grid item lg={4}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Button variant="contained" color="primary">
                Ayuda{' '}
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary">
                Bar{' '}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
