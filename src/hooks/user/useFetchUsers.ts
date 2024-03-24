import { PaginationProps } from "@/app/_components/data-table";
import { useQuery } from "@tanstack/react-query";
import { PaginationState } from "@tanstack/react-table";
import axios from "axios";
import { useCallback } from "react";
import { fetchUsers } from "../../../api/index";
import {
  PaginatedList,
  PaginatedParams,
  Pagination,
  User,
} from "../../../types";

export const getInitialPagination = (
  override: Partial<Pagination> = {}
): Pagination => ({
  page: override.page || 1,
  limit: override.limit || 10,
});

export const useFetchUsers = (params?: PaginatedParams) => {
  // this return pagination object not user
  const initialPagination = getInitialPagination();
  return useQuery<PaginatedList<User>>({
    queryKey: ["users", params],
    queryFn: async () => {
      return await axios
        .get(`${fetchUsers}`, {
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

export const usePaginationProps = (
  params: PaginatedParams,
  onChange: (newState: PaginationState) => void
) =>
  useCallback(
    (pageCount: number): PaginationProps => {
      const paginationState: PaginationState = {
        pageIndex: params.page - 1,
        pageSize: params.limit,
      };

      return {
        pageCount,
        pagination: paginationState,
        setPagination: (updaterOrValue) => {
          onChange(
            typeof updaterOrValue === "function"
              ? updaterOrValue(paginationState)
              : updaterOrValue
          );
        },
      };
    },
    [params.limit, params.page, onChange]
  );
