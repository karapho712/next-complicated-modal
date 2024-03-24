import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { fetchProduct } from "../../../api/index";

export const useFetchProducts = () => {
  const query = useQuery({
    queryKey: ["product.list"],
    queryFn: async () => {
      return await axios
        .get(`${fetchProduct}`)
        .then((res) => res.data);
    },
  });

  return query;
};
