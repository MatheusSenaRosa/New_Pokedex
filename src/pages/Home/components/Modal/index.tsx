import { useState, useEffect } from "react";
import { Portal } from "@components";

import * as S from "./styles";
import { hideScroll, showScroll } from "@utils";

type Props = {
  onClose: () => void;
};

export function Modal({ onClose }: Props) {
  const [isModalClosing, setIsModalClosing] = useState(false);

  useEffect(() => {
    hideScroll();
  }, []);

  const closeHandler = () => {
    setIsModalClosing(true);

    setTimeout(() => {
      showScroll();
      onClose();
      setIsModalClosing(false);
    }, 300);
  };

  return (
    <Portal>
      <S.Container>
        <S.Overlay onClick={closeHandler} isClosing={isModalClosing} />

        <S.Modal isClosing={isModalClosing}>
          <h1>dsakdo</h1>
        </S.Modal>
      </S.Container>
    </Portal>
  );
}
