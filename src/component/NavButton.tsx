import { Button, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';
import { BarIcon } from '../iconos/Bar';
import { PuntosIcon } from '../iconos/PuntosIcon';
import { BilleteraIcon } from '../iconos/BilleteraIcon';
import ButtonHelper from './ButtonHelper/ButtonHelper';
import ButtonPedidos from './ButtonPedidos/ButtonPedidos';

const useStyles = makeStyles(() => ({
  content: {
    display: 'grid',
    justifyContent: 'center',
    justifyItems:'center',
    '& span.MuiButton-label':  {
      justifyItems:'center',
    }
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
    <>
      <Grid justify="flex-end" container spacing={1}>
        <Grid item>
          <Button
             className={classes.content}
            onClick={goPuntos}
          >
            <PuntosIcon />
            <Typography variant="h5" style={{ color: 'white' }}>
              {' '}
              Puntos{' '}
            </Typography>
          </Button>
        </Grid>
        <Grid item>
          <Button
            style={{opacity: 0.5 }}
            className={classes.content}
          >
            <BilleteraIcon />
            <Typography variant="h5" style={{ color: 'white' }}>
              {' '}
              Billetera{' '}
            </Typography>
          </Button>
        </Grid>
        <Grid item>
          <ButtonHelper />
        </Grid>
        <Grid item>
          <Button
            onClick={goBar}
            className={classes.content}
          >
            <BarIcon />
            <Typography variant="h5" style={{ color: 'white' }}>
              {' '}
              Redención{' '}
            </Typography>
          </Button>
        </Grid>
        <ButtonPedidos />
      </Grid>
    </>
  );
}
