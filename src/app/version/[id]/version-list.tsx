import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useDeleteUserProduct } from "@/hooks/user/useDeleteUserProduct";
import { useFetchUserProducts } from "@/hooks/user/useFetchUserProduct";
import { DataTable } from "@/app/_components/data-table";
import { Pencil, Trash2 } from "lucide-react";
import { useParams } from "next/navigation";
import { ComponentType } from "./page";
import router from "next/router";
import { isEmpty } from "lodash";

const ActionsColumn = ({
  info,
  setToUpdate,
  setShowTable,
}) => {
  const { id } = useParams<{ id: string }>();
  const userProduct = info.row.original;
  const deleteUserProduct = useDeleteUserProduct(
    userProduct.id,
    id
  );

  return (
    <>
      <Button
        variant="default"
        size="icon"
        className="bg-blue-500 mr-1"
        onClick={() => {
          setToUpdate(userProduct);
          setShowTable({
            component: ComponentType.FORMSKINROUTINE,
            prevComponent: ComponentType.TABLEVERSIONLIST,
          });
        }}
      >
        <Pencil aria-label="edit" color="white" />
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
        <Trash2 aria-label="delete" color="white" />
      </Button>
    </>
  );
};

export const VersionList = ({ groups, setShowTable }) => {
  const { id } = useParams<{ id: string }>();

  const params = {
    page: 1,
    limit: 999,
    userId: id || "",
    group: groups,
  };

  const { data, isFetching } = useFetchUserProducts(params);
  const [showSkinRoutineForm, setShowSkinRoutineForm] =
    useState({});
  console.log(!isEmpty(showSkinRoutineForm));

  return (
    <div>
      {isEmpty(showSkinRoutineForm) && !isFetching && (
        <DataTable
          data={data}
          columns={[
            {
              header: "Version",
              id: "index",
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
              cell: (info) => (
                <p>{info.getValue() ? "Benar" : "Salah"}</p>
              ),
            },
            {
              id: "actions",
              header: "ACTIONS",
              accessorKey: "id",
              cell: (info) => (
                <ActionsColumn
                  info={info}
                  setToUpdate={setShowSkinRoutineForm}
                  setShowTable={setShowTable}
                />
              ),
            },
          ]}
        />
      )}
    </div>
  );
};
