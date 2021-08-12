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
import { formatNumber, shortName } from '../helpers/format'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    overflowX: 'scroll',
    scrollBehavior: 'smooth',
    overflowWrap: 'anywhere',
    maxWidth: '70%',
    margin: '0 auto',
    padding: '1rem 0',
  },
  item: {
    height: 250,
    minWidth: 400,
    width: 'fit-content',
    margin: '0 1em',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: theme.palette.primary.main,
    border: '5px solid',
    borderColor: theme.palette.primary.main,
    borderRadius: 20,
    top:0,
  },
  cardContent:{
    position: "relative",
    top:0,
    width:"100%"
  },
  title:{
    background: theme.palette.primary.main,
    paddingLeft:15,
    paddingRight: 15,
    color: "white",
    borderRadius:5,
    marginBottom:10,

  },
  buttons: {
    position:"relative",
    zIndex:2, bottom:0,
    background:"#05194687"
  },
  cardAction:{
    position:"relative",
    bottom:-135,
    width:"100%",
    padding:0
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
    const scroll1 = (content.scrollLeft -= 200);
    if (scroll <= content.scrollWidth) {
      setIsMax(false);
    }
    setScroll(scroll1);
  };

  const GotoRight = () => {
    const content = document.getElementById('content');
    let scroll2 = 0;
    if (scroll > content.scrollWidth) {
      setIsMax(true);
    }
    scroll2 = content.scrollLeft += 200;
    setScroll(scroll2);
  };

  const categorias = [
    { name : 'Jugos', img:"https://laopinion.com/wp-content/uploads/sites/3/2021/04/jugos-naturales-shutterstock_121270552.jpg?quality=80&strip=all&w=1200"},
   {name:'Comida', img:"https://elviajerofeliz.com/wp-content/uploads/2020/05/Comida-t%C3%ADpica-de-Jamaica-Platos-Imprescindibles.jpg"},
   {name:'Licores', img:"https://www.eluniversal.com.mx/sites/default/files/2020/02/21/bebidas-emblematicas-mexico.jpg"}];
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
                onClick={() => history.goBack()}
              >
                Volver
              </Button>
            </Grid>
            <Grid item lg={7} md={7} sm={7} xs={7}>
              <Typography variant="h3" component="p" align="center"  style={{fontWeight:"bold"}}>
                {user ? shortName(user?.nombre) : 'Anonimo'}
              </Typography>
            </Grid>
            <Grid item lg={3} md={3} sm={3} xs={3}>
              <Typography variant="h4" align="right" component="p"  style={{fontWeight:"bold"}}>
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
                  <Card key={i} className={classes.item}
                   style={{ background: `url(${c.img})`, objectFit:"cover", backgroundSize:"cover", backgroundRepeat:"no-repeat" }}>
                    <CardContent className={classes.cardContent}>
                      <Typography  className={classes.title} variant="h3" align="center">
                        {c.name}
                      </Typography>
                    </CardContent>
                    <CardActions   className={classes.cardAction}>
                      <Grid container justify="center" >
                        <Grid item lg={12} style={{width:"100%"}}>
                          <Button
                           className={classes.buttons}
                            onClick={() => history.push(`/producto/${c.name}`)}
                            size="medium"
                            variant="contained"
                            color="secondary"
                            fullWidth
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
