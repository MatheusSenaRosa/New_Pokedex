import api from "../config";
import { IUsePokeapi } from "./interfaces";

export const usePokeapi = (): IUsePokeapi => {
  const getTypes = async () => {
    const { data } = await api.get(`/type`);

    return data;
  };

  const getPokemonsByType = async (id: number) => {
    const { data } = await api.get(`/type/${id}`);

    return data;
  };

  const getPokemonByNameOrId = async (value: number | string) => {
    const { data } = await api.get(`/pokemon/${value}`);
    return data;
  };

  const getPokemons = async (offset?: number, limit = 9) => {
    const { data } = await api.get("/pokemon", {
      params: {
        limit,
        offset,
      },
    });

    return data;
  };

  return {
    getTypes,
    getPokemons,
    getPokemonByNameOrId,
    getPokemonsByType,
  };
};
