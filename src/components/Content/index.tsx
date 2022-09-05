import * as S from "./styles";
import { useEffect } from "react";
import { usePokeapi } from "@services";

export function Content() {
  const { getTypes } = usePokeapi();

  useEffect(() => {
    (async () => {
      console.log(await getTypes());
    })();
  }, []);

  return (
    <S.Container>
      <S.Wrapper>
        <S.Aside></S.Aside>
      </S.Wrapper>
    </S.Container>
  );
}
