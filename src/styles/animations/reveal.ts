import { rem } from "polished";
import { keyframes } from "styled-components";

export const reveal = keyframes`
  from {
    opacity: 0;
    transform: translateY(${rem(20)});
  }
  to {
    opacity: 1;
    transform: translateY(${rem(0)});
  }
`;
