import { Button, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';
import { BarIcon } from '../iconos/Bar';
import { PuntosIcon } from '../iconos/PuntosIcon';
import { BilleteraIcon } from '../iconos/BilleteraIcon';
import ButtonHelper from './ButtonHelper/ButtonHelper';

export default function NavButton() {
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
                <Typography variant="h6" style={{ color: 'white' }}>
                  {' '}
                  Puntos{' '}
                </Typography>
              </Button>
            </Grid>
            <Grid item>
              <Button style={{ display: 'grid', opacity: 0.5 }}>
                <BilleteraIcon />
                <Typography variant="h6" style={{ color: 'white' }}>
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
              <ButtonHelper />
            </Grid>
            <Grid item>
              <Button onClick={goBar} style={{ display: 'grid' }}>
                <BarIcon />
                <Typography variant="h6" style={{ color: 'white' }}>
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
