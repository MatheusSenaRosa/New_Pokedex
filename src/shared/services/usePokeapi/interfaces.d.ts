import { IPokemon, IResult } from "@interfaces";

export type GetPokemonsParams = { limit?: number; offset?: number };

type GetTypesReturn = { results: IResult[] };

type GetPokemonsReturn = {
  count: number;
  results: IResult[];
};

type GetPokemonByNameOrIdReturn = {
  name: string;
  id: number;
  sprites: {
    other: {
      dream_world: {
        front_default: string;
      };
    };
  };
  types: {
    type: {
      name: string;
    };
  }[];
};

type getPokemonsByTypeReturn = {
  pokemon: {
    pokemon: IResult;
  }[];
};

export interface IUsePokeapi {
  getTypes: () => Promise<GetTypesReturn>;

  getPokemonsByType: (id: number) => Promise<getPokemonsByTypeReturn>;

  getPokemons: (limit?: number, offset?: number) => Promise<GetPokemonsReturn>;

  getPokemonByNameOrId: (
    value: string | number
  ) => Promise<GetPokemonByNameOrIdReturn>;
}
