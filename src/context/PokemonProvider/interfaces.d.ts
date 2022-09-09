import { IPokemon, IType } from "@interfaces";

export interface IPokemonContextType {
  types: IType[];
  isLoadingPokemons: boolean;
  count: number;
  pokemons: IPokemon[];
  typeFilter: number;
  search: string;
  isLoadingTypes: boolean;
  setSearch: (value: string) => void;
  loadMorePokemons: () => Promise<void>;
  onClickPokemonTypeHandler: (id: number) => void;
  onSubmitSearchHandler: (e: FormEvent) => Promise<void>;
}

export type Props = {
  children: ReactNode;
};
