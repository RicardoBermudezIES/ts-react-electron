import { Button, Grid } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';

export default function NavButton() {
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
            <Button variant="contained" color="primary">
              Billetera
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={goPuntos} variant="contained" color="primary">
              Puntos
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
