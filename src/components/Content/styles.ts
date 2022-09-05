import { rem } from "polished";
import styled from "styled-components";

export const Container = styled.main`
  height: 100vh;
`;

export const Wrapper = styled.div`
  margin: 0 auto;

  height: 100%;

  width: 95%;
  max-width: ${rem(1370)};

  display: flex;
`;

export const Aside = styled.aside`
  border-right: 1px solid #eff3f6;
  width: 270px;
`;
