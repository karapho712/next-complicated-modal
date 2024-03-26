"use client";
import { DataTable } from "@/app/_components/data-table";
import { Button } from "@/components/ui/button";
import { useDeleteUserProduct } from "@/hooks/user/useDeleteUserProduct";
import { useFetchUserProducts } from "@/hooks/user/useFetchUserProduct";
import { CellContext } from "@tanstack/react-table";
import { isEmpty } from "lodash";
import { Pencil, Trash2 } from "lucide-react";
import {
  useParams,
  usePathname,
  useRouter,
} from "next/navigation";
import router from "next/router";
import React, { useState } from "react";
import { SkinRoutineForm } from "./skin-routine-form";

const ActionsColumn = ({
  info,
  setToUpdate,
}: {
  info: CellContext<any, any>;
  setToUpdate: any;
}) => {
  const router = useParams<{ id: string }>();
  const userProduct = info.row.original;
  const deleteUserProduct = useDeleteUserProduct(
    userProduct.id,
    router.id
  );
  return (
    <>
      <Button
        variant="default"
        size="icon"
        className="bg-blue-500 mr-1"
        onClick={() => setToUpdate(userProduct)}
      >
        <Pencil
          aria-label="delete"
          color="white"
          // eslint-disable-next-line no-restricted-globals, no-alert
        />
      </Button>

      <Button
        variant="destructive"
        size="icon"
        className="bg-red-500"
        onClick={() =>
          confirm(
            "Are you sure want to delete this version ?"
          ) && deleteUserProduct.mutateAsync()
        }
      >
        <Trash2
          aria-label="delete"
          // className="red-"
          color="white"
          // eslint-disable-next-line no-restricted-globals, no-alert
        />
      </Button>
    </>
  );
};

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
    group: groups,
  };

  const { data, isFetching } = useFetchUserProducts(params);

  const [showSkinRoutineForm, setShowSkinRoutineForm] =
    useState({});

  console.log(showSkinRoutineForm);

  return (
    <div>
      {isEmpty(showSkinRoutineForm) && (
        <DataTable
          data={data}
          columns={[
            {
              header: "Version",
              id: "index",
              // eslint-disable-next-line no-unsafe-optional-chaining
              cell: (p) =>
                p?.table?.getSortedRowModel()?.flatRows
                  ?.length - p.row.index,
            },
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
                info.getValue() ? (
                  <p>Benar</p>
                ) : (
                  <p>Salah</p>
                ),
            },
            // Add more columns as needed
            {
              id: "actions",
              header: "ACTIONS",
              accessorKey: "id",
              // eslint-disable-next-line react/no-unstable-nested-components
              cell: (info) => (
                <ActionsColumn
                  key={info.row.id}
                  info={info}
                  setToUpdate={setShowSkinRoutineForm}
                />
              ),
            },
          ]}
        />
      )}
      {/* {!isEmpty(showSkinRoutineForm) && <SkinRoutineForm />} */}
    </div>
  );
};
