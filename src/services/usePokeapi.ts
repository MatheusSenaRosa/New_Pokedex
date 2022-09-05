import api from "./config";

export const usePokeapi = () => {
  const getTypes = () => api.get("/type");

  return {
    getTypes,
  };
};
