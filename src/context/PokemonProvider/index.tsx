import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { IconAll, iconTypes } from "@assets";
import { IPokemon, IType, IResult } from "@interfaces";
import { GetPokemonByNameOrIdReturn, usePokeapi } from "@services";
import { IPokemonContextType, Props } from "./interfaces";

const PokemonContext = createContext({});

export function PokemonContextProvider({ children }: Props) {
  const [count, setCount] = useState(0);
  const [isLoadingPokemons, setIsLoadingPokemons] = useState(true);
  const [isLoadingTypes, setIsLoadingTypes] = useState(true);
  const [typeFilter, setTypeFilter] = useState(0);
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);
  const [types, setTypes] = useState<IType[]>([]);

  const { getTypes, getPokemons, getPokemonByNameOrId, getPokemonsByType } =
    usePokeapi();

  const matchIconsWithTypes = (data: IResult[]) => {
    const pokemonTypesWithIcons = data.reduce((acc: IType[], cur, index) => {
      if (cur.name === "unknown" || cur.name === "shadow") return acc;
      const newItem = iconTypes.find((iconType) => iconType.name === cur.name)!;
      return [...acc, { ...newItem, id: index + 1 }];
    }, []);

    return [
      { icon: IconAll, name: "All", color: "#4074c4", id: 0 },
      ...pokemonTypesWithIcons,
    ];
  };

  const loadMorePokemons = async () => {
    // const pokemonsResponse = await getPokemons({
    //   limit: pokemons.length + 9,
    //   offset: pokemons.length + 1,
    // });
    // setPokemons((prev) => [...prev, ...pokemonsResponse.pokemons]);
  };

  const formatPokemon = (pokemon: GetPokemonByNameOrIdReturn) => {
    const { icon, color } = iconTypes.find(
      (type) => type.name === pokemon.types[0].type.name
    )!;

    const formattedPokemon = {
      name: pokemon.name,
      image: pokemon.sprites.other.dream_world.front_default,
      type: pokemon.types[0].type.name,
      id: pokemon.id,
      typeIcon: icon,
      color,
    };

    return formattedPokemon;
  };

  const getPokemonsLoop = async () => {
    const pokemonsResponse = await getPokemons();
    const formattedPokemons: IPokemon[] = [];

    for (let id = 1; id <= pokemonsResponse.results.length; id++) {
      const pokemon = await getPokemonByNameOrId(id);

      formattedPokemons.push(formatPokemon(pokemon));
    }

    return {
      pokemons: formattedPokemons,
      count: pokemonsResponse.count,
    };
  };

  const onClickPokemonType = async (id: number) => {
    setTypeFilter(id);

    setIsLoadingPokemons(true);
    const pokemonsOfCurrentType = await getPokemonsByType(id);

    const pokemonsId = pokemonsOfCurrentType.pokemon.map(
      (item) => item.pokemon.url.split("/")[6]
    );

    const formattedPokemons: IPokemon[] = [];

    for (let id in pokemonsId) {
      const pokemon = await getPokemonByNameOrId(pokemonsId[+id]);
      const formatted = formatPokemon(pokemon);
      if (formatted.image) {
        formattedPokemons.push(formatted);
      }
    }

    setCount(formattedPokemons.length);
    setPokemons(formattedPokemons);
    setIsLoadingPokemons(false);
  };

  const fetchData = useCallback(async () => {
    try {
      const typesResponse = await getTypes();
      const pokemonsResponse = await getPokemonsLoop();

      const formattedTypes = matchIconsWithTypes(typesResponse.results);
      setTypes(formattedTypes);
      setCount(pokemonsResponse.count);
      setPokemons(pokemonsResponse.pokemons);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoadingTypes(false);
      setIsLoadingPokemons(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <PokemonContext.Provider
      value={{
        types,
        isLoadingPokemons,
        isLoadingTypes,
        count,
        pokemons,
        typeFilter,
        loadMorePokemons,
        onClickPokemonType,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
}

export const usePokemon = () => {
  const context = useContext(PokemonContext);

  if (!context) {
    throw new Error("usePokemon must be used within a PokemonProvider");
  }

  return context as IPokemonContextType;
};
