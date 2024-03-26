"use client";
import { Button } from "@/components/ui/button";
import { useFetchUserProducts } from "@/hooks/user/useFetchUserProduct";
import { useFetchUserProductType } from "@/hooks/user/useFetchUserProductType";
import { useFetchUsers } from "@/hooks/user/useFetchUsers";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowLeft, Plus, PlusCircle } from "lucide-react";
import React, { useMemo, useState } from "react";
import {
  User,
  UserProduct,
  UserProductItem,
} from "../../../../types";
import { DataTable } from "../../_components/data-table";
import { SkinRoutineForm } from "./skin-routine-form";
import { VersionList } from "./version-list";

export const Page = ({
  params,
}: {
  params: { id: string };
}) => {
  const [showTableGroup, setShowTableGroup] =
    useState(true);
  const [showTableVersionList, setShowTableVersionList] =
    useState(false);
  const [showSkinFormRoutine, setShowSkinFormRoutine] =
    useState(false);

  const [selectedGroup, setSelectedGroup] = useState<any>();
  console.log(selectedGroup);

  const handleShowTableVersionList = (item: any) => {
    setSelectedGroup(item);
    setShowTableGroup(false);
    setShowTableVersionList(true);
  };

  // Function to handle hiding item details
  const handleShowTableGroup = () => {
    setSelectedGroup(undefined);
    setShowTableGroup(true);
    setShowTableVersionList(false);
  };

  // Function to handle showing SkinRoutineForm and hiding DataTable
  const handleShowTableAndForm = ({
    skinRoutineForm,
    tableGroup,
    tableVersionList,
    selectedGroup,
  }: {
    skinRoutineForm: boolean;
    tableGroup: boolean;
    tableVersionList: boolean;
    selectedGroup: any;
  }) => {
    setSelectedGroup(selectedGroup);
    setShowSkinFormRoutine(skinRoutineForm);
    setShowTableGroup(tableGroup);
    setShowTableVersionList(tableVersionList);
  };

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
      cell: (info) => {
        return (
          <Button
            onClick={() => {
              console.log(info.getValue());

              return handleShowTableAndForm({
                tableVersionList: true,
                skinRoutineForm: false,
                tableGroup: false,
                selectedGroup: info.getValue(),
              });
            }}
          >
            Show Item
          </Button>
        );
      },
    },
  ];

  const paramsx = {
    page: 1,
    limit: 999,
    userId: params.id,
  };

  const { data, isFetching } =
    useFetchUserProductType(paramsx);

  if (isFetching) {
    return (
      <>
        <p>Loading</p>
      </>
    );
  }

  console.log(selectedGroup);

  return (
    <div className="p-2">
      <div className="flex justify-center">
        {/* <div className="bg-red-300">Component</div> */}
        <div className="">
          <Button
            onClick={() => {
              handleShowTableAndForm({
                skinRoutineForm: !showSkinFormRoutine,
                tableGroup: showSkinFormRoutine,
                tableVersionList: false,
                selectedGroup: undefined,
              });
            }}
            className="bg-slate-900"
          >
            {showSkinFormRoutine ? (
              <ArrowLeft className="mr-1" />
            ) : (
              <PlusCircle className="mr-1" />
            )}
            {showSkinFormRoutine ? "Back" : "New Routine"}
          </Button>
        </div>
      </div>
      {/* Main DataTable */}
      {showTableGroup && (
        <DataTable data={data} columns={columns} />
      )}
      {showTableVersionList && (
        <div>
          <Button
            onClick={() => {
              console.log("test");
              // let handleTableVersionList = false;
              // let handleTableGroup = false;

              // if (selectedGroup) {
              //   console.log(selectedGroup);
              //   handleTableVersionList = true;
              // }

              handleShowTableAndForm({
                selectedGroup: undefined,
                skinRoutineForm: false,
                tableGroup: true,
                tableVersionList: false,
              });
              console.log("test2");
              console.log(
                "showSkinFormRoutine -> ",
                showSkinFormRoutine
              );
            }}
          >
            Back
          </Button>
          <p>Item Detail:</p>

          <VersionList groups={selectedGroup} />
        </div>
      )}
      {/* Render SkinRoutineForm if showSkinRoutineForm is true */}
      {showSkinFormRoutine && <SkinRoutineForm />}
    </div>
  );
};

export default Page;
