import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import { ipcRenderer } from 'electron';
import { DataContext } from '../../context/Context';

const ipc = ipcRenderer;

const useStyles2 = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Form2({
  handleChangeCasino,
  handleChangeMaquina,
  casino,
  maquina,
}) {
  //estado Globales
  const { config } = useContext(DataContext);

  const classes = useStyles2();
  const [casinos, setCasinos] = useState([]);
  const [maquinas, setMaquinas] = useState([]);

  //hacer peticiones para obtener los casinos
  const localToken = localStorage.getItem('token');

  const authConfig = JSON.parse(localStorage.getItem('authConfig'));

  const getCasinos = () => {
    let arg = {
      token: localToken,
      host: authConfig?.host,
    };
    ipc.send('get-casinos', arg);
  };

  useEffect(() => {
    ipc.on('get-casinos', (event, arg) => {
      console.log(arg, 'casinos configuracion.tsx');
      if(arg === 'Error: Request failed with status code 404'){
        setCasinos([]);
        return 
      }
      setCasinos(arg);
    });
  }, []);

  const getMaquinas = () => {
    let arg = {
      token: localToken,
      host: authConfig?.host,
      idCasino: casino,
    };

    ipc.send('get-maquinas', arg);
  };

  useEffect(() => {
    ipc.on('get-maquinas', (event, arg) => {
      console.log(arg, 'maquinas configuracion.tsx');
      setMaquinas(arg);
    });
  }, []);

  return (
    <Box p={2}>
      <Grid container direction="row" spacing={2}>
        <Grid item lg={4} md={4} sm={4} xs={4}>
          <FormControl
            fullWidth
            variant="filled"
            className={classes.formControl}
          >
            <InputLabel id="Casino">Casino</InputLabel>
            <Select
              value={casino}
              labelId="Casino"
              onChange={handleChangeCasino}
            >
              {casinos?.length > 0 ? (
                casinos?.map((c, i) => (
                  <MenuItem key={i} value={c?.codigoCasino}>
                    {' '}
                    {c?.nombreCasino}{' '}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>
        <Grid item lg={4} md={4} sm={4} xs={4}>
          <FormControl
            fullWidth
            variant="filled"
            className={classes.formControl}
          >
            <InputLabel id="Maquina">Maquina</InputLabel>
            <Select
              value={maquina}
              labelId="Maquina"
              onChange={handleChangeMaquina}
            >
              {maquinas?.length > 0 ? (
                maquinas?.map((m) => (
                  <MenuItem key={m?.numeroDispositivo} value={m?.serial}>
                    {' '}
                    {m?.numeroDispositivo}{' '}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container direction="row" spacing={2}>
        <Grid item>
          {' '}
          <Button onClick={getCasinos} variant="contained" color="primary">
            {' '}
            obtener casinos{' '}
          </Button>{' '}
        </Grid>
        <Grid item>
          {' '}
          <Button onClick={getMaquinas} variant="contained" color="primary">
            {' '}
            obtener maquinas{' '}
          </Button>{' '}
        </Grid>
      </Grid>
    </Box>
  );
}
