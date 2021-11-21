import * as React from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import { Provider } from "next-auth/client";
import theme from "../styles/theme";
import createEmotionCache from "../components/createEmotionCache";

import Header from "../components/Header";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

import "../styles/globals.css";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <Provider session={pageProps.session}>
      <CacheProvider value={emotionCache}>
        <Header />
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Navigation />
          <Component {...pageProps} />
          <Footer />
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
