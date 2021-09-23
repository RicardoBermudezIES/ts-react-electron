import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.global.css';
import { Box, ThemeProvider } from '@material-ui/core';
import { ipcRenderer } from 'electron';
import { theme } from './theme/Theme';
import { router } from './router';
import DataProvider from './context/Context';
import Juego from './iconos/JuegoResponsable.png';
import Alert from './component/Alert/Alert';
// import VideoPromocional from './component/VideoPromocional/VideoPromocional';

const ipc = ipcRenderer;

export default function App() {
  const [open, setOpen] = useState(!navigator.onLine);

  const isOnline = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    navigator.onLine ? setOpen(false) : setOpen(true);
  };

  useEffect(() => {
    const myInterval2 = setInterval( () => isOnline(), 1000 * 60 * 5);
    myInterval2
    return () => {
      clearInterval(myInterval2);
    }
  }, []);

  useEffect(() => {
    const sendAuth = () => {
      const auth = JSON.parse(window.localStorage.getItem('authConfig'));
      ipc.send('allways-auth', auth);
    };
    var myInterval3;
    if (localStorage.getItem('authConfig')) {
      myInterval3 =  setInterval(() =>   sendAuth(), 1000 * 60 * 4);
      myInterval3
    }
    return () => {
      clearInterval(myInterval3);
    }
  }, []);



  const getAuth = () => {
    ipc.on('allways-auth', (event, arg) => {
      console.log(arg.token);
      localStorage.setItem('token', arg.token);
    });
  };

  useEffect(() => {
    getAuth();
  }, []);


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
