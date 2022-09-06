import styled, { css } from "styled-components";
import { opacity } from "@animations/background";
import { rem } from "polished";
import { bounce } from "@animations/bounce";
import { reveal } from "@animations/reveal";

export const Container = styled.header`
  width: 100%;
  padding-top: ${rem(25)};

  display: flex;
  flex-direction: column;
  align-items: center;
  height: ${rem(707)};

  * {
    -webkit-user-drag: none;
    user-select: none;
  }
`;

export const Image = styled.img<{ isShowing: boolean }>`
  ${({ isShowing }) => css`
    position: absolute;
    top: ${rem(-133)};
    height: 100%;
    width: 100%;
    object-fit: cover;
    z-index: ${isShowing ? -1 : -2};
    animation: ${isShowing && opacity} 500ms;
  `}
`;

export const LogoContainer = styled.div`
  width: 95%;
  max-width: ${rem(1235)};

  display: flex;
  align-items: center;
  justify-content: space-between;

  h4 {
    color: white;
    font-size: ${rem(13)};
    font-weight: normal;
    font-family: "Inter", sans-serif;

    span {
      font-weight: bold;
    }
  }
`;

export const Logo = styled.img`
  height: ${rem(65)};
  width: ${rem(165)};
`;

export const CenterContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  animation: ${reveal} 800ms forwards ease-in-out;
`;

export const Title = styled.h2`
  color: white;
  margin-top: ${rem(119)};
  font-size: ${rem(63)};

  animation: ${opacity} 500ms;
`;

export const Description = styled.p`
  margin-top: ${rem(10)};
  color: white;
  font-size: ${rem(18)};
  font-weight: 500;

  font-family: "Inter", sans-serif;
`;

export const PokeballContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  position: absolute;
  bottom: ${rem(-680)};

  width: ${rem(798)};

  animation: ${bounce} 3s infinite alternate-reverse ease-in-out;
`;

export const Stars = styled.img<{ type: "red" | "blue" }>`
  ${({ type }) => css`
    height: ${rem(58)};
    width: ${rem(170)};

    ${type === "red" &&
    css`
      margin-bottom: ${rem(-5)};
    `}

    ${type === "blue" &&
    css`
      margin-bottom: ${rem(-68)};
    `}
  `}
`;

export const Pokeball = styled.img<{ type: "red" | "blue" }>`
  ${({ type }) => css`
    object-fit: cover;
    animation: ${opacity} 500ms;

    ${type === "blue" &&
    css`
      margin-left: ${rem(20)};
      margin-bottom: ${rem(20)};
      height: ${rem(557)};
    `}

    ${type === "red" &&
    css`
      height: ${rem(514)};
    `}
  `}
`;
