import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { IconAll, iconTypes } from "@assets";
import { IPokemon, IType, IResult } from "@interfaces";
import { usePokeapi } from "@services";
import { IPokemonContextType, Props } from "./interfaces";

const PokemonContext = createContext({});

export function PokemonContextProvider({ children }: Props) {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
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

  const getPokemonsLoop = async () => {
    const pokemonsResponse = await getPokemons();
    const formattedPokemons: IPokemon[] = [];

    for (let id = 1; id <= pokemonsResponse.results.length; id++) {
      const pokemon = await getPokemonByNameOrId(id);

      const { icon, color } = iconTypes.find(
        (type) => type.name === pokemon.types[0].type.name
      )!;

      formattedPokemons.push({
        name: pokemon.name,
        image: pokemon.sprites.other.dream_world.front_default,
        type: pokemon.types[0].type.name,
        id: pokemon.id,
        typeIcon: icon,
        color,
      });
    }

    return {
      pokemons: formattedPokemons,
      count: pokemonsResponse.count,
    };
  };

  const onClickPokemonType = async (id: number) => {
    setTypeFilter(id);

    const a = await getPokemonsByType(id);

    const b = a.pokemon.map((item) => item.pokemon.url.split("/")[6]);

    for (let pokemonId in b) {
      const c = await getPokemonByNameOrId(b[+pokemonId]);
      console.log(c);
    }
    // console.log(d);
  };

  const fetchData = useCallback(async () => {
    setIsLoading(true);
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
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <PokemonContext.Provider
      value={{
        types,
        isLoading,
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
