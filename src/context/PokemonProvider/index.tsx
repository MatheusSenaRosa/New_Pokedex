import {
  createContext,
  FormEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";

import { IconAll, iconTypes } from "@assets";
import { IPokemon, IType, IResult } from "@interfaces";
import { GetPokemonByNameOrIdReturn, usePokeapi } from "@services";
import { IPokemonContextType, Props } from "./interfaces";

const PokemonContext = createContext({});

export function PokemonContextProvider({ children }: Props) {
  const [count, setCount] = useState(0);
  const [isLoadingPokemons, setIsLoadingPokemons] = useState(true);
  const [isLoadingTypes, setIsLoadingTypes] = useState(true);
  const [typeFilter, setTypeFilter] = useState<number | null>(0);
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);
  const [types, setTypes] = useState<IType[]>([]);
  const [search, setSearch] = useState("");

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

  const getPokemonsLoop = async (offset?: number) => {
    const pokemonsResponse = await getPokemons(offset);
    const formattedPokemons: IPokemon[] = [];

    for (let index in pokemonsResponse.results) {
      const id = pokemonsResponse.results[index].url.split("/")[6];
      const pokemon = await getPokemonByNameOrId(id);
      formattedPokemons.push(formatPokemon(pokemon));
    }

    return {
      pokemons: formattedPokemons,
      count: pokemonsResponse.count,
    };
  };

  const loadMorePokemons = async () => {
    const pokemonsResponse = await getPokemonsLoop(pokemons.length);

    setPokemons((prev) => [...prev, ...pokemonsResponse.pokemons]);
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

  const fetchData = useCallback(async () => {
    try {
      const typesResponse = await getTypes();
      const pokemonsResponse = await getPokemonsLoop();

      const formattedTypes = matchIconsWithTypes(typesResponse.results);

      setTypes(formattedTypes);
      setCount(pokemonsResponse.count);
      setPokemons(pokemonsResponse.pokemons);
    } catch {
      toast.error("Sorry, some error has occurred.");
    } finally {
      setIsLoadingTypes(false);
      setIsLoadingPokemons(false);
    }
  }, []);

  const onClickPokemonTypeHandler = async (id: number) => {
    setTypeFilter(id);
    setIsLoadingPokemons(true);
    setSearch("");

    try {
      if (!id) {
        const pokemonsResponse = await getPokemonsLoop();
        setPokemons(pokemonsResponse.pokemons);
        setCount(pokemonsResponse.count);
        return;
      }

      const pokemonsResponse = await getPokemonsByType(id);

      const pokemonsId = pokemonsResponse.pokemon.map(
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
    } catch {
      toast.error("Sorry, some error has occurred.");
    } finally {
      setIsLoadingPokemons(false);
    }
  };

  const onSubmitSearchHandler = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoadingPokemons(true);
    try {
      const pokemon = await getPokemonByNameOrId(search);
      const formattedPokemon = formatPokemon(pokemon);
      setPokemons([formattedPokemon]);
      setCount(1);
      setTypeFilter(null);
    } catch {
      toast.error("Sorry, some error has occurred.");
    } finally {
      setIsLoadingPokemons(false);
    }
  };

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
        search,
        typeFilter,
        setSearch,
        loadMorePokemons,
        onClickPokemonTypeHandler,
        onSubmitSearchHandler,
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
