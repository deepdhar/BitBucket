import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { blue, grey } from '@mui/material/colors';
import { GlobalStyles } from '@mui/material';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: grey[800],
      paper: grey[900],
    },
    primary: {
      main: blue[900],
    },
  },
  typography: {
    h3: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
    },
    body2: {
      fontSize: '0.875rem',
    },
  },
});


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: { margin: 0, padding: 0, boxSizing: 'border-box' },
          '*': { boxSizing: 'inherit' },
          a: { textDecoration: 'none', color: 'inherit' },
        }}
      />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;