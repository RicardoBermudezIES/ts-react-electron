import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  makeStyles,
  Typography,
} from '@material-ui/core';
import {
  AlarmAddRounded,
  SendRounded,
  Visibility,
  VisibilityOff,
} from '@material-ui/icons';
import Keyboard from 'react-simple-keyboard';
import React, { ReactElement, RefObject, useRef, useState } from 'react';
import useChangePassowrdSet from '../Hook/useChangePassSet';
import Alert from './Alert/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '8px !important',
    gap: 12,
    '&:last-child': {
      padding: 0,
    },
  },
  details: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-betwween',
    gap: 16,
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 90,
    height: 90,
    objectFit: 'cover',
    backgroundSize: 'contain',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  notificationYellow: {
    width: 32,
    height: 32,
    backgroundColor: 'yellow',
    position: 'absolute',
    top: 0,
    right: 0,
    borderRadius: 99,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationGreen: {
    width: 32,
    height: 32,
    backgroundColor: 'Green',
    position: 'absolute',
    top: 0,
    right: 0,
    borderRadius: 99,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipPending: {
    background: theme.palette.warning.main,
    color: '#000',
  },
  chipSend: {
    background: theme.palette.success.main,
    color: '#fff',
  },
}));

export default function ChangePassowrd(): ReactElement {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [errorPassword, setErrorPassword] = React.useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);
  const [layoutName, setLayoutName] = useState('shift');
  const [inputName, setInputName] = useState();
  const [keyboardOpen, setkeyboardOpen] = useState(false);
  const keyboard = useRef();

  const [inputs, setInputs] = useState<{
    password: string;
    newPassword: string;
    confirmPassword: string;
  }>({
    password: '',
    newPassword: '',
    confirmPassword: '',
  });

  const {
    callBackChangePassowrd,
    messageError,
    openError,
    setOpenError,
  } = useChangePassowrdSet();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSend = () => {
    console.log(inputs?.newPassword === inputs?.confirmPassword, inputs?.newPassword ,  inputs?.confirmPassword);
    
    if (inputs?.newPassword === inputs?.ConfirmPassword) {
      callBackChangePassowrd(inputs?.password, inputs?.newPassword);
      handleClose();
      closeKeyboard();
      return;
    }
    if (inputs?.newPassword !== inputs?.ConfirmPassword) {
      setErrorPassword(true);
      return;
    }

    
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };
  const handleClickShowPassword3 = () => {
    setShowPassword3(!showPassword3);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onChangeAll = (
    // eslint-disable-next-line @typescript-eslint/no-shadow
    inputs: React.SetStateAction<{
      username: string;
      token: string;
      passwordMaster: string;
    }>
  ): void => {
    setInputs({ ...inputs });
  };

  const onChangeInput = (event: HTMLInputElement) => {
    const inputVal = event.target;

    setInputs({
      ...inputs,
      [inputName]: inputVal.value,
    });
  };

  const handleShift = () => {
    const newLayoutName = layoutName === 'default' ? 'shift' : 'default';
    setLayoutName(newLayoutName);
  };

  const onKeyPress = (button: string) => {
    if (button === '{shift}' || button === '{shift1}') handleShift();
  };

  const getInputValue = (inputName) => {
    return inputs[inputName] || '';
  };

  const closeKeyboard = () => {
    setkeyboardOpen(false);
  };

  const setActiveInput = (
    // eslint-disable-next-line @typescript-eslint/no-shadow
    inputName: string | React.SetStateAction<undefined>
  ) => {
    setInputName(inputName);
    setkeyboardOpen(true);
  };

  return (
    <div style={{ marginLeft: 4 }}>
      <Button
        size="small"
        style={{ display: 'grid', position: 'relative' }}
        onClick={handleClickOpen}
        variant="contained"
        color="primary"
      >
        Cambiar contraseña
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="xs"
        style={{ left: -500 }}
      >
        <DialogTitle>Cambiar contraseña</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Grid
              container
              direction="row"
              justify="center"
              alignContent="center"
              spacing={3}
            >
              <FormControl
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#fff',
                  marginTop: 8,
                }}
              >
                <InputLabel style={{ fontSize: 20, padding: 4 }}>
                  Contraseña actual
                </InputLabel>
                <Input
                  fullWidth
                  style={{ height: '100%' }}
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={getInputValue('password')}
                  onChange={onChangeInput}
                  onFocus={() => setActiveInput('password')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>

              <FormControl
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#fff',
                  marginTop: 8,
                }}
              >
                <InputLabel style={{ fontSize: 20, padding: 4 }}>
                  Contraseña nueva
                </InputLabel>
                <Input
                  fullWidth
                  style={{ height: '100%' }}
                  name="newPassword"
                  type={showPassword2 ? 'text' : 'password'}
                  value={getInputValue('newPassword')}
                  onChange={onChangeInput}
                  onFocus={() => setActiveInput('newPassword')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword2}
                      >
                        {showPassword2 ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>

              <FormControl
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#fff',
                  marginTop: 8,
                }}
              >
                <InputLabel style={{ fontSize: 20, padding: 4 }}>
                  Confirmar Contraseña
                </InputLabel>
                <Input
                  fullWidth
                  style={{ height: '100%' }}
                  name="ConfirmPassword"
                  type={showPassword3 ? 'text' : 'password'}
                  value={getInputValue('ConfirmPassword')}
                  onChange={onChangeInput}
                  onFocus={() => setActiveInput('ConfirmPassword')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword3}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword3 ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
          </DialogContentText>
          {errorPassword ? (
            <span> Las contraseñas no estan iguales</span>
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button
            size="small"
            onClick={handleClose}
            variant="contained"
            color="primary"
            autoFocus
          >
            Cerrar
          </Button>
          <Button
            size="small"
            onClick={handleSend}
            variant="contained"
            color="secondary"
            autoFocus
          >
            enviar
          </Button>
        </DialogActions>
      </Dialog>

      {messageError ? (
        <Alert
          open={openError}
          onClose={() => setOpenError(false)}
          message={messageError}
        />
      ) : null}

      <Grid
        className={`keyboardContainer-login ${!keyboardOpen ? 'hidden' : ''}`}
      >
        <div className="container-closeKeyBoard">
          <button
            type="button"
            className="closeKeyBoard"
            onClick={closeKeyboard}
          >
            Cerrar
          </button>
        </div>
        <Keyboard
          keyboardRef={(r: RefObject<HTMLBaseElement>) =>
            (keyboard.current = r)
          }
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
    </div>
  );
}
