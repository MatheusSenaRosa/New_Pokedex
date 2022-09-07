import { Pokeball } from "@assets";
import { usePokemon } from "@context/usePokemon";
import { capitalizeFirstLetter } from "@utils";

import * as S from "./styles";

export function Content() {
  const { isLoading, pokemonTypes, count, pokemons } = usePokemon();

  const findColorAndIconByPokemonType = (type: string) => {
    const { icon, color } = pokemonTypes.find(
      (pokemonType) => pokemonType.type === type
    )!;
    return {
      icon,
      color,
    };
  };

  return (
    <S.Container>
      <S.Wrapper>
        <S.Aside>
          {!isLoading && (
            <ul>
              {pokemonTypes.map(({ color, icon, type }) => (
                <S.ListItem color={color}>
                  <S.Icon src={icon} alt={type} />
                  {capitalizeFirstLetter(type)}
                </S.ListItem>
              ))}
            </ul>
          )}
        </S.Aside>

        <S.MainContent>
          {!isLoading && (
            <>
              <S.Counter>
                <S.Icon src={Pokeball} alt="pokeball" size={20} />
                <h4>{count} Pokémons</h4>
              </S.Counter>

              <S.PokemonsList>
                {pokemons.map(({ image, name, type, id }) => (
                  <S.PokemonItem>
                    <S.ImageWrapper
                      color={findColorAndIconByPokemonType(type).color}
                    >
                      <img src={image} alt={name} />
                    </S.ImageWrapper>

                    <S.PokemonInfo>
                      <h5>#{id.toString().padStart(3, "0")}</h5>
                      <span>
                        <h3>{capitalizeFirstLetter(name)}</h3>
                        <img
                          src={findColorAndIconByPokemonType(type).icon}
                          alt=""
                        />
                      </span>
                    </S.PokemonInfo>
                  </S.PokemonItem>
                ))}
              </S.PokemonsList>
            </>
          )}
        </S.MainContent>
      </S.Wrapper>
    </S.Container>
  );
}
