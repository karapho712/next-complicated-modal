"use client";
import { DataTable } from "@/app/_components/data-table";
import { useFetchUserProducts } from "@/hooks/user/useFetchUserProduct";
import {
  useParams,
  usePathname,
  useRouter,
} from "next/navigation";
import router from "next/router";
import React from "react";
import { SkinRoutineForm } from "./skin-routine-form";

export const VersionList = ({
  groups,
}: {
  groups: any;
}) => {
  const router = useParams<{ id: string }>();

  const userId = router.id || "";
  const params = {
    page: 1,
    limit: 999, // TODO: no limit
    userId,
    group: groups.group,
  };

  const { data, isFetching } = useFetchUserProducts(params);

  return (
    <div>
      <DataTable
        data={data}
        columns={[
          {
            header: "ID",
            accessorKey: "id",
            cell: (info) => info.getValue(),
          },
          {
            header: "Start At",
            accessorKey: "startAt",
            cell: (info) => info.getValue(),
          },
          {
            header: "Published",
            accessorKey: "isPublished",
            cell: (info) =>
              info.getValue() ? <p>Benar</p> : <p>Salah</p>,
          },
          // Add more columns as needed
        ]}
      />
    </div>
  );
};
