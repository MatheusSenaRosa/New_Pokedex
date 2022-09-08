import { IPokemon, IType } from "@interfaces";

export interface IPokemonContextType {
  types: IType[];
  isLoading: boolean;
  count: number;
  pokemons: IPokemon[];
  typeFilter: number;
  loadMorePokemons: () => Promise<void>;
  onClickPokemonType: (id: number) => void;
}

export type Props = {
  children: ReactNode;
};
