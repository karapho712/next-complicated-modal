import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { userProduct } from "../../../api/index";

export const useDeleteUserProduct = (
  id: string,
  userId: string
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      return await axios
        .delete(`${userProduct}/${id}`)
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
