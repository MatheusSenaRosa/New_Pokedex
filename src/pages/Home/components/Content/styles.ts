import { rem } from "polished";
import styled, { css } from "styled-components";

export const Container = styled.main`
  min-height: ${rem(1370)};
`;

export const Wrapper = styled.div`
  margin: 0 auto;

  height: 100%;

  width: 95%;
  max-width: ${rem(1235)};

  display: flex;
`;

export const Aside = styled.aside`
  border-right: ${rem(1)} solid #eff3f6;
  width: ${rem(237)};

  padding-top: ${rem(54)};

  ul {
    display: flex;
    flex-direction: column;
  }
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
      width: ${rem(18)};
      height: ${rem(18)};

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
