import { css, keyframes } from "styled-components";

export const bounce = keyframes`
    ${css`
      from {
        transform: translateY(0);
      }

      to {
        transform: translateY(10px);
      }
    `}
`;
