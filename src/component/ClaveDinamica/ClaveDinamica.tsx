import {
  Button, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle, Grid, TextField
} from '@material-ui/core';
import React, { ReactElement, useRef, useState } from 'react';
import Keyboard from 'react-simple-keyboard';
import useDinamica from '../../Hook/useDinamica';

export default function ValidarClaveDinamicaComponent({
  openDinamica,
  handleCloseDinamica,
  pk,
}: any): ReactElement {
  const [keyboardOpen, setkeyboardOpen] = useState(false);
  const [layoutName, setLayoutName] = useState('shift');
  const [input, setInput] = useState('');
  const keyboard = useRef();
  const [random, setRandom] = useState(Math.floor(Math.random() * 100000));

  const {
    callbackValidarClaveDinamica,
    errorDinamica,
  } = useDinamica();

  const onChange = (input) => {
    setInput(input);
    console.log('Input changed', input);
  };

  const handleShift = () => {
    const newLayoutName = layoutName === 'default' ? 'shift' : 'default';
    setLayoutName(newLayoutName);
  };

  const onKeyPress = (button) => {
    console.log('Button pressed', button);
    if (button === '{shift}' || button === '{lock}') handleShift();
  };

  const onChangeInput = (event) => {
    const input = event.target.value;
    setInput(input);
    keyboard.current.setInput(input);
  };
  const closeKeyboard = () => {
    setkeyboardOpen(false);
  };

  const setActiveInput = () => {
    setkeyboardOpen(true);
  };

  const solicitar = () => {
    callbackValidarClaveDinamica(input, pk);
    setInput('');
    keyboard.current.setInput('');
    closeKeyboard()
  };

  return (
    <>
      <Dialog
        open={openDinamica}
        onClose={handleCloseDinamica}
        style={{ left: -450 }}
        maxWidth="xs"
      >
        <DialogTitle>Contraseña dinámica</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="dinamica"
              label="dinámica"
              type="password"
              fullWidth
              value={input}
              onChange={onChangeInput}
              onFocus={() => setActiveInput()}
            />
            {
              errorDinamica ? 'Error en la clave dinamica' : null
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDinamica}
            variant="contained"
            color="primary"
            autoFocus
          >
            Cerrar
          </Button>
          <Button
            onClick={solicitar}
            variant="contained"
            color="primary"
            autoFocus
          >
            Solicitar
          </Button>
        </DialogActions>
      </Dialog>

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
          keyboardRef={(r) => (keyboard.current = r)}
          layoutName={layoutName}
          onChange={onChange}
          onKeyPress={onKeyPress}
          baseClass={`keyboard${random}`}
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
            '{bksp}': 'Borrar',
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
    </>
  );
}
