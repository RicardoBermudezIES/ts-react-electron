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
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';
import { formatNumber } from '../helpers/format'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    overflowX: 'scroll',
    scrollBehavior: 'smooth',
    overflowWrap: 'anywhere',
    height: 300,
    maxWidth: '70%',
    margin: '0 auto',
    padding: '1rem 0',
  },
  item: {
    height: 280,
    minWidth: 400,
    width: 'fit-content',
    margin: '0 1em',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.primary.main,
    background: 'transparent',
    border: '5px solid',
    borderColor: theme.palette.primary.main,
    borderRadius: 20,
  },
  blue: {
    height: 200,
    width: 200,
    borderRadius: 999,
    background: 'linear-gradient(180deg, #3af0b0 0%, #029af9 100%)',
    position: 'absolute',
    bottom: -50,
    left: -100,
    zIndex: -1,
  },
}));

export default function Bar() {
  const [scroll, setScroll] = useState(0);
  const [isMax, setIsMax] = useState(false);
  const classes = useStyles();
  const history = useHistory();

  const puntos = JSON.parse(localStorage.getItem('puntos'));
  const user = JSON.parse(localStorage.getItem('user'));

  const GotoLeft = () => {
    const content = document.getElementById('content');
    const scroll = (content.scrollLeft -= 300);
    setScroll(scroll);
    if (scroll <= content.scrollWidth -( window.outerWidth+500)) {
      setIsMax(false);
    }
  };

  const GotoRight = () => {
    const content = document.getElementById('content');
    let scroll2 = 0;
    if (scroll >= content.scrollWidth - window.outerWidth) {
      setIsMax(true);
    }
    scroll2 = content.scrollLeft += 300;
    setScroll(scroll2);
  };

  const categorias = ['Bebidas', 'Comida', 'Licores', 'juegos', 'tecnologia'];
  return (
    <Box p={2}>
      <Box className={classes.blue} />
      <Grid container direction="column" spacing={3}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Grid container direction="row" spacing={2} alignItems="center">
            <Grid item lg={4} md={4} sm={2} xs={2}>
              <Button
                size="large"
                variant="contained"
                color="primary"
                onClick={() => history.goBack()}
              >
                Volver
              </Button>
            </Grid>
            <Grid item lg={4} md={4} sm={4} xs={4}>
              <Typography variant="h4" component="p" align="center">
                {user ? user?.nombre : 'Anonimo'}
              </Typography>
            </Grid>
            <Grid item lg={4} md={4} sm={4} xs={4}>
              <Typography variant="h3" align="right" component="p">
                {puntos?.cantidadPuntosDisponibles
                  ? ( formatNumber(puntos?.cantidadPuntosDisponibles)
                ) : (
                  <Typography variant="body2" align="right" component="span">
                    cargando..
                  </Typography>
                )}
              </Typography>
              <Typography variant="h6" align="right" component="p">
                Puntos
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        {/* fin del header */}

        <Box width="100%" display="flex" alignItems="center">
          {scroll > 0 ? (
            <Grid id="left" onClick={GotoLeft}>
              <Button style={{ color: 'white' }}>
                <ArrowBackIos style={{ fontSize: 80 }} />
              </Button>
            </Grid>
          ) : null}

          <Box id="content" className={classes.root}>
            {categorias
              ? categorias.map((c, i) => (
                  <Card key={i} className={classes.item}>
                    <CardContent>
                      <Typography variant="h3" align="center">
                        {c}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Grid container justify="center">
                        <Grid item>
                          <Button
                            onClick={() => history.push(`/producto/${c}`)}
                            size="medium"
                            color="primary"
                          >
                            ver productos
                          </Button>
                        </Grid>
                      </Grid>
                    </CardActions>
                  </Card>
                ))
              : null}
          </Box>

          {isMax ? null : (
            <Grid onClick={GotoRight}>
              <Button style={{ color: 'white' }}>
                <ArrowForwardIos style={{ fontSize: 80 }} />
              </Button>
            </Grid>
          )}
        </Box>
      </Grid>
    </Box>
  );
}
