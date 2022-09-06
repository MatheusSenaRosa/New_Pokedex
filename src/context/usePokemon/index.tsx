import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { IconAll, iconTypes } from "@assets";
import { IType, PokemonType } from "@interfaces";
import { usePokeapi } from "@services";
import { capitalizeFirstLetter } from "@utils";
import { IPokemonContextType, Props } from "./interfaces";

const PokemonContext = createContext<IPokemonContextType>({
  pokemonTypes: [],
  isLoading: true,
});

export function PokemonContextProvider({ children }: Props) {
  const { getTypes, getPokemons } = usePokeapi();
  const [pokemonTypes, setPokemonTypes] = useState<PokemonType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const matchIconsWithPokemonTypes = (data: IType[]) => {
    const regex = /[a-z\-]{1,}\.svg/g;

    const pokemonTypesWithIcons = data.reduce((acc: PokemonType[], cur) => {
      if (cur.type === "unknown" || cur.type === "shadow") return acc;

      const icon = iconTypes.find((iconItem) => {
        const iconName = iconItem.icon.match(regex)![0].split(".")[0];
        return iconName === cur.type;
      })!;

      return [
        ...acc,
        {
          type: capitalizeFirstLetter(cur.type),
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
      const { data } = await getTypes();
      await getPokemons({ limit: 9 });
      const types = matchIconsWithPokemonTypes(data);
      setPokemonTypes(types);
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
