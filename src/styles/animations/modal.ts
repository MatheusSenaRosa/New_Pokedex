import { rem } from "polished";
import { keyframes } from "styled-components";

export const showOverlay = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

export const hideOverlay = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;

export const showModal = keyframes`
  from {
    opacity: 0;
    transform: translateY(${rem(20)});
  }

  to {
    opacity: 1;
    transform: translateY(${rem(0)});
  }
`;

export const hideModal = keyframes`
  from {
    opacity: 1;
    transform: translateY(${rem(0)});
  }

  to {
    opacity: 0;
    transform: translateY(${rem(20)});
  }
`;
