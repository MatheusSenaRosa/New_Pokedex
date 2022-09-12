import { spin } from "@animations/spin";
import { rem } from "polished";
import styled, { css } from "styled-components";

// Generate dynamic borderWidth getting 12.5% from size
const getPercentage = (size: number) => (size * 12.5) / 100;

export const Container = styled.div<{ size?: number; color?: string }>`
  ${({ size = 40, color = "#3f5db3" }) => css`
    height: ${rem(size)};
    width: ${rem(size)};
    border-radius: 50%;

    border: ${rem(getPercentage(size))} solid ${color};
    border-top-color: transparent;

    animation: ${spin} 0.7s infinite linear;
  `}
`;
