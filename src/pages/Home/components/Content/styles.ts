import { rem, rgba } from "polished";
import styled, { css } from "styled-components";
import { reveal } from "@animations/reveal";
import { spin } from "@animations/spin";

export const Container = styled.main`
  min-height: ${rem(1370)};

  display: flex;
`;

export const Wrapper = styled.div`
  margin: 0 auto;

  width: 95%;
  max-width: ${rem(1235)};

  display: flex;
`;

export const Aside = styled.aside`
  border-right: ${rem(1)} solid #eff3f6;
  width: ${rem(237)};
  height: 100%;
  padding-top: ${rem(54)};

  ul {
    display: flex;
    flex-direction: column;
  }
`;

export const Icon = styled.img<{ size?: number }>`
  ${({ size = 18 }) => css`
    width: ${rem(size)};
    height: ${rem(size)};
  `}
`;

export const TypeItem = styled.button<{ color: string; active: boolean }>`
  ${({ color, active }) => css`
    display: flex;
    align-items: center;
    gap: ${rem(22)};
    height: ${rem(53)};

    border: none;
    background-color: transparent;

    width: min-content;
    color: gray;

    user-select: none;

    font-family: "Inter", sans-serif;
    font-size: ${rem(15)};
    font-weight: 500;

    opacity: 0.6;

    cursor: pointer;
    transition-duration: 0.3s;

    img {
      transition-duration: 0.3s;
      filter: grayscale(100%);
      -webkit-filter: grayscale(100%);
      -moz-filter: grayscale(100%);
    }

    ${active &&
    css`
      color: ${color};
      opacity: 1;

      img {
        filter: none;
      }
    `}

    ${!active &&
    css`
      :hover {
        color: ${color};
        opacity: 1;

        img {
          filter: none;
        }
      }
    `}
  `}
`;

export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: ${rem(300)};
  margin-right: ${rem(120)};

  div {
    height: ${rem(50)};
    width: ${rem(50)};
    border-radius: 50%;

    border: ${rem(10)} solid gray;
    border-top-color: transparent;

    animation: ${spin} 0.7s infinite linear;
  }
`;

export const MainContent = styled.section`
  flex: 1;
  margin-top: ${rem(23)};
  padding-top: ${rem(54)};

  padding-left: ${rem(75)};

  display: flex;
  flex-direction: column;
`;

export const Counter = styled.div`
  display: flex;
  align-items: center;
  gap: ${rem(20)};

  h4 {
    font-family: "Inter", sans-serif;
    color: #4d5053;
    font-size: ${rem(18)};
    font-weight: bold;
  }
`;

export const PokemonsList = styled.ul`
  margin-top: ${rem(79)};
  margin-bottom: ${rem(100)};

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: ${rem(30)};
  grid-row-gap: ${rem(30)};
`;

export const PokemonItem = styled.li`
  width: ${rem(286)};
  height: ${rem(304)};
  border-radius: ${rem(12)};
  padding-top: ${rem(40)};
  padding: ${rem(40)} ${rem(27)} ${rem(20)} ${rem(27)};

  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;

  box-shadow: ${rem(0)} ${rem(10)} ${rem(51)} ${rem(-5)}
    rgba(183, 189, 193, 0.3);
  cursor: pointer;

  animation: ${reveal} 0.3s;
  transition-duration: 0.2s;

  :hover {
    box-shadow: ${rem(0)} ${rem(10)} ${rem(51)} ${rem(-5)}
      rgba(183, 189, 193, 1);

    transform: translateY(${rem(-4)}) !important;
  }
`;

export const ImageWrapper = styled.div<{ color: string }>`
  ${({ color }) => css`
    width: ${rem(165)};
    height: ${rem(165)};
    border-radius: 50%;
    background-color: ${rgba(color, 0.2)};

    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: ${rem(110)};
      height: ${rem(110)};
      object-fit: contain;
    }
  `}
`;

export const PokemonInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${rem(10)};

  width: 100%;

  h5 {
    width: 100%;
    color: #7a7d80;
    font-weight: 500;
    font-size: ${rem(13)};
    font-family: "Inter", sans-serif;
  }

  span {
    display: flex;
    justify-content: space-between;
    h3 {
      color: #2f3133;
      font-size: ${rem(18)};
    }
  }
`;

export const LoadMoreButton = styled.button`
  margin: 0 auto ${rem(100)} auto;
  height: ${rem(45)};
  width: ${rem(196)};
  border-radius: ${rem(6)};
  color: #3f5db3;
  background-color: rgba(63, 93, 179, 0.1);
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: ${rem(14)};
  font-family: "Inter", sans-serif;
  transition-duration: 0.3s;
  :hover {
    color: white;
    background-color: #3f5db3;
  }
`;
