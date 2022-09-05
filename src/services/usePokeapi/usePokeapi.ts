import api from "../config";
import { GetTypes, IUsePokeapi } from "./interfaces";

export const usePokeapi = (): IUsePokeapi => {
  const getTypes: GetTypes = async () => {
    const { data } = await api.get("/type");
    return data;
  };

  return {
    getTypes,
  };
};
