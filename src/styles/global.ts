import { createGlobalStyle, css } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    ${css`
      * {
        margin: 0;
        padding: 0;
        font-family: "Montserrat", sans-serif;
        box-sizing: border-box;
      }
    `}
`;
