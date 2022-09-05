import { rem } from "polished";
import styled from "styled-components";

export const Container = styled.footer`
  background-color: #3f5db3;
  height: ${rem(190)};
`;

export const Wrapper = styled.div`
  width: 95%;
  max-width: ${rem(1370)};
  height: 100%;

  margin: 0 auto;

  display: flex;
  align-items: center;
`;

export const Technologies = styled.div`
  color: white;
  font-family: "Inter", sans-serif;

  display: flex;
  flex-direction: column;
  gap: ${rem(5)};

  h3 {
    font-size: ${rem(18)};
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: ${rem(2)};

    li {
      font-size: ${rem(14)};

      ::before {
        content: "- ";
      }
    }
  }
`;
