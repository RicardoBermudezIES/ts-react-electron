import React, { useContext, useEffect, useState } from 'react';
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
  Grid,
  StepConnector,
} from '@material-ui/core';
import { useHistory } from 'react-router';
import { ipcRenderer } from 'electron';
import Form1 from '../component/configuracion/Form1';
import Form2 from '../component/configuracion/Form2';
import { DataContext } from '../context/Context';
import Alert from '../component/Alert/Alert';

const ipc = ipcRenderer;

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    color: '#fff',
  },
  button: {
    marginRight: theme.spacing(1),
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

function getSteps() {
  return ['Datos de conexión', 'Configuración de Fidelización'];
}

function getStepContent(
  step,
  setInputs,
  inputs,
  handleChangeCasino,
  handleChangeMaquina,
  casino,
  maquina,
  setIsSync
) {
  switch (step) {
    case 0:
      return (
        <Form1 setIsSync={setIsSync} setInputs={setInputs} inputs={inputs} />
      );
    default:
      return (
        <Form2
          casino={casino}
          maquina={maquina}
          handleChangeCasino={handleChangeCasino}
          handleChangeMaquina={handleChangeMaquina}
        />
      );
  }
}

export default function Configuracion() {
  //estado Globales
  const {
    setVinculacion,
    vinculacion,
    setCasino,
    casino,
    setMaquina,
    maquina,
  } = useContext(DataContext);

  const history = useHistory();
  const [isSync, setIsSync] = useState(true);
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

  const [errorVinculacion, setErrorVinculacion] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleFidelizar = () => {
    const localToken = localStorage.getItem('token')
    console.log(localToken)
    let args = {
      host: inputs.host,
      token: localToken,
      serial: maquina,
    };
    maquina !== '' ? ipc.send('VincularMaquina', args) : null;
  };

  useEffect(() => {
    ipc.on('VincularMaquina', (event, arg) => {
      console.log(arg, 'VincularMaquina configuracion.tsx');
      if (arg.statusDTO.code !== '00') {
        setErrorVinculacion(arg.statusDTO.message);
        setOpen(true);
      }
      if (arg.statusDTO.code == '00') setVinculacion(true);
      handleNext();
    });

    console.log(vinculacion);
  }, []);

  const handleChangeCasino = (event) => {
    localStorage.setItem('casino', event.target.value)
    setCasino(event.target.value);
  };
  const handleChangeMaquina = (event) => {
    localStorage.setItem('maquina', event.target.value)
    setMaquina(event.target.value);
  };

  const handleApp = (event) => {
    history.push('/login');
  };
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
      {errorVinculacion ? (
        <Alert
          onClose={() => setOpen(false)}
          open={open}
          message={errorVinculacion}
        />
      ) : null}
      <Grid>
        {activeStep === steps.length ? (
          <Grid>
            <Typography>
              {errorVinculacion
                ? errorVinculacion
                : 'Ya configuraste la Fidelizacion'}
            </Typography>
            <Button
              variant="text"
              onClick={handleReset}
              className={classes.buttonWhite}
            >
              Reiniciar
            </Button>
            <Button
            disabled={errorVinculacion}
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
            <Grid>
              {getStepContent(
                activeStep,
                setInputs,
                inputs,
                handleChangeCasino,
                handleChangeMaquina,
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
                  onClick={handleFidelizar}
                  className={classes.button}
                >
                  Terminar
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
