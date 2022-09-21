import { rem } from "polished";
import { keyframes } from "styled-components";

export const bounce = keyframes`
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(${rem(10)});
  }
`;
