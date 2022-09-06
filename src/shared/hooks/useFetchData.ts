import { useState, useEffect, useCallback } from "react";

export const useFetch = async <T>(request: () => Promise<T>) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState<T>();

  const fetchData = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await request();
      setData(response);
    } catch (e) {
      setError("Ocorreu um erro ao recuperar os dados.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    isLoading,
    error,
    data: data,
  };
};
