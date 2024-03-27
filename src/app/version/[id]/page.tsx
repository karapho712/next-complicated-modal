"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useFetchUserProducts } from "@/hooks/user/useFetchUserProduct";
import { useFetchUserProductType } from "@/hooks/user/useFetchUserProductType";
import { DataTable } from "../../_components/data-table";
import { SkinRoutineForm } from "./skin-routine-form";
import { VersionList } from "./version-list";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowLeft, PlusCircle } from "lucide-react";
import { UserProduct } from "../../../../types";

export enum ComponentType {
  FORMSKINROUTINE = "FORMSKINROUTINE",
  TABLEGROUP = "TABLEGROUP",
  TABLEVERSIONLIST = "TABLEVERSIONLIST",
}

const Page = ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const [showTable, setShowTable] = useState<{
    component: ComponentType;
    prevComponent: ComponentType | undefined;
  }>({
    component: ComponentType.TABLEGROUP,
    prevComponent: undefined,
  });

  const [selectedGroup, setSelectedGroup] = useState<any>();

  useEffect(() => {
    console.log(showTable);
  }, [showTable]);

  const columns: ColumnDef<UserProduct>[] = [
    {
      accessorKey: "id",
      cell: (info) => info.getValue(),
    },
    {
      header: "Group",
      accessorKey: "group",
      cell: (info) => info.getValue(),
    },
    {
      header: "Start at",
      accessorKey: "startAt",
      cell: (info) => info.getValue(),
    },
    {
      id: "actiongroup",
      header: "Action",
      accessorKey: "group",
      cell: (info) => (
        <Button
          onClick={() => {
            setShowTable({
              component: ComponentType.TABLEVERSIONLIST,
              prevComponent: ComponentType.TABLEGROUP,
            });
            setSelectedGroup(info.getValue());
          }}
        >
          Show Item
        </Button>
      ),
    },
  ];

  const paramsx = {
    page: 1,
    limit: 999,
    userId: id,
  };

  const { data, isFetching } =
    useFetchUserProductType(paramsx);

  if (isFetching) {
    return <p>Loading</p>;
  }

  return (
    <div className="p-2">
      <div className="flex justify-center">
        <Button
          onClick={() => {
            setShowTable((prev) => {
              if (
                prev.component ===
                ComponentType.FORMSKINROUTINE
              ) {
                return {
                  component:
                    prev.prevComponent ===
                    ComponentType.TABLEGROUP
                      ? ComponentType.TABLEGROUP
                      : ComponentType.TABLEVERSIONLIST,
                  prevComponent: undefined,
                };
              } else {
                return {
                  component: ComponentType.FORMSKINROUTINE,
                  prevComponent:
                    prev.component ===
                    ComponentType.TABLEVERSIONLIST
                      ? ComponentType.TABLEVERSIONLIST
                      : ComponentType.TABLEGROUP,
                };
              }
            });
          }}
          className="bg-slate-900"
        >
          {showTable.component ===
          ComponentType.FORMSKINROUTINE ? (
            <ArrowLeft className="mr-1" />
          ) : (
            <PlusCircle className="mr-1" />
          )}
          {showTable.component ===
          ComponentType.FORMSKINROUTINE
            ? "Back"
            : "New Routine"}
        </Button>
      </div>
      {showTable.component === ComponentType.TABLEGROUP && (
        <DataTable data={data} columns={columns} />
      )}
      {showTable.component !== ComponentType.TABLEGROUP && (
        <Button
          onClick={() => {
            setShowTable({
              component:
                showTable.component ===
                ComponentType.TABLEVERSIONLIST
                  ? ComponentType.TABLEGROUP
                  : ComponentType.TABLEVERSIONLIST,
              prevComponent: ComponentType.TABLEGROUP,
            });
          }}
        >
          Back
        </Button>
      )}
      {showTable.component ===
        ComponentType.TABLEVERSIONLIST && (
        <div>
          <p>Item Detail:</p>
          <VersionList
            groups={selectedGroup}
            setShowTable={setShowTable}
          />
        </div>
      )}
      {showTable.component ===
        ComponentType.FORMSKINROUTINE && (
        <SkinRoutineForm />
      )}
    </div>
  );
};

export default Page;
