import { usePokemon } from "@context/usePokemon";

import * as S from "./styles";

export function Content() {
  const { pokemonTypes } = usePokemon();

  return (
    <S.Container>
      <S.Wrapper>
        <S.Aside>
          {pokemonTypes && (
            <ul>
              {pokemonTypes.map((item) => (
                <S.ListItem color={item.color}>
                  <img src={item.icon} alt={item.type} />
                  {item.type}
                </S.ListItem>
              ))}
            </ul>
          )}
        </S.Aside>
      </S.Wrapper>
    </S.Container>
  );
}
