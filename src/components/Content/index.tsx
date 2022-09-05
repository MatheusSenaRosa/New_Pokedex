import { useCallback, useEffect } from "react";

import { usePokeapi } from "@services";
import { iconTypes } from "@assets";

import * as S from "./styles";

type PokemonType = {
  name: string;
};

export function Content() {
  const { getTypes } = usePokeapi();

  const matchIconsWithPokemonTypes = (types: PokemonType[]) => {
    const regex = /[a-z]{1,}\.svg/g;

    const teste = types.reduce((acc: { name: string; icon: string }[], cur) => {
      if (cur.name === "unknown" || cur.name === "shadow") return acc;

      const icon = iconTypes.find((iconItem) => {
        const iconName = iconItem.match(regex)![0].split(".")[0];
        return iconName === cur.name;
      })!;

      return [
        ...acc,
        {
          name: cur.name,
          icon,
        },
      ];
    }, []);
    console.log(teste);
  };

  const fetchData = useCallback(async () => {
    const { results } = await getTypes();
    matchIconsWithPokemonTypes(results);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <S.Container>
      <S.Wrapper>
        <S.Aside></S.Aside>
      </S.Wrapper>
    </S.Container>
  );
}
