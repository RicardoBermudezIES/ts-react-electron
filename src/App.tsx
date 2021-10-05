import React, { useEffect, useState } from 'react';
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
// import VideoPromocional from './component/VideoPromocional/VideoPromocional';


export default function App() {

  const { token } = useToken()
  const { open , setOpen} = useOnline()
  console.log(token)


  return (
    <DataProvider>
      <Router>
        {/* <VideoPromocional /> */}
        <ThemeProvider theme={theme}>
          <Box position="absolute" bottom="5px" right="5px">
            <img style={{ width: 150 }} src={Juego} alt="juego Responsable" />
          </Box>

          {navigator.onLine ? null : (
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
