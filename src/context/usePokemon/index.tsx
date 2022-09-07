import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { IconAll, iconTypes } from "@assets";
import { IPokemon, IType, IPokemonType } from "@interfaces";
import { usePokeapi } from "@services";
import { IPokemonContextType, Props } from "./interfaces";

const PokemonContext = createContext<IPokemonContextType>({
  pokemonTypes: [],
  isLoading: true,
  count: 0,
  pokemons: [],
});

export function PokemonContextProvider({ children }: Props) {
  const { getTypes, getPokemons } = usePokeapi();
  const [pokemonTypes, setPokemonTypes] = useState<IPokemonType[]>([]);
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const matchIconsWithPokemonTypes = (data: IType[]) => {
    const pokemonTypesWithIcons = data.map((item) => {
      const { color, icon, type } = iconTypes.find(
        (iconType) => iconType.type === item.type
      )!;
      return {
        color,
        icon,
        type,
      };
    });

    return [
      { icon: IconAll, type: "All", color: "#4074c4" },
      ...pokemonTypesWithIcons,
    ];
  };

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const typesResponse = await getTypes();
      const pokemonsResponse = await getPokemons({ limit: 9 });

      const types = matchIconsWithPokemonTypes(typesResponse);

      setPokemonTypes(types);
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
        pokemonTypes,
        isLoading,
        count,
        pokemons,
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

  return context;
};
