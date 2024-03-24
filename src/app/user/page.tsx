"use client";
import { Button } from "@/components/ui/button";
import { useFetchUsers } from "@/hooks/user/useFetchUsers";
import { ColumnDef } from "@tanstack/react-table";
import { Plus, PlusCircle } from "lucide-react";
import React from "react";
import { User } from "../../../types";
import { DataTable } from "../_components/data-table";

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    cell: (info) => info.getValue(),
  },

  {
    accessorKey: "name",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "email",
    cell: (info) => info.getValue(),
  },
];

export const Page = () => {
  const { data, isFetching } = useFetchUsers();

  if (isFetching) {
    return (
      <>
        <p>Loading</p>
      </>
    );
  }

  return (
    <div className="p-2">
      <div className="flex justify-center">
        {/* <div className="bg-red-300">Component</div> */}
        <div className="">
          <Button
            onClick={() => {
              console.log("test user");
            }}
            className="bg-slate-900"
          >
            <PlusCircle className="mr-1" />
            New Routine
          </Button>
        </div>
      </div>
      <div>
        <DataTable
          data={data}
          columns={columns}

          // paginationProps={getpaginationprops}
        />
      </div>
    </div>
  );
};

export default Page;
