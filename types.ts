import { Table } from "@tanstack/react-table";

export type User = {
  id: string;
  name: string;
  email: string;
  //   password?: string;
};

export type UserProduct = {
  id: string;
  items: UserProductItem[];
  group: ProductGroup;
  startAt: Date;
  isPublished: boolean;
};

export type UserProductItem = {
  id: string;
  comment: string;
  product: Product;
  order: number;
};

export type Product = {
  id: string;
  name: string;
  type: string;
  description: string;
  imageUrl: string;
  comment: string;
};

export enum ProductGroup {
  NULL = "NULL",
  NIGHT = "NIGHT",
  DAY = "DAY",
}

export type PaginationInfo = {
  currentPage: number;
  itemsPerPage: number;
  itemCount: number;
  totalItems: number;
  totalPages: number;
};

export type PaginatedList<TData> = {
  items: TData[];
  meta: PaginationInfo;
};

export type PaginatedParams<
  TParams extends object = object
> = Partial<TParams> & Pagination;

export type Pagination = {
  page: number;
  limit: number;
};

export type DataTablePaginationProps<Data> = {
  table: Table<Data>;
};
