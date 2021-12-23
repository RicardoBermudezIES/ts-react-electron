import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.global.css';
import { Box, ThemeProvider } from '@material-ui/core';
import { theme } from './theme/Theme';
import { router } from './router';
import DataProvider from './context/Context';
import Juego from './iconos/JuegoResponsable.png';
import Alert from './component/Alert/Alert';
import useToken from './Hook/useToken';
import useOnline from './Hook/useOnline';
import Promocional from './component/Promocional/Promocional';

export default function App() {
  useToken();
  const { open, setOpen } = useOnline();

  return (
    <DataProvider>
      <Router>
        <Promocional />
        <ThemeProvider theme={theme}>
          <Box position="absolute" bottom="5px" right="5px">
            <img style={{ width: 90 }} src={Juego} alt="juego Responsable" />
          </Box>

          {!open ? null : (
            <Alert
              open={open}
              onClose={() => setOpen(false)}
              message="No hay conexion al internet"
            />
          )}
          <Switch>
            {router.map((route, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <Route key={i} path={route.path} component={route.component} />
            ))}
          </Switch>
        </ThemeProvider>
      </Router>
    </DataProvider>
  );
}
