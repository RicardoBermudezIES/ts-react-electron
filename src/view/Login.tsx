import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
  makeStyles,
} from '@material-ui/core';
import { useHistory } from 'react-router';
import Keyboard from 'react-simple-keyboard';
import { ipcRenderer } from 'electron';
import { DataContext } from '../context/Context';

const ipc = ipcRenderer;

const useStyles = makeStyles(() => ({
  login: {
    marginBottom: 'min(10%,25%)',
  },
  red: {
    height: 500,
    width: 500,
    borderRadius: 999,
    background:
      'linear-gradient(180deg, rgba(250, 93, 185, 1) 0%, rgba(239, 35, 35, 1) 100% )',
    position: 'absolute',
    bottom: -250,
    left: -100,
    zIndex: -1,
  },
}));

export default function Login() {
  // estado Globales
  const { config, setData, maquina } = useContext(DataContext);

  const localToken = localStorage.getItem('token')
  console.log(localToken)

  const authConfig = JSON.parse(localStorage.getItem('authConfig')) ? JSON.parse(localStorage.getItem('authConfig')) : null
  console.log(authConfig)

  const localMaquina = localStorage.getItem('maquina')
  console.log(localMaquina)

  const classes = useStyles();

  const history = useHistory();
  const [inputs, setInputs] = useState({
    username: null,
    password: null,
    token: null,
  });
  const [layoutName, setLayoutName] = useState('default');
  const [inputName, setInputName] = useState();
  const [keyboardOpen, setkeyboardOpen] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);
  const keyboard = useRef();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {

  };

  const handleClose = () => {
    setOpen(false);
  };

  const onChangeAll = (inputs) => {
    setInputs({ ...inputs });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);

    let args = {
      host: authConfig.host,
      serial: localMaquina,
      numeroDocumento: inputs.username,
      token: localToken,
    };

    ipc.send('fidelizarMaquina', args);
  };

  useEffect(() => {
    ipc.on('fidelizarMaquina', (event, arg) => {
      console.log(arg, 'fidelizarMaquina login.tsx');
      if (arg?.statusDTO.code !== '00') {
        console.error(arg?.statusDTO.message);

      }

      if (arg?.statusDTO.code == '01') {
        console.log(arg?.statusDTO.message);
      }

      if (arg?.statusDTO.code == '00') {
        localStorage.setItem('user', JSON.stringify({numeroDocumento: inputs.username,nombre : arg.nombreCompleto, clave: arg.clave, billetero: arg.enableBilletero }))
        setData({numeroDocumento: inputs.username,nombre : arg.nombreCompleto, clave: arg.clave, billetero: arg.enableBilletero })
        history.push('/');
      }
    });
  });

  const onChangeInput = (event) => {
    const inputVal = event.target.value;

    setInputs({
      ...inputs,
      [inputName]: inputVal,
    });
  };
  const handleShift = () => {
    const newLayoutName = layoutName === 'default' ? 'shift' : 'default';
    setLayoutName(newLayoutName);
  };

  const onKeyPress = (button) => {
    if (button === '{shift}' || button === '{lock}') handleShift();
  };

  const getInputValue = (inputName) => {
    return inputs[inputName] || '';
  };

  const closeKeyboard = () => {
    setkeyboardOpen(false);
  };

  const setActiveInput = (inputName) => {
    setInputName(inputName);
    setkeyboardOpen(true);
  };

  const handleSendToken = () => {
    inputs.token != null && history.push('/');
  };

  return (
    <Box p={3}>
      <Box className={classes.red}></Box>
      <Grid container justify="flex-end" spacing={2}>
        <Grid item lg={2} md={2} sm={3} xs={4}>
          <Button
            onClick={() => history.push('/configuracion')}
            variant="contained"
            color="secondary"
          >
            Configuracion
          </Button>
        </Grid>
      </Grid>
      <Grid
        className={classes.login}
        container
        direction="column"
        justify="center"
        spacing={2}
      >
        <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
          <Typography variant="h5" align="center" component="h2">
            Iniciar Sesión
          </Typography>
        </Grid>
        <form onSubmit={onSubmit} noValidate autoComplete="off">
          <Grid item xl={8} lg={8} md={10} sm={10} xs={12}>
            <Grid container direction="row" justify="flex-end" spacing={2}>
              <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                <TextField
                  name="username"
                  fullWidth
                  id="filled-basic"
                  label="Usuario"
                  variant="filled"
                  value={getInputValue('username')}
                  onChange={onChangeInput}
                  onFocus={() => setActiveInput('username')}
                />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={6} xs={12}>
                <TextField
                  name="password"
                  fullWidth
                  id="filled-basic"
                  label="Contraseña"
                  variant="filled"
                  value={getInputValue('password')}
                  onChange={onChangeInput}
                  onFocus={() => setActiveInput('password')}
                />
              </Grid>
              <Grid item>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  color="primary"
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Grid>

      <Grid container justify="flex-end" spacing={1}>
        <Grid item lg={1} md={1} sm={2} xs={2}>
          <Button
            onClick={() => history.push('/bar')}
            variant="contained"
            color="secondary"
          >
            Bar
          </Button>
        </Grid>
        <Grid item lg={1} md={1} sm={2} xs={2}>
          <Button variant="contained" color="secondary">
            ayuda
          </Button>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose} aria-labelledby="token">
        <DialogTitle id="token">Ingresa tu token</DialogTitle>
        <DialogContent>
          <Input
            margin="dense"
            id="token"
            fullWidth
            type="text"
            value={getInputValue('token')}
            onChange={onChangeInput}
            onFocus={() => setActiveInput('token')}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSendToken} color="primary">
            Continuar
          </Button>
        </DialogActions>
      </Dialog>

      <Grid
        className={`keyboardContainer-login ${!keyboardOpen ? 'hidden' : ''}`}
      >
        <button className="closeKeyBoard" onClick={closeKeyboard}>
          x
        </button>
        <Keyboard
          keyboardRef={(r) => (keyboard.current = r)}
          inputName={inputName}
          onChangeAll={onChangeAll}
          layoutName={layoutName}
          onKeyPress={onKeyPress}
        />
      </Grid>
    </Box>
  );
}
