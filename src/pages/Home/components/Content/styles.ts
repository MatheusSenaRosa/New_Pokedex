import { rem, rgba } from "polished";
import styled, { css } from "styled-components";

export const Container = styled.main`
  min-height: ${rem(1370)};

  display: flex;
`;

export const Wrapper = styled.div`
  margin: 0 auto;

  width: 95%;
  max-width: ${rem(1235)};
  padding-top: ${rem(54)};

  display: flex;
`;

export const Aside = styled.aside`
  border-right: ${rem(1)} solid #eff3f6;
  width: ${rem(237)};
  height: 100%;

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

export const ListItem = styled.li<{ color: string }>`
  ${({ color }) => css`
    display: flex;
    align-items: center;
    gap: ${rem(22)};
    height: ${rem(53)};

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

    :hover {
      color: ${color};
      opacity: 1;

      img {
        filter: none;
      }
    }
  `}
`;

export const MainContent = styled.section`
  flex: 1;
  margin-top: ${rem(23)};

  padding-left: ${rem(75)};
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

  display: grid;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 30px;
  grid-row-gap: 30px;
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
  transition-duration: 0.2s;
  cursor: pointer;

  :hover {
    box-shadow: ${rem(0)} ${rem(10)} ${rem(51)} ${rem(-5)}
      rgba(183, 189, 193, 1);

    transform: translateY(-4px);
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
