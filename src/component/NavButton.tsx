import { Button, Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';

const useStyles = makeStyles(() => ({
  disabled: {
    '&.MuiButton-root.Mui-disabled': {
      backgroundColor: 'rgba(233,30,99,0.5) !important',
    },
  },
}));

export default function NavButton() {
  const classes = useStyles();
  const history = useHistory();

  const goBar = () => {
    history.push('/bar');
  };

  const goPuntos = () => {
    history.push('/puntos');
  };
  return (
    <Grid justify="flex-end" container spacing={2}>
      <Grid item>
        <Grid container alignItems="flex-end" direction="column" spacing={2}>
          <Grid item>
            <Button onClick={goPuntos} variant="contained" color="primary">
              Puntos
            </Button>
          </Grid>
          <Grid item>
            <Button
              className={classes.disabled}
              variant="contained"
              color="primary"
            >
              Billetera
            </Button>
          </Grid>
          <Grid item>
            <Button
              className={classes.disabled}
              disabled
              variant="contained"
              color="primary"
            >
              Redimir
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container alignItems="flex-end" direction="column" spacing={2}>
          <Grid item>
            <Button variant="contained" color="primary">
              Ayuda
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={goBar} variant="contained" color="primary">
              Bar
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
