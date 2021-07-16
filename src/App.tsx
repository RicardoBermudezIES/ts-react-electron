import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.global.css';
import fs from 'fs';
import paths from 'path';
import { ThemeProvider } from '@material-ui/core';
import { ipcRenderer } from 'electron';
import { theme } from './theme/Theme';
import { router } from './router';
import DataProvider from './context/Context';

const ipc = ipcRenderer;

export default function App() {

  const [token] = useState(JSON.parse(localStorage.getItem('authConfig')) ? JSON.parse(localStorage.getItem('authConfig')) : '')

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
