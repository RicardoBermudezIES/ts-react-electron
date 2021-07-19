import { Button, Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';
import {
  CallEndTwoTone,
  Fastfood,
  ScatterPlot,
  AccountBalanceWallet,
  Style,
} from '@material-ui/icons';

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
            <Button size="large" onClick={goPuntos} variant="contained" color="primary">
              <ScatterPlot style={{ fontSize: 40 }} />
            </Button>
          </Grid>
          <Grid item>
            <Button
              size="large"
              disabled
              className={classes.disabled}
              variant="contained"
              color="primary"
            >
              <AccountBalanceWallet style={{ fontSize: 40 }} />
            </Button>
          </Grid>
          <Grid item>
            <Button
              size="large"
              className={classes.disabled}
              disabled
              variant="contained"
              color="primary"
            >
              <Style  style={{ fontSize: 40 }} />
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container alignItems="flex-end" direction="column" spacing={2}>
          <Grid item>
            <Button size="large" variant="contained" color="primary">
            <CallEndTwoTone  style={{ fontSize: 40 }} />
            </Button>
          </Grid>
          <Grid item>
            <Button size="large"  onClick={goBar} variant="contained" color="primary">
            <Fastfood  style={{ fontSize: 40 }} />
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
