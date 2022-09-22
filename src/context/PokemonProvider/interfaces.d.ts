import { IPokemon, IType } from "@interfaces";

export interface IPokemonContextType {
  types: IType[];
  count: number;
  pokemons: IPokemon[];
  typeFilter: number | null;
  search: string;
  isLoading: boolean;
  isLoadingMore: boolean;
  setSearch: (value: string) => void;
  loadMorePokemons: () => Promise<void>;
  onClickPokemonTypeHandler: (id: number) => void;
  onSubmitSearchHandler: (e: FormEvent) => Promise<void>;
}

export type Props = {
  children: ReactNode;
};
