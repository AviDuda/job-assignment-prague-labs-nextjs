import styled, { css } from "styled-components";

import { device } from "../GlobalStyle";

export const CenteredContainer = styled.div`
    max-width: var(--max-page-width);
    margin: 0 auto;
`;

export const Flex = styled.div<{
    flexDirection?: string;
    gap?: string;
    wrap?: "nowrap" | "wrap" | "wrap-reverse";
    alignItems?: string;
    justifyContent?: string;
    placeContent?: string;
}>`
    display: flex;
    ${({ flexDirection }) =>
        flexDirection &&
        css`
            flex-direction: ${flexDirection};
        `}
    ${({ gap }) =>
        gap &&
        css`
            gap: ${gap};
        `}
  ${({ wrap }) =>
        wrap &&
        css`
            flex-wrap: ${wrap};
        `}
  ${({ alignItems }) =>
        alignItems &&
        css`
            align-items: ${alignItems};
        `}
  ${({ justifyContent }) =>
        justifyContent &&
        css`
            justify-content: ${justifyContent};
        `}
  ${({ placeContent }) =>
        placeContent &&
        css`
            place-content: ${placeContent};
        `}
`;

export const Heading = styled(Flex).attrs({ as: "header" })`
    padding: 1.375rem 6.25rem;
    border-bottom: 1px solid var(--beige);
    @media ${device.mobile} {
        margin: 0 auto;
        padding: 1.375rem 1rem;
    }
`;
