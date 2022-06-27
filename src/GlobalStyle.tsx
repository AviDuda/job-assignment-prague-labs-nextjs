import { css } from "styled-components";

export const device = {
    mobile: "(max-width: 400px)",
    desktop: "(max-width: 1239px)",
    desktopLarge: "(min-width: 1240px)",
};

export const GlobalStyleCss = css`
    :root {
        --orange: #ff5e55;
        --beige: #edeae3;
        --white: #ffffff;
        --dark-blue: #1f2244;
        --dark-grey: #9c8c8c;
        --green: #119383;
        --font-family: Roboto, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Oxygen, Ubuntu, Cantarell,
            "Open Sans", "Helvetica Neue", sans-serif;
        --fs-large: 1.5rem; /* 24px */
        --fs-normal: 1rem; /* 16px */
        --fs-small: 0.875rem; /* 14px */
        --fs-tiny: 0.75rem; /* 12px */
        --fw-normal: 400;
        --fw-bold: 700;
        --fw-black: 900;
        --max-page-width: 1240px;
    }

    html,
    body {
        padding: 0;
        margin: 0;
        font-family: var(--font-family);
    }

    button,
    input,
    select {
        font-family: var(--font-family);
        font-size: var(--fs-normal);
    }

    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
    }
`;

export const CssReset = css`
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    * {
        margin: 0;
        padding: 0;
    }

    html,
    body {
        height: 100%;
    }

    body {
        -webkit-font-smoothing: antialiased;
    }

    img,
    picture,
    video,
    canvas,
    svg {
        display: block;
        max-width: 100%;
    }

    p,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    li,
    dl,
    dt,
    blockquote {
        overflow-wrap: break-word;
    }

    #root,
    #__next {
        isolation: isolate;
    }
`;
