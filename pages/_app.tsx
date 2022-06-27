import type { AppProps } from "next/app";
import { createGlobalStyle } from "styled-components";

import { GlobalStyleCss, CssReset } from "../src/GlobalStyle";

const GlobalStyle = createGlobalStyle`
  ${CssReset}

  ${GlobalStyleCss}
`;

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <GlobalStyle />
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
