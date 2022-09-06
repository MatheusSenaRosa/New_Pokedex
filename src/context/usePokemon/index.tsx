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
import { IPokemonContextType, Props } from "./interfaces";

const PokemonContext = createContext<IPokemonContextType>({
  pokemonTypes: [],
});

export function PokemonContextProvider({ children }: Props) {
  const [pokemonTypes, setPokemonTypes] = useState<PokemonType[]>([]);
  const { getTypes } = usePokeapi();

  const capitalizeFirstLetter = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const matchIconsWithPokemonTypes = (types: IType[]) => {
    const regex = /[a-z\-]{1,}\.svg/g;

    const pokemonTypesWithIcons = types.reduce((acc: PokemonType[], cur) => {
      if (cur.type === "unknown" || cur.type === "shadow") return acc;

      const icon = iconTypes.find((iconItem) => {
        const iconName = iconItem.icon.match(regex)![0].split(".")[0];
        return iconName === cur.type;
      })!;

      return [
        ...acc,
        {
          type: capitalizeFirstLetter(cur.type),
          color: icon.color,
          icon: icon.icon,
        },
      ];
    }, []);

    return [
      { icon: IconAll, type: "All", color: "#4074c4" },
      ...pokemonTypesWithIcons,
    ];
  };

  const fetchData = useCallback(async () => {
    const { data } = await getTypes();
    const pokemonTypesWithIcons = matchIconsWithPokemonTypes(data);

    setPokemonTypes(pokemonTypesWithIcons);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <PokemonContext.Provider
      value={{
        pokemonTypes,
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
