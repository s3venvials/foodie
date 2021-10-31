import { createTheme } from '@mui/material/styles';
import { red, blue } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: blue.A200,
    },
    secondary: {
      main: blue["400"],
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;