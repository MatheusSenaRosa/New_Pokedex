import { Pokeball } from "@assets";
import { Loader, Select } from "@components";
import { usePokemon } from "@context";
import { capitalizeFirstLetter } from "@utils";

import * as S from "./styles";

export function Content() {
  const {
    isLoading,
    types,
    count,
    pokemons,
    typeFilter,
    isLoadingMore,
    loadMorePokemons,
    onClickPokemonTypeHandler,
  } = usePokemon();

  return (
    <S.Container>
      <S.Wrapper id="content">
        <S.Aside>
          {types.length ? (
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
          ) : null}
        </S.Aside>

        <S.MainContent>
          <S.Counter>
            <S.Icon src={Pokeball} alt="pokeball" size={20} />
            <h4>
              {count} Pokémon{count > 1 && "s"}
            </h4>
          </S.Counter>

          {types.length ? (
            <S.SelectContainer>
              <Select
                data={types.map((item) => ({
                  name: item.name,
                  color: item.color,
                  icon: item.icon,
                  id: item.id,
                }))}
                value={typeFilter}
                onSelect={onClickPokemonTypeHandler}
                isLoading={isLoading}
              />
            </S.SelectContainer>
          ) : null}

          {isLoading && (
            <S.LoadingWrapper>
              <Loader />
            </S.LoadingWrapper>
          )}

          {!isLoading && (
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
                <S.LoadMoreButton
                  onClick={loadMorePokemons}
                  disabled={isLoadingMore}
                >
                  {isLoadingMore ? (
                    <Loader size={20} color={"#3f5db3"} />
                  ) : (
                    "Load more Pokémons"
                  )}
                </S.LoadMoreButton>
              ) : null}
            </>
          )}
        </S.MainContent>
      </S.Wrapper>
    </S.Container>
  );
}
