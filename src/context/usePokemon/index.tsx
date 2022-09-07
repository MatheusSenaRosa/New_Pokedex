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
    const regex = /[a-z\-]{1,}\.svg/g;
    const pokemonTypesWithIcons = data.reduce((acc: IPokemonType[], cur) => {
      if (cur.type === "unknown" || cur.type === "shadow") return acc;
      console.log("data:", data);

      const icon = iconTypes.find((iconItem) => {
        const iconName = iconItem.icon.match(regex)![0].split(".")[0];
        return iconName === cur.type;
      })!;

      console.log("icon:", icon);

      return [
        ...acc,
        {
          type: cur.type,
          ...icon,
        },
      ];
    }, []);

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
