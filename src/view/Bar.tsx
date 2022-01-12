import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  makeStyles,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import React, {
  ReactElement,
  useState,
  JSXElementConstructor,
  memo,
} from 'react';
import { useHistory } from 'react-router';
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';
import { formatNumber, shortName } from '../helpers/format';
import Alert from '../component/Alert/Alert';
import useProduct from '../Hook/useProduct';
import usePuntosDia from '../Hook/usePuntosDia';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    gridAutoFlow: 'column',
    overflowX: 'hidden',
    gap: '1rem',
    maxWidth: '1200px',
    margin: '50px auto',
    padding: '1rem 0',
  },
  item: {
    minWidth: 300,
    maxWidth: 300,
    height: '250px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'transparent',
    color: theme.palette.primary.main,
    border: '5px solid',
    borderColor: theme.palette.primary.main,
    borderRadius: 20,
  },
  buttons: {
    color: '#fff',
  },
  cardAction: {
    width: '100%',
    padding: 0,
  },
  blue: {},
}));

function Bar(): ReactElement {
  const history = useHistory();
  const classes = useStyles();
  const { productos, openError, messageError, setOpenError } = useProduct();
  const { puntosBar } = usePuntosDia();

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const user = JSON.parse(localStorage.getItem('user')!);

  const [currentItemIdx, setCurrentItemgIdx] = useState(0);

  const prevSlide = () => {
    if (productos) {
      const resetToVeryBack = currentItemIdx === 0;
      const index = resetToVeryBack ? productos.length - 1 : currentItemIdx - 1;
      setCurrentItemgIdx(index);
    }
  };

  const nextSlide = () => {
    if (productos) {
      const resetIndex = currentItemIdx === productos.length - 1;
      const index = resetIndex ? 0 : currentItemIdx + 1;
      setCurrentItemgIdx(index);
    }
  };

  const activeItemsSourcesFromState = productos
    ? productos.slice(currentItemIdx, currentItemIdx + 3)
    : [];

  const itemsSourcesToDisplay = () => {
    if (productos) {
      return activeItemsSourcesFromState.length < 3
        ? [
            ...activeItemsSourcesFromState,
            ...productos.slice(0, 3 - activeItemsSourcesFromState.length),
          ]
        : activeItemsSourcesFromState;
    }
    return [];
  };

  return (
    <Box p={1}>
      <Box className={classes.blue} />
      <Grid container direction="column" spacing={3}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Grid
            container
            direction="row"
            spacing={1}
            alignItems="center"
            alignContent="center"
            justify="space-between"
          >
            <Grid item lg={2} md={2} sm={2} xs={2}>
              <Button
                size="large"
                variant="contained"
                color="primary"
                onClick={() => history.go(-1)}
              >
                Volver
              </Button>
            </Grid>
            <Grid item lg={7} md={7} sm={7} xs={7}>
              <Typography
                variant="h3"
                component="p"
                align="center"
                style={{ fontWeight: 'bold' }}
              >
                {user ? shortName(user?.nombre) : 'Anónimo'}
              </Typography>
            </Grid>
            <Grid item lg={3} md={3} sm={3} xs={3}>
              {user ? (
                <>
                  <Typography
                    variant="h4"
                    align="right"
                    component="p"
                    style={{ fontWeight: 'bold' }}
                  >
                    {formatNumber(puntosBar)}
                  </Typography>
                  <Typography variant="h6" align="right" component="p">
                    Puntos
                  </Typography>
                </>
              ) : null}
            </Grid>
          </Grid>
        </Grid>
        {/* fin del header */}
        <Box width="100%" display="flex" alignItems="center">
          <Grid id="left" onClick={prevSlide}>
            <Button
              style={{ color: 'white', width: '80px', marginLeft: '1rem' }}
            >
              <ArrowBackIos style={{ fontSize: 80 }} />
            </Button>
          </Grid>

          <Box className={classes.root}>
            {productos ? (
              itemsSourcesToDisplay().map(
                (
                  c: string
                ): ReactElement<string, JSXElementConstructor<unknown>> => (
                  // eslint-disable-next-line react/no-array-index-key
                  <Card
                    onClick={() => history.push(`/producto/${c}`)}
                    key={c}
                    className={classes.item}
                    style={{
                      background: `url(${__dirname}/../assets/images/categorias/${c}.png)`,
                      objectFit: 'cover',
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                      backdropFilter: 'opacity(50%)',
                    }}
                  >
                    <CardActions className={classes.cardAction}>
                      <Grid container justify="center">
                        <Grid item lg={12} style={{ width: '100%' }}>
                          <Button
                            className={classes.buttons}
                            size="medium"
                            variant="contained"
                            color="primary"
                            fullWidth
                          >
                            {c}
                          </Button>
                        </Grid>
                      </Grid>
                    </CardActions>
                  </Card>
                )
              )
            ) : (
              <CircularProgress color="primary" />
            )}
          </Box>

          <Grid onClick={nextSlide}>
            <Button style={{ color: 'white' }}>
              <ArrowForwardIos style={{ fontSize: 80 }} />
            </Button>
          </Grid>
        </Box>
      </Grid>
      {messageError ? (
        <Alert
          open={openError}
          onClose={() => {
            setOpenError(false);
            history.push('/login');
          }}
          message={messageError}
        />
      ) : null}
    </Box>
  );
}

export default memo(Bar);
