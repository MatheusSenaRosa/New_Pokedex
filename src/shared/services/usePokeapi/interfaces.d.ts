import { IType } from "@interfaces";

export type Result = { name: string; url: string };

export type GetTypesReturn = { data: IType[] };

export type GetTypes = () => Promise<GetTypesReturn>;

export type GetPokemonsBody = { limit: number; offset?: number };

export type GetPokemonsReturn = { data: { count: number; pokemons: {}[] } };

export type GetPokemons = ({
  limit,
  offset,
}: GetPokemonsBody) => Promise<GetPokemonsReturn>;

export interface IUsePokeapi {
  getTypes: GetTypes;
  getPokemons: GetPokemons;
}
