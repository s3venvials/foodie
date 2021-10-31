import { createTheme } from '@mui/material/styles';
import { red, blue, blueGrey } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: blue.A200,
    },
    secondary: {
      main: blueGrey.A700,
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;