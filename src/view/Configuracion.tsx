import React, { MutableRefObject, useRef, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  StepConnector,
  TextField,
} from '@material-ui/core';
import Keyboard from 'react-simple-keyboard';
import { useHistory } from 'react-router';

const useStyles2 = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    color:"#fff"
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  buttonWhite: {
    color: '#fff',
    marginRight: theme.spacing(1),
  },
}));

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 20,
  },
  active: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  line: {
    height: 2,
    border: 0,
    color: '#fff',
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 40,
    height: 40,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  },
});

function ColorlibStepIcon(props: any) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

function Form1({ setInputs, inputs, setIsSync }) {
  const [layoutName, setLayoutName] = useState('default');
  const [inputName, setInputName] = useState();
  const [keyboardOpen, setkeyboardOpen] = useState(false);
  const keyboard = useRef();

  const onChangeAll = (inputs) => {
    setInputs({ ...inputs });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setIsSync(false)
    console.log(inputs);
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

function Form2({
  handleChange,
  handleChangeCasino,
  handleChangeMaquina,
  funcionalidad,
  casino,
  maquina,
}) {
  const classes = useStyles2();

  return (
    <Box p={2}>
      <Grid container direction="row" spacing={2}>
        <Grid item lg={4} md={4} sm={4} xs={4}>
          <FormControl
            fullWidth
            variant="filled"
            className={classes.formControl}
          >
            <InputLabel id="Funcionalidad">Funcionalidad</InputLabel>
            <Select
              value={funcionalidad}
              labelId="Funcionalidad"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>
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
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
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
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}

function getSteps() {
  return ['Datos de conexión', 'Configuración de Fidelización'];
}

function getStepContent(
  step,
  setInputs,
  inputs,
  handleChange,
  handleChangeCasino,
  handleChangeMaquina,
  funcionalidad,
  casino,
  maquina,
  setIsSync
) {
  switch (step) {
    case 0:
      return <Form1 setIsSync={setIsSync} setInputs={setInputs} inputs={inputs} />;
    default:
      return (
        <Form2
          funcionalidad={funcionalidad}
          casino={casino}
          maquina={maquina}
          handleChange={handleChange}
          handleChangeCasino={handleChangeCasino}
          handleChangeMaquina={handleChangeMaquina}
        />
      );
  }
}

export default function Configuracion() {
  const history = useHistory()
  const [isSync, setIsSync] = useState(true)
  const [inputs, setInputs] = useState({
    user: null,
    password: null,
    host: null,
  });

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const [funcionalidad, setFuncionalidad] = React.useState('');
  const [casino, setCasino] = React.useState('');
  const [maquina, setMaquina] = React.useState('');

  const handleChange = (event) => {
    setFuncionalidad(event.target.value);
  };
  const handleChangeCasino = (event) => {
    setCasino(event.target.value);
  };
  const handleChangeMaquina = (event) => {
    setMaquina(event.target.value);
  };

  const handleApp = (event) => {
    history.push('/login')
  }
  return (
    <div className={classes.root}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Grid>
        {activeStep === steps.length ? (
          <Grid>
            <Typography className={classes.instructions}>
              Ya configuraste la Fidelizacion
            </Typography>
            <Button
              variant="text"
              onClick={handleReset}
              className={classes.buttonWhite}
            >
              Reiniciar
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleApp}
              className={classes.buttonWhite}
            >
              Ir a la App
            </Button>
          </Grid>
        ) : (
          <Grid>
            <Grid className={classes.instructions}>
              {getStepContent(
                activeStep,
                setInputs,
                inputs,
                handleChange,
                handleChangeCasino,
                handleChangeMaquina,
                funcionalidad,
                casino,
                maquina,
                setIsSync
              )}
            </Grid>
            <Grid container justify="space-between">
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.buttonWhite}
              >
                Atras
              </Button>
              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                >
                  Terminar{' '}
                </Button>
              ) : (
                <Button
                  disabled={isSync}
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                >
                  Siguiente
                </Button>
              )}
            </Grid>
          </Grid>
        )}
      </Grid>
    </div>
  );
}
