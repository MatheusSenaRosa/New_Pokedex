import { useEffect, useState } from "react";
import { BlueBackground, RedBackground } from "@assets";

import * as S from "./styles";

export function Header() {
  const [background, setBackground] = useState<"red" | "blue">("red");
  const [isChanging, setIsChanging] = useState(true);

  useEffect(() => {
    setInterval(() => {
      setBackground((prev) => (prev === "blue" ? "red" : "blue"));
    }, 4000);
  }, []);

  return (
    <S.Container>
      <S.Image src={BlueBackground} isShowing={background === "blue"} />

      <S.Image src={RedBackground} isShowing={background === "red"} />
    </S.Container>
  );
}
