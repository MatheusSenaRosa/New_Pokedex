import api from "../config";
import { GetTypes, IUsePokeapi } from "./interfaces";

export const usePokeapi = (): IUsePokeapi => {
  const getTypes: GetTypes = async () => {
    const response = await api.get("/type");

    const data = response.data.results.map((item: { name: string }) => ({
      type: item.name,
    }));

    return { data };
  };

  return {
    getTypes,
  };
};
