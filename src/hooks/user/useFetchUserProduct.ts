import {
  getInitialPagination,
  PaginationProps,
} from "@/app/_components/data-table";
import { useQuery } from "@tanstack/react-query";
import { PaginationState } from "@tanstack/react-table";
import axios from "axios";
import { useCallback } from "react";
import {
  fetchUsers,
  userProduct,
} from "../../../api/index";
import {
  PaginatedList,
  PaginatedParams,
  Pagination,
  User,
  UserProduct,
} from "../../../types";

export const useFetchUserProducts = (
  params?: PaginatedParams
) => {
  // this return pagination object not user
  const initialPagination = getInitialPagination();
  return useQuery({
    queryKey: ["user.product", params],
    queryFn: async () => {
      return await axios
        .get(`${userProduct}`, {
          params: params,
        })
        .then((res) => res.data);
    },
    initialData: {
      items: [],
      meta: {
        currentPage: initialPagination.page,
        itemsPerPage: initialPagination.limit,
        itemCount: 0,
        totalItems: 0,
        totalPages: 0,
      },
    },
  });
};
