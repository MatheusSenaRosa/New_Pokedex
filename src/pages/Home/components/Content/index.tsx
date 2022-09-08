import { Pokeball } from "@assets";
import { usePokemon } from "@context";
import { capitalizeFirstLetter } from "@utils";

import * as S from "./styles";

export function Content() {
  const { isLoading, pokemonTypes, count, pokemons, loadMorePokemons } =
    usePokemon();

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
                {pokemons.map(({ image, name, type, id, typeIcon, color }) => (
                  <S.PokemonItem>
                    <S.ImageWrapper color={color}>
                      <img src={image} alt={name} />
                    </S.ImageWrapper>

                    <S.PokemonInfo>
                      <h5>#{id.toString().padStart(3, "0")}</h5>
                      <span>
                        <h3>{capitalizeFirstLetter(name)}</h3>
                        <img src={typeIcon} alt={type} />
                      </span>
                    </S.PokemonInfo>
                  </S.PokemonItem>
                ))}
              </S.PokemonsList>
              <S.LoadMoreButton onClick={loadMorePokemons}>
                Load more Pokémons
              </S.LoadMoreButton>
            </>
          )}
        </S.MainContent>
      </S.Wrapper>
    </S.Container>
  );
}
