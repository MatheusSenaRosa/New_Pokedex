import { rem, rgba, shade } from "polished";
import styled, { css } from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2;
`;

export const Container = styled.div<{ isActive: boolean }>`
  ${({ isActive }) => css`
    border: ${rem(1)} solid #a0afba;
    width: ${rem(488)};
    height: ${rem(56)};
    border-radius: ${rem(10)};

    margin: 0 auto;

    position: relative;

    transition-duration: 0.3s;
    z-index: 3;

    background-color: white;
    display: flex;

    * {
      user-select: none;
    }

    ${isActive &&
    css`
      border-radius: ${rem(10)} ${rem(10)} 0 0;
    `}
  `}
`;

export const Selected = styled.div<{ isActive: boolean; isLoading: boolean }>`
  ${({ isActive, isLoading }) => css`
    height: 100%;
    display: flex;
    flex: 1;
    align-items: center;
    padding: 0 ${rem(20)};
    gap: ${rem(4)};
    font-weight: 500;
    color: ${rgba("#7a7d80", 0.6)};
    transition-duration: 0.3s;
    border-radius: ${rem(10)};

    cursor: pointer;

    span {
      font-weight: 600;
      color: #7a7d80;
    }

    img {
      margin-left: auto;
    }

    ${!isLoading &&
    css`
      :hover {
        background-color: ${shade(0.05, "white")};
      }
    `}

    ${isActive &&
    css`
      border-radius: ${rem(10)} ${rem(10)} 0 0;
    `}
  `}
`;

export const ListWrapper = styled.div`
  position: absolute;

  border: ${rem(1)} solid #a0afba;
  border-radius: 0 0 ${rem(5)} ${rem(5)};
  background-color: white;
  top: ${rem(54)};
  left: ${rem(-1)};
  width: 100.5%;
  padding-bottom: ${rem(2)};
  z-index: 2;
`;

export const List = styled.ul`
  overflow-y: scroll;
  max-height: ${rem(200)};
  border-radius: 0 0 ${rem(5)} ${rem(5)};

  ::-webkit-scrollbar {
    width: ${rem(5)};
    border-radius: ${rem(5)};
  }

  ::-webkit-scrollbar-track {
    background: white;
  }

  ::-webkit-scrollbar-thumb {
    background: #4074c4;
    border-radius: ${rem(5)};
  }
`;

export const Option = styled.li<{ color?: string }>`
  ${({ color = "#7a7d80" }) => css`
    background-color: white;
    transition-duration: 0.3s;

    button {
      background-color: transparent;
      border: none;
      width: 100%;
      height: ${rem(50)};

      font-weight: 600;
      color: ${color};
      font-size: ${rem(14)};

      display: flex;
      align-items: center;
      gap: ${rem(20)};

      padding-left: ${rem(20)};
      cursor: pointer;

      img {
        width: ${rem(17)};
        height: ${rem(17)};
      }
    }

    :hover {
      background-color: ${shade(0.05, "white")};
    }

    :last-child {
      border-radius: 0 0 ${rem(5)} ${rem(5)};

      button {
        border-radius: 0 0 ${rem(5)} ${rem(5)};
      }
    }
  `}
`;
