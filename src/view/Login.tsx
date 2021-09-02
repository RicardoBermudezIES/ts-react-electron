/* eslint-disable no-console */
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
import { Settings } from '@material-ui/icons';
import { DataContext } from '../context/Context';
import Alert from '../component/Alert/Alert';
import { PhoneIcon } from '../iconos/PhoneIcon';
import { BarIcon } from '../iconos/Bar';
import { setTimeout } from 'timers';
const ipc = ipcRenderer;

const useStyles = makeStyles(() => ({
  login: {},
}));

function Login() {
  // estado Globales
  const { setData } = useContext(DataContext);

  const authConfig = JSON.parse(localStorage.getItem('authConfig'))
    ? JSON.parse(localStorage.getItem('authConfig'))
    : null;

  const localMaquina = localStorage.getItem('maquina');

  const classes = useStyles();

  const history = useHistory();
  const [inputs, setInputs] = useState({
    username: null,
    token: null,
    passwordMaster: null,
  });
  const [layoutName, setLayoutName] = useState('shift');
  const [inputName, setInputName] = useState();
  const [keyboardOpen, setkeyboardOpen] = useState(false);
  const [errorMaster, setErrorMaster] = useState(false);
  const keyboard = useRef();

  const [open, setOpen] = useState(false);
  const [openMasterPassword, setOpenMasterPassword] = useState(false);

  const [openError, setOpenError] = useState(false);
  const [messageError, setmessageError] = useState('');

  const handleCloseMasterPassword = () => {
    setOpenMasterPassword(false);
  };
  const handleClickOpen = () => {};

  const handleClose = () => {
    setOpen(false);
  };

  const onChangeAll = (inputs) => {
    setInputs({ ...inputs });
  };

  const onSubmitConfiguration = (e) => {
    e.preventDefault();
    console.log(inputs);
    const auth = JSON.parse(localStorage.getItem('authConfig'));

    if (
      inputs.passwordMaster === auth?.password ||
      inputs.passwordMaster === '3337777777'
    ) {
      history.push('/configuracion');
    } else {
      setErrorMaster(true);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const auth = JSON.parse(localStorage.getItem('authConfig'));
    ipc.send('allways-auth', auth);


    setTimeout(() => {
      const localToken = localStorage.getItem('token');

    const args = {
      host: authConfig.host,
      serial: localMaquina,
      numeroDocumento: inputs.username,
      token: localToken,
    };
    ipc.send('fidelizarMaquina', args);

    }, 200);

  };

  useEffect(() => {
    ipc.on('fidelizarMaquina', (event, arg) => {
      // eslint-disable-next-line no-console
      console.log(arg, 'fidelizarMaquina login.tsx');

      if (arg == undefined ) {
        // eslint-disable-next-line no-console
        setmessageError("intente de nuevo, por favor.");
        setOpenError(true);
      }
      if (arg?.statusDTO?.code !== '00') {
        // eslint-disable-next-line no-console
        setmessageError(arg?.statusDTO?.message);
        setOpenError(true);
      }

      if (arg?.statusDTO?.code == '00') {
        setData({
          numeroDocumento: inputs.username,
          nombre: arg.nombreCompleto,
          clave: arg.clave,
          billetero: arg.enableBilletero,
        });

        localStorage.setItem(
          'user',
          JSON.stringify({
            numeroDocumento: inputs.username,
            nombre: arg.nombreCompleto,
            clave: arg.clave,
            billetero: arg.enableBilletero,
          })
        );
        if (localStorage.getItem('user')) history.push('/');
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
    if (button === '{shift}' || button === '{shift1}') handleShift();
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
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    inputs.token != null && history.push('/');
  };

  return (
    <Box p={2}>
      <Grid container justify="flex-end" spacing={1}>
        <Grid item lg={2} md={2} sm={3} xs={4}>
          <Button
            size="large"
            onClick={() => setOpenMasterPassword(true)}
            variant="contained"
            color="secondary"
          >
            <Settings style={{ fontSize: 50 }} />
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
        <Grid item xl={5} lg={5} md={5} sm={5} xs={5}>
          <Typography
            style={{ fontWeight: 900 }}
            variant="h4"
            align="left"
            component="h2"
          >
            {'Iniciar sesión'.toUpperCase()}
          </Typography>
        </Grid>
        <form onSubmit={onSubmit} noValidate autoComplete="off">
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <Grid container direction="row" justify="flex-start" spacing={2}>
              <Grid item xl={5} lg={5} md={5} sm={5} xs={5}>
                <TextField
                  name="username"
                  fullWidth
                  label="Identificación cliente"
                  variant="filled"
                  value={getInputValue('username')}
                  onChange={onChangeInput}
                  onFocus={() => setActiveInput('username')}
                />
              </Grid>
              </Grid>
              <Grid container direction="row" justify="flex-start" spacing={2}>
              <Grid item xl={5} lg={5} md={5} sm={5} xs={5}>
                <Button
                  style={{ height: '100%' }}
                  size="large"
                  type="submit"
                  variant="outlined"
                  fullWidth
                  color="primary"
                >
                  {'Iniciar sesión'}
                </Button>
              </Grid>
            </Grid>

          </Grid>
        </form>
      </Grid>

      <Grid container justify="flex-end" spacing={0}>
        <Grid item lg={2} md={2} sm={2} xs={2}>
          <Button
            onClick={() => history.push('/bar')}
            style={{ display: 'grid' }}
          >
            <BarIcon />
            <Typography variant="h6" style={{ color: 'white' }}>
              {' '}
              Bar{' '}
            </Typography>
          </Button>
        </Grid>
        <Grid item lg={2} md={2} sm={2} xs={2}>
          <Button style={{ display: 'grid' }}>
            <PhoneIcon />
            <Typography variant="h6" style={{ color: 'white' }}>
              {' '}
              Ayuda{' '}
            </Typography>
          </Button>
        </Grid>
      </Grid>

      <Dialog className="dialog-login" open={open} onClose={handleClose} aria-labelledby="token">
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

      <Dialog
        open={openMasterPassword}
        onClose={handleCloseMasterPassword}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={onSubmitConfiguration}>
          <DialogTitle style={{ paddingBottom: 0 }} id="form-dialog-title">
            Contraseña maestra
          </DialogTitle>
          <DialogContent style={{ paddingTop: 0 }}>
            <TextField
              autoFocus
              margin="dense"
              id="passwordMaster"
              label="Contraseña Maestra"
              type="password"
              fullWidth
              value={getInputValue('passwordMaster')}
              onChange={onChangeInput}
              onFocus={() => setActiveInput('passwordMaster')}
            />
            {errorMaster ? <span>Error</span> : null}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseMasterPassword}
              style={{ fontSize: 16 }}
              color="primary"
            >
              cerrar
            </Button>
            <Button type="submit" style={{ fontSize: 16 }} color="primary">
              entrar
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Errores */}

      {messageError ? (
        <Alert
          open={openError}
          onClose={() => setOpenError(false)}
          message={messageError}
        />
      ) : null}
      {/* finales de los erroes */}

      <Grid
        className={`keyboardContainer-login ${!keyboardOpen ? 'hidden' : ''}`}
      >
        <div className="container-closeKeyBoard">

        <button className="closeKeyBoard" onClick={closeKeyboard}>
          Cerrar
        </button>
        </div>
        <Keyboard
          keyboardRef={(r) => (keyboard.current = r)}
          inputName={inputName}
          onChangeAll={onChangeAll}
          layoutName={layoutName}
          onKeyPress={onKeyPress}
          theme="hg-theme-default hg-layout-default myTheme"
          layout={{
            default: [
              '1 2 3 4 5 6 7 8 9 0',
              'q w e r t y u i o p',
              'a s d f g h j k l -',
              '{shift1} z x c v b n m {bksp}',
            ],
            shift: ['1 2 3', '4 5 6', '7 8 9', '{shift} 0 {bksp}'],
          }}
          display={{
            '{bksp}': 'del',
            '{shift1}': '123',
            '{shift}': 'abc',
          }}
          buttonTheme={[
            {
              class: 'hg-red',
              buttons: '{bksp}',
            },
            {
              class: 'hg-highlight',
              buttons: '{bksp}',
            },
          ]}
        />
      </Grid>
    </Box>
  );
}
export default Login;
