import { createTheme } from '@material-ui/core/styles';
import { pink, lightBlue } from '@material-ui/core/colors/';

export const theme = createTheme({
  palette: {
    primary: {
      main: pink[500],
      contrastText: '#fff',
    },
    secondary: {
      main: lightBlue[500],
      contrastText: '#fff',
    },
  },
  overrides: {
    MuiTextField: {
      root: {
        background: '#fff',
      },
    },
    MuiStepper: {
      root: {
        background: 'transparent',
      },
    },
    MuiStepLabel: {
      alternativeLabel: {
        color: '#ffffffab',
        '& .MuiStepLabel-active': { color: '#ffffff' },
        '& .MuiStepLabel-completed': { color: '#ffffff' },
      },
    },
    MuiDialog: {
      root: {
        marginTop: -150,
      },
    },
    MuiSelect: {
      root: {
        background: '#fff',
      },
      filled: {
        background: '#fff',
      },
      select: {
        '&:focus': {
          backgroundColor: 'rgba(255,255,255,0.9)',
        },
      },
    },
  },
});
