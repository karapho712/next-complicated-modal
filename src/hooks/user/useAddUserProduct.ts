import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { userProduct } from "../../../api/index";

export const useAddUserProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      return await axios
        .post(userProduct, data)
        .then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user.product"],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: ["user.product.type"],
        exact: false,
      });
    },
  });
};
