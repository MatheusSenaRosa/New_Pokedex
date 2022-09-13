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
    border: 1px solid #a0afba;
    width: 488px;
    height: 56px;
    border-radius: 10px;

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
      border-radius: 10px 10px 0 0;
    `}
  `}
`;

export const Selected = styled.div<{ isActive: boolean; isLoading: boolean }>`
  ${({ isActive, isLoading }) => css`
    height: 100%;
    display: flex;
    flex: 1;
    align-items: center;
    padding: 0 20px;
    gap: ${rem(4)};
    font-weight: 500;
    color: ${rgba("#7a7d80", 0.6)};
    transition-duration: 0.3s;
    border-radius: 10px;

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
      border-radius: 10px 10px 0 0;
    `}
  `}
`;

export const ListWrapper = styled.div`
  position: absolute;

  border: 1px solid #a0afba;
  border-radius: 0 0 5px 5px;
  background-color: white;
  top: 54px;
  left: -1px;
  width: 100.5%;
  padding-bottom: ${rem(2)};
  z-index: 2;
`;

export const List = styled.ul`
  overflow-y: scroll;
  max-height: ${rem(200)};
  border-radius: 0 0 5px 5px;

  ::-webkit-scrollbar {
    width: 5px;
    border-radius: 5px;
  }

  ::-webkit-scrollbar-track {
    background: white;
  }

  ::-webkit-scrollbar-thumb {
    background: #4074c4;
    border-radius: 5px;
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
      height: 50px;

      font-weight: 600;
      color: ${color};
      font-size: ${rem(14)};

      display: flex;
      align-items: center;
      gap: ${rem(20)};

      padding-left: 20px;
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
      border-radius: 0 0 5px 5px;

      button {
        border-radius: 0 0 5px 5px;
      }
    }
  `}
`;
