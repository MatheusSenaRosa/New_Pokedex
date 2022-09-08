import { iconTypes } from "@assets";
import { IPokemon } from "@interfaces";
import api from "../config";
import { GetTypes, Result, IUsePokeapi, GetPokemons } from "./interfaces";

export const usePokeapi = (): IUsePokeapi => {
  const getTypes: GetTypes = async () => {
    const response = await api.get("/type");

    const data = response.data.results.map((item: Result) => ({
      type: item.name,
    }));

    return data;
  };

  const getPokemonById = async (id: number) => {
    const { data } = await api.get(`/pokemon/${id}`);
    return data;
  };

  const getPokemons: GetPokemons = async (params) => {
    const {
      data: { count, results },
    } = await api.get("/pokemon", {
      params,
    });

    const pokemons: IPokemon[] = [];

    for (let id = params.offset || 1; id <= results.length; id++) {
      const pokemon = await getPokemonById(id);

      const { icon, color } = iconTypes.find(
        (type) => type.type === pokemon.types[0].type.name
      )!;

      pokemons.push({
        name: pokemon.name,
        image: pokemon.sprites.other.dream_world.front_default,
        type: pokemon.types[0].type.name,
        id: pokemon.id,
        typeIcon: icon,
        color,
      });
    }

    return {
      count,
      pokemons,
    };
  };

  return {
    getTypes,
    getPokemons,
  };
};
