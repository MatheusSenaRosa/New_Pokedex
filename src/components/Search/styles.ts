import { rem } from "polished";
import styled from "styled-components";

export const Container = styled.section`
  height: 263px;
  background-color: #eff3f6;

  display: flex;
  justify-content: center;
  align-items: center;

  padding-top: ${rem(50)};
`;

export const Wrapper = styled.div`
  width: 95%;
  max-width: ${rem(1240)};
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    color: #2f3133;
    width: ${rem(190)};
    font-weight: bold;
    font-size: ${rem(32)};
  }
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  input {
    width: ${rem(405)};
    height: ${rem(56)};
    border-radius: ${rem(122)};
    border: none;
    outline: none;
    z-index: 2;
    padding-left: ${rem(27)};
    color: #a0afba;
    font-size: ${rem(15)};

    font-family: "Inter", sans-serif;

    ::placeholder {
      color: #a0afba;
    }
  }

  button {
    height: ${rem(40)};
    width: ${rem(40)};

    position: absolute;
    z-index: 2;
    right: ${rem(10)};

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: ${rem(24)};
    color: #9fbae1;
    border: none;
    border-radius: 50%;

    outline: none;
    cursor: pointer;
    color: #3e75c3;
    background-color: #f5f8fc;
    border: 1px solid #e1e9ef;
    transition: 0.3s;

    :hover {
      background-color: #e2eaf6;
    }

    :disabled {
      cursor: default;
      border: 1px solid #f0f4f7;
      background-color: #fafcfe;
      color: #9fbae1;
    }
  }
`;
