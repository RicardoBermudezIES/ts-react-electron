/* eslint-disable import/prefer-default-export */
import { createMuiTheme } from '@material-ui/core/styles';
import { pink, lightBlue } from '@material-ui/core/colors/';


export const theme = createMuiTheme({
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
        '& input': {
          fontSize: '1.3em',
        },
      },
    },
    MuiCardContent: {
      root: {
        padding: 0,
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
