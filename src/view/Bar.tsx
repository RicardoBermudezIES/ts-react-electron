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
import React, { JSXElementConstructor, ReactElement, useState } from 'react';
import { useHistory } from 'react-router';
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';
import { formatNumber, shortName } from '../helpers/format';
import Alert from '../component/Alert/Alert';
import useProduct from '../Hook/useProduct';
import usePuntosDia from '../Hook/usePuntosDia';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    overflowX: 'scroll',
    scrollBehavior: 'smooth',
    overflowWrap: 'anywhere',
    maxWidth: '70%',
    margin: '50px auto',
    padding: '1rem 0',
  },
  item: {
    minWidth: '320px',
    margin: '0 1em',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'transparent',
    color: theme.palette.primary.main,
    border: '5px solid',
    borderColor: theme.palette.primary.main,
    borderRadius: 20,
  },
  cardContent: {
    width: '100%',
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    "&::before":{
      content: "' '",
      background: "rgba(0, 0, 0, 0.54)",
      width: "100%",
      height: "100%",
      position: 'absolute',
      zIndex:"-1",
    }
  },
  title: {
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    marginBottom: 10,
    
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

export default function Bar(): ReactElement {
  const { productos, openError, messageError, setOpenError } = useProduct();

  const { puntosBar } = usePuntosDia();

  const [scroll, setScroll] = useState(0);
  const [isMax, setIsMax] = useState(false);
  const classes = useStyles();
  const history = useHistory();

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const user = JSON.parse(localStorage.getItem('user')!);
  const GotoLeft = () => {
    const content = document.getElementById('content');
    const scroll1 = (content!.scrollLeft -= 200);
    if (scroll <= content!.scrollWidth) {
      setIsMax(false);
    }
    setScroll(scroll1);
  };

  const GotoRight = () => {
    const content = document.getElementById('content');
    let scroll2 = 0;
    if (scroll > content!.scrollWidth) {
      setIsMax(true);
    }
    scroll2 = content!.scrollLeft += 200;
    setScroll(scroll2);
  };

  return (
    <Box p={1}>
      <Box className={classes.blue} />
      <Grid container direction="column" spacing={3}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Grid container direction="row" spacing={2} alignItems="center">
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
                {user ? shortName(user?.nombre) : 'Anonimo'}
              </Typography>
            </Grid>
            <Grid item lg={3} md={3} sm={3} xs={3}>
              <Typography
                variant="h4"
                align="right"
                component="p"
                style={{ fontWeight: 'bold' }}
              >
                {puntosBar ? formatNumber(puntosBar) : null}
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
            {productos ? (
              productos.map(
                (c :string): ReactElement<string, JSXElementConstructor<unknown>> => (
                  // eslint-disable-next-line react/no-array-index-key
                  <Card key={c} className={classes.item}
                  style={{ 
                    background: `url(fidelizacion/assets/images/categorias/${c}.png)`, 
                    objectFit:"cover", 
                    backgroundSize:"cover", 
                    backgroundRepeat:"no-repeat",
                    backdropFilter:'opacity(50%)' }}>
                    <CardContent className={classes.cardContent}>
                      <Typography
                        className={classes.title}
                        variant="h3"
                        align="center"
                      >
                        {c}
                      </Typography>
                    </CardContent>
                    <CardActions className={classes.cardAction}>
                      <Grid container justify="center">
                        <Grid item lg={12} style={{ width: '100%' }}>
                          <Button
                            className={classes.buttons}
                            onClick={() => history.push(`/producto/${c}`)}
                            size="medium"
                            variant="contained"
                            color="primary"
                            fullWidth
                          >
                            ver productos
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

          {isMax ? null : (
            <Grid onClick={GotoRight}>
              <Button style={{ color: 'white' }}>
                <ArrowForwardIos style={{ fontSize: 80 }} />
              </Button>
            </Grid>
          )}
        </Box>
      </Grid>
      {messageError ? (
        <Alert
          open={openError}
          onClose={() => setOpenError(false)}
          message={messageError}
        />
      ) : null}
    </Box>
  );
}
