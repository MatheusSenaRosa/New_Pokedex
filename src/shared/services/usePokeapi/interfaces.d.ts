import { IPokemon, IType } from "@interfaces";

export type Result = { name: string; url: string };

export type GetTypes = () => Promise<IType[]>;

export type GetPokemonsBody = { limit: number; offset?: number };

export type GetPokemonsReturn = { count: number; pokemons: IPokemon[] };

export type GetPokemons = ({
  limit,
  offset,
}: GetPokemonsBody) => Promise<GetPokemonsReturn>;

export interface IUsePokeapi {
  getTypes: GetTypes;
  getPokemons: GetPokemons;
}
