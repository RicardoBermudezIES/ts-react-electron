import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.global.css';
import fs from 'fs';
import paths from 'path';
import { Box, ThemeProvider } from '@material-ui/core';
import { ipcRenderer } from 'electron';
import { theme } from './theme/Theme';
import { router } from './router';
import DataProvider from './context/Context';
import Juego from './iconos/JuegoResponsable.svg'

const ipc = ipcRenderer;

export default function App() {

  const sendAuth = () => {
    const auth = JSON.parse(localStorage.getItem('authConfig'));
    ipc.send('allways-auth', auth);
  };

  useEffect(() => {
    if (localStorage.getItem('authConfig')) {
      setInterval(() => {
        sendAuth();
      }, 1000 * 60 * 4)
    }
  },[]);


  const getAuth = () => {
    ipc.on('allways-auth', (event, arg) => {
        console.log(arg.token)
        localStorage.setItem('token', arg.token);
    });
  };

  useEffect(() => {
    getAuth();
  },[]);



  return (
    <DataProvider>
      <Router>
        <ThemeProvider theme={theme}>
          <Box position="absolute" bottom="5px" right="5px">
            <img style={{ width: 150 }} src={Juego} alt="juego Responsable" />
          </Box>
          <Switch>
            {router.map((route, i) => (
              <Route key={i} path={route.path} component={route.component} />
            ))}
          </Switch>
        </ThemeProvider>
      </Router>
    </DataProvider>
  );
}
