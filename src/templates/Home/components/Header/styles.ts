import { rem } from "polished";
import styled, { css } from "styled-components";

import { opacity } from "@animations/background";
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
    min-height: ${rem(900)};
    top: ${rem(-100)};
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

  @media (max-width: 420px) {
    flex-direction: column;
    gap: ${rem(5)};
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

  @media (max-width: 760px) {
    font-size: ${rem(43)};
  }

  @media (max-width: 540px) {
    font-size: ${rem(30)};
  }

  @media (max-width: 390px) {
    font-size: ${rem(25)};
  }
`;

export const Description = styled.p`
  margin-top: ${rem(10)};
  color: white;
  font-size: ${rem(18)};
  font-weight: 500;
  text-align: center;

  font-family: "Inter", sans-serif;

  @media (max-width: 760px) {
    font-size: ${rem(13)};
  }

  @media (max-width: 390px) {
    font-size: ${rem(12)};
  }
`;

export const PokeballContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  position: absolute;
  bottom: ${rem(-680)};
  width: ${rem(500)};
  overflow: hidden;

  animation: ${bounce} 3s infinite alternate-reverse ease-in-out;

  @media (max-width: 520px) {
    width: ${rem(480)};
  }

  @media (max-width: 480px) {
    width: 100%;
  }
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
    object-fit: contain;
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

