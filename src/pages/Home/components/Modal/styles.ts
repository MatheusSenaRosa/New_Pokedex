import { rem, rgba } from "polished";
import styled, { css } from "styled-components";

import {
  hideOverlay,
  showOverlay,
  hideModal,
  showModal,
} from "@animations/modal";

export const Container = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  z-index: 5;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Overlay = styled.div<{ isClosing: boolean }>`
  ${({ isClosing }) => css`
    background-color: ${rgba("#000000", 0.4)};
    width: 100%;
    height: 100%;
    position: absolute;
    animation: ${isClosing ? hideOverlay : showOverlay} 0.3s ease-in-out;
  `}
`;

export const Modal = styled.div<{ isClosing: boolean }>`
  ${({ isClosing }) => css`
    width: ${rem(710)};
    height: ${rem(508)};

    background-color: white;
    border-radius: ${rem(16)};

    z-index: 6;

    animation: ${isClosing ? hideModal : showModal} 0.3s ease-in-out;
  `}
`;
