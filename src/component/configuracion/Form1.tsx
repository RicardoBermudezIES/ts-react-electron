import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  Button,
  Box,
  Grid,
  TextField,
} from '@material-ui/core';
import Keyboard from 'react-simple-keyboard';
import { ipcRenderer } from 'electron';
import { DataContext } from '../../context/Context';

const ipc = ipcRenderer;

export default function Form1({ setInputs, inputs, setIsSync }) {


    //estado Globales 
    const { setToken, setConfig } = useContext(DataContext);

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
      setConfig(inputs);
    };
  
    // recibir el token del ipcMain
  
    useEffect(() => {
      getToken();
    }, []);
  
    const getToken = () => {
      ipc.on('message-config', (event, arg) => {
        if (arg.token !== null) {
          setToken(arg.token);
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
  
    return (
      <Box p={2}>
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
              <TextField
                fullWidth
                name="password"
                label="password"
                variant="filled"
                value={getInputValue('password')}
                onFocus={() => setActiveInput('password')}
                onChange={onChangeInput}
              />
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
        <Grid className={`keyboardContainer ${!keyboardOpen ? 'hidden' : ''}`}>
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
  