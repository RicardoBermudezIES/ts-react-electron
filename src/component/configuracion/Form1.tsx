import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  Box,
  Grid,
  TextField,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from '@material-ui/core';
import Keyboard from 'react-simple-keyboard';
import { ipcRenderer } from 'electron';
import Alert from '../Alert/Alert';
import { Visibility,  VisibilityOff } from '@material-ui/icons'


const ipc = ipcRenderer;

export default function Form1({ setInputs, inputs, setIsSync }) {


    //estado Globales
    const [openModal, setOpenModal] = useState(false);
    const [message, setMessage] = useState('default');
    const [showPassword, setShowPassword]= useState(false);

    const [layoutName, setLayoutName] = useState('default');
    const [inputName, setInputName] = useState();
    const [keyboardOpen, setkeyboardOpen] = useState(false);
    const keyboard = useRef();

    const onChangeAll = (inputs) => {
      setInputs({ ...inputs });
    };

    const onSubmit = (e) => {
      e.preventDefault();

      console.log(inputs);
      ipc.send('message-config', inputs);
      localStorage.setItem('authConfig', JSON.stringify(inputs));
    };

    // recibir el token del ipcMain

    useEffect(() => {
      getToken();
    }, []);

    const getToken = () => {
      ipc.on('message-config', (event, arg) => {
        console.log(arg)

        if (arg == "Error: getaddrinfo ENOTFOUND null") {
          setOpenModal(true)
          setIsSync(true)
          setMessage("La datos no son correctos")
          return
        }


        if (arg == "Error: Request failed with status code 401") {
          setOpenModal(true)
          setIsSync(true)
          setMessage("los datos de usuarios no tienen permisos")
          return
        }

        if (arg == "Error: Request failed with status code 422") {
          setOpenModal(true)
          setIsSync(true)
          setMessage("Faltan datos para loguearse")
          return
        }

        if (arg?.token && arg?.token !== null) {
          localStorage.setItem('token',arg?.token);
          setIsSync(false);
        }
      });
    };

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

    const handleClickShowPassword = () => {
      setShowPassword(!showPassword );
    };
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    return (
      <Box p={2}>
        {
        <Alert
          open={openModal}
          onClose={() => setOpenModal(false)}
          message={message}
        />
        }
        <form onSubmit={onSubmit}>
          <Grid container direction="row" spacing={2}>
            <Grid item lg={4} md={4} sm={4} xs={4}>
              <TextField
                fullWidth
                name="user"
                label="Usuario"
                value={getInputValue('user')}
                onChange={onChangeInput}
                onFocus={() => setActiveInput('user')}
                variant="filled"
              />
            </Grid>
            <Grid item lg={4} md={4} sm={4} xs={4}>
            <FormControl style={{ width:'100%', height: '100%' ,backgroundColor:'#fff'}}>
              <InputLabel  style={{fontSize: 22,  padding:4  }}>Password</InputLabel>
              <Input
                fullWidth
                style={{height: '100%' }}
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={getInputValue('password')}
                onFocus={() => setActiveInput('password')}
                onChange={onChangeInput}
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
            </Grid>
            <Grid item lg={4} md={4} sm={4} xs={4}>
              <TextField
                fullWidth
                name="host"
                label="host"
                value={getInputValue('host')}
                onFocus={() => setActiveInput('host')}
                variant="filled"
                onChange={onChangeInput}
              />
            </Grid>
          </Grid>
          <Grid container style={{ marginTop: 20 }}>
            <Grid item lg={3} md={3} sm={3} xs={3}>
              <Button type="submit" variant="contained" color="primary">
                Sincronizar
              </Button>
            </Grid>
          </Grid>
        </form>
        <Grid className={`keyboardContainer-config ${!keyboardOpen ? 'hidden' : ''}`}>
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
