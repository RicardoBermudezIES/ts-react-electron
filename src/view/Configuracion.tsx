import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Box, Grid, StepConnector, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
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
    top: 22,
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
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
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

function ColorlibStepIcon(props) {
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

function Form1() {
  return (
    <Box p={2}>
      <Grid container direction="row" spacing={2}>
        <Grid item lg={4} md={4} sm={4} xs={4}>
          <TextField name="user" label="Usuario" variant="filled" />
        </Grid>
        <Grid item lg={4} md={4} sm={4} xs={4}>
          <TextField name="password" label="password" variant="filled" />
        </Grid>
        <Grid item lg={4} md={4} sm={4} xs={4}>
          <TextField name="host" label="host" variant="filled" />
        </Grid>
      </Grid>
    </Box>
  );
}

function Form2() {
  return (
    <Box p={2}>
      <Grid container direction="row" spacing={2}>
        <Grid item lg={4} md={4} sm={4} xs={4}>
          <TextField name="tipo" label="Tipo de App" variant="filled" />
        </Grid>
        <Grid item lg={4} md={4} sm={4} xs={4}>
          <TextField name="casino" label="casino" variant="filled" />
        </Grid>
        <Grid item lg={4} md={4} sm={4} xs={4}>
          <TextField name="maquina" label="maquina" variant="filled" />
        </Grid>
      </Grid>
    </Box>
  );
}

function getSteps() {
  return ['Datos de conexión', 'Configuración de Fidelización'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <Form1 />;
    default:
      return <Form2 />;
  }
}

export default function Configuracion() {
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
              onClick={handleReset}
              className={classes.buttonWhite}
            >
              Ir a la App
            </Button>
          </Grid>
        ) : (
          <Grid>
            <Grid className={classes.instructions}>
              {getStepContent(activeStep)}
            </Grid>
            <Grid container justify="space-between">
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.buttonWhite}
              >
                Atras
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? 'Terminar' : 'Siguiente'}
              </Button>
            </Grid>
          </Grid>
        )}
      </Grid>
    </div>
  );
}
