import { Pokeball } from "@assets";
import { usePokemon } from "@context";
import { capitalizeFirstLetter } from "@utils";

import * as S from "./styles";

export function Content() {
  const {
    isLoadingPokemons,
    types,
    count,
    pokemons,
    typeFilter,
    isLoadingTypes,
    loadMorePokemons,
    onClickPokemonTypeHandler,
  } = usePokemon();

  return (
    <S.Container>
      <S.Wrapper>
        <S.Aside>
          {!isLoadingTypes && (
            <ul>
              {types.map(({ color, icon, name, id }) => (
                <S.TypeItem
                  key={id}
                  color={color}
                  active={typeFilter === id}
                  disabled={typeFilter === id}
                  onClick={() => onClickPokemonTypeHandler(id)}
                >
                  <S.Icon src={icon} alt={name} />
                  {capitalizeFirstLetter(name)}
                </S.TypeItem>
              ))}
            </ul>
          )}
        </S.Aside>

        <S.MainContent>
          <S.Counter>
            <S.Icon src={Pokeball} alt="pokeball" size={20} />
            <h4>{count} Pokémons</h4>
          </S.Counter>

          {isLoadingPokemons && (
            <S.LoadingWrapper>
              <div />
            </S.LoadingWrapper>
          )}

          {!isLoadingPokemons && (
            <>
              <S.PokemonsList>
                {pokemons.map(({ image, name, type, id, typeIcon, color }) => (
                  <S.PokemonItem key={id}>
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
              {!typeFilter && pokemons.length && pokemons.length < count ? (
                <S.LoadMoreButton onClick={loadMorePokemons}>
                  Load more Pokémons
                </S.LoadMoreButton>
              ) : null}
            </>
          )}
        </S.MainContent>
      </S.Wrapper>
    </S.Container>
  );
}
