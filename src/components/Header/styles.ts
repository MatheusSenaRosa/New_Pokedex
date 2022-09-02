import styled, { css } from "styled-components";
import { opacity } from "@animations/background";
import { rem } from "polished";

export const Container = styled.header`
  width: 100%;
  position: relative;
`;

export const Image = styled.img<{ isShowing: boolean }>`
  ${({ isShowing }) => css`
    position: absolute;
    height: ${rem(706)};
    width: 100%;
    object-fit: cover;
    z-index: ${isShowing ? 1 : 0};
    animation: ${isShowing && opacity} 300ms;
  `}
`;
