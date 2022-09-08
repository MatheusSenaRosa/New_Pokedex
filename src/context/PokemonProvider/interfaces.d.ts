import { IPokemon, IPokemonType } from "@interfaces";

export interface IPokemonContextType {
  pokemonTypes: IPokemonType[];
  isLoading: boolean;
  count: number;
  pokemons: IPokemon[];
  loadMorePokemons?: () => Promise<void>;
}

export type Props = {
  children: ReactNode;
};
