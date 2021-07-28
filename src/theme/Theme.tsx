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
    MuiButton:{
      root:{
        fontSize:"1.4em"
      },
      outlinedPrimary:{
        borderWidth: "0.3em",
        padding: "7px 21px",
        "&:hover":{
          border:"0.3em solid #e91e63",
          padding: "7px 21px"
        }
      }
    },
    MuiTextField: {
      root: {
        background: '#fff',
        '& input': {
          fontSize: '1.5em',
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
        padding: 5,
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
        marginTop: -180,
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
