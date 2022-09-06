import { PokemonType } from "@interfaces";

export interface IPokemonContextType {
  pokemonTypes: PokemonType[];
  isLoading: boolean;
}

export type Props = {
  children: ReactNode;
};
