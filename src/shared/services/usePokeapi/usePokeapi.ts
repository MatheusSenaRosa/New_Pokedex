import api from "../config";
import { GetTypes, Result, IUsePokeapi, GetPokemons } from "./interfaces";

export const usePokeapi = (): IUsePokeapi => {
  const getTypes: GetTypes = async () => {
    const response = await api.get("/type");

    const data = response.data.results.map((item: Result) => ({
      type: item.name,
    }));

    return { data };
  };

  const getPokemons: GetPokemons = async ({ limit, offset = 0 }) => {
    const response = await api.get("/pokemon", {
      params: {
        limit,
        offset,
      },
    });
    const { count } = response.data;

    const pokemons = [];

    for (let id = 1; id <= limit; id++) {
      const { data } = await api.get(`/pokemon/${id}`);
      pokemons.push(data);
    }

    return {
      data: {
        count,
        pokemons,
      },
    };
  };

  return {
    getTypes,
    getPokemons,
  };
};
