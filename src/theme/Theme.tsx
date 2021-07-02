import { createMuiTheme } from '@material-ui/core/styles';
import { pink, lightBlue } from '@material-ui/core/colors/';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: pink[500],
      contrastText: "#fff"
    },
    secondary: {
      main: lightBlue[500],
      contrastText: "#fff"
    },
  },
});