import { Button, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';
import {
  CallEndTwoTone,
  Fastfood,
  ScatterPlot,
  AccountBalanceWallet,
  Style,
} from '@material-ui/icons';
import { BarIcon } from '../iconos/Bar';
import { PuntosIcon } from '../iconos/PuntosIcon';
import { PhoneIcon } from '../iconos/PhoneIcon';
import { BilleteraIcon } from '../iconos/BilleteraIcon';

const useStyles = makeStyles(() => ({}));

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
    <>
      <Grid justify="flex-end" container spacing={2}>
        <Grid item>
          <Grid container alignItems="flex-end" direction="column" spacing={2}>
            <Grid item>
              <Button style={{ display: 'grid' }} onClick={goPuntos}>
                <PuntosIcon />
                <Typography style={{ color: 'white' }}>
                  {' '}
                  Puntos{' '}
                </Typography>
              </Button>
            </Grid>
            <Grid item>
              <Button style={{ display: 'grid', opacity: 0.5 }}>
                <BilleteraIcon />
                <Typography style={{ color: 'white' }}>
                  {' '}
                  Billtera{' '}
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container alignItems="flex-end" direction="column" spacing={3}>
            <Grid item>
              <Button style={{ display: 'grid' }} disabled>
                <PhoneIcon />
                <Typography style={{ color: 'white' }}>
                  {' '}
                  Ayuda{' '}
                </Typography>
              </Button>
            </Grid>
            <Grid item>
              <Button onClick={goBar} style={{ display: 'grid' }}>
                <BarIcon />
                <Typography style={{ color: 'white' }}>
                  {' '}
                  Bar{' '}
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
