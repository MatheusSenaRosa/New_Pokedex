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
import { IPokemon, IType, IResult, IError } from "@interfaces";
import { GetPokemonByNameOrIdReturn, usePokeapi } from "@services";

import { IPokemonContextType, Props } from "./typings";

const PokemonContext = createContext<IPokemonContextType | null>(null);

export function PokemonContextProvider({ children }: Props) {
  const [typeFilter, setTypeFilter] = useState<number | null>(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [types, setTypes] = useState<IType[]>([]);
  const [search, setSearch] = useState("");
  const [count, setCount] = useState(0);

  const { getTypes, getPokemons, getPokemonByNameOrId, getPokemonsByType } =
    usePokeapi();

  const matchIconsWithTypes = (data: IResult[]) => {
    const pokemonTypesWithIcons = data.reduce((acc: IType[], cur, index) => {
      if (cur.name === "unknown" || cur.name === "shadow") return acc;
      const newItem = iconTypes.find((iconType) => iconType.name === cur.name)!;
      return [...acc, { ...newItem, id: index + 1 }];
    }, []);

    return [
      { icon: IconAll, name: "all", color: "#4074c4", id: 0 },
      ...pokemonTypesWithIcons,
    ];
  };

  const getPokemonsLoop = async (offset?: number) => {
    const pokemonsResponse = await getPokemons(offset);

    const pokemonsList: IPokemon[] = await Promise.all(
      pokemonsResponse.results.map(async (item) => {
        const id = item.url.split("/")[6];
        const pokemon = await getPokemonByNameOrId(id);
        const formattedPokemon = formatPokemon(pokemon);

        return formattedPokemon;
      })
    );

    return {
      pokemons: pokemonsList,
      count: pokemonsResponse.count,
    };
  };

  const loadMorePokemons = async () => {
    try {
      setIsLoadingMore(true);
      const pokemonsResponse = await getPokemonsLoop(pokemons.length);

      setPokemons((prev) => [...prev, ...pokemonsResponse.pokemons]);
    } catch {
      toast.error("Sorry, some error has occurred.");
    } finally {
      setIsLoadingMore(false);
    }
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
      const [typesResponse, pokemonsResponse] = await Promise.all([
        getTypes(),
        getPokemonsLoop(),
      ]);

      const formattedTypes = matchIconsWithTypes(typesResponse.results);

      setTypes(formattedTypes);
      setCount(pokemonsResponse.count);
      setPokemons(pokemonsResponse.pokemons);
    } catch {
      toast.error("Sorry, some error has occurred.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const onClickPokemonTypeHandler = async (id: number) => {
    setTypeFilter(id);
    setIsLoading(true);
    setSearch("");

    document.getElementById("content")?.scrollIntoView();

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

      for (const id in pokemonsId) {
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
      setIsLoading(false);
    }
  };

  const onSubmitSearchHandler = async (e: FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const pokemon = await getPokemonByNameOrId(search.toLowerCase());
      const formattedPokemon = formatPokemon(pokemon);
      setPokemons([formattedPokemon]);
      setCount(1);
      setTypeFilter(null);
    } catch (e) {
      const error = e as IError;
      if (error.response.status === 404) {
        toast.warn("There is no Pokémon with this name or code.");
        return;
      }
      toast.error("Sorry, some error has occurred.");
    } finally {
      setIsLoading(false);
    }
  };

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
        search,
        typeFilter,
        isLoadingMore,
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

export const usePokemon = () => useContext(PokemonContext);
