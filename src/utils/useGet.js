import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGet = (url, key) => {
  return useQuery({
    queryKey: [key],
    queryFn: async () => {
      const { data } = await axios.get(url);
      return data;
    },
  });
};
