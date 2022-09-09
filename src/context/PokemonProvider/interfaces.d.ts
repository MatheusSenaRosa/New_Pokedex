import { IPokemon, IType } from "@interfaces";

export interface IPokemonContextType {
  types: IType[];
  isLoadingPokemons: boolean;
  count: number;
  pokemons: IPokemon[];
  typeFilter: number;
  isLoadingTypes: boolean;
  loadMorePokemons: () => Promise<void>;
  onClickPokemonType: (id: number) => void;
}

export type Props = {
  children: ReactNode;
};
