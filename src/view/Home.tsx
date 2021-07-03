import React from 'react';
import { Button, Box, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import NavButton from '../component/NavButton';

const useStyles = makeStyles(() => ({
  root: {
    background:
      'linear-gradient(180deg, rgba(250, 93, 185, 1) 0%, rgba(239, 35, 35, 1) 100% )',
  },
  grid: {
    height: '90%',
  },
  NumberPoint: {
    fontWeight: 900,
  },
}));

export default function Home() {
  const classes = useStyles();
  return (
    <Box height="100vh" p={2}>
      <Box
        position="absolute"
        top="-15%"
        left="-30%"
        zIndex="-9999"
        minHeight="150vh"
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
        justify="space-between"
        alignItems="center"
        spacing={4}
        className={classes.grid}
      >
        <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
          <Grid
            container
            alignItems="flex-end"
            justify="center"
            direction="column"
          >
            <Grid item>
              <Typography
                variant="h2"
                component="h2"
                className={classes.NumberPoint}
              >
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
        <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
       
        <Grid
            container
            alignItems="flex-end"
            justify="center"
            direction="column"
          >
            <Grid item>
              <Typography
                variant="h4"
                component="h2"
                color="secondary"
                align="right"
                className={classes.NumberPoint}
              >
                Juan Carlos
              </Typography>
            </Grid>
        </Grid>
        </Grid>
        <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
         <NavButton />
        </Grid>
      </Grid>
    </Box>
  );
}
