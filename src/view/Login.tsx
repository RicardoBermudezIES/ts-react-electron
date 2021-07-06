import { Box, Button, Grid, TextField, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router';

export default function Login() {
  const history = useHistory();
  return (
    <Box p={2}>
      <Grid container justify="flex-end">
        <Grid item>
          <Button onClick={()=> history.push('/configuracion')} variant="contained" color="secondary">
            Configuracion
          </Button>
        </Grid>
      </Grid>
      <Grid container direction="column" justify="center" spacing={2}>
        <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
            <Typography variant="h5" align="center" component="h2">
              Iniciar Sesión
            </Typography>
        </Grid>
        <Grid item xl={4} lg={4} md={4} sm={4} xs={4}>
          <form noValidate autoComplete="off">
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <TextField
                  name="username"
                  fullWidth
                  id="filled-basic"
                  label="Usuario"
                  variant="filled"
                />
              </Grid>
              <Grid item>
                <TextField
                  name="password"
                  fullWidth
                  id="filled-basic"
                  label="Contraseña"
                  variant="filled"
                />
              </Grid>
              <Grid item>
                <Button variant="contained" fullWidth color="primary">
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
}
