"use client";
import { Button } from "@/components/ui/button";
import { useFetchUserProducts } from "@/hooks/user/useFetchUserProduct";
import { useFetchUserProductType } from "@/hooks/user/useFetchUserProductType";
import { useFetchUsers } from "@/hooks/user/useFetchUsers";
import { ColumnDef } from "@tanstack/react-table";
import { Plus, PlusCircle } from "lucide-react";
import React, { useMemo, useState } from "react";
import {
  User,
  UserProduct,
  UserProductItem,
} from "../../../../types";
import { DataTable } from "../../_components/data-table";
import { SkinRoutineForm } from "./skin-routine-form";
import { VersionList } from "./version-list";

interface ItemDetailTableProps {
  items: UserProduct["items"];
  onClose: () => void;
}

const ItemDetailTable: React.FC<ItemDetailTableProps> = ({
  items,
  onClose,
}) => {
  return (
    <div>
      <button onClick={onClose}>Back</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Comment</th>
            <th>Order</th>
            <th>Product Name</th>
            <th>Product Type</th>
            <th>Product Description</th>
            <th>Product Comment</th>
            <th>Image URL</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.comment}</td>
              <td>{item.order}</td>
              <td>{item.product.name}</td>
              <td>{item.product.type}</td>
              <td>{item.product.description}</td>
              <td>{item.product.comment}</td>
              <td>{item.product.imageUrl}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const Page = ({
  params,
}: {
  params: { id: string };
}) => {
  const [showItemDetail, setShowItemDetail] =
    useState(false);
  const [selectedItem, setSelectedItem] =
    useState<any>(null); // Define proper type for selectedItem

  console.log(selectedItem);

  // Function to handle showing item details
  const handleShowItem = (item: any) => {
    setSelectedItem(item);
    setShowItemDetail(true);
  };

  // Function to handle hiding item details
  const handleHideItem = () => {
    setSelectedItem(null);
    setShowItemDetail(false);
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
      header: "published",
      accessorKey: "isPublished",
      cell: (info) =>
        info.getValue() ? <p>Benar</p> : <p>Salah</p>,
    },
    {
      id: "actiongroup",
      header: "Action",
      accessorKey: "group",
      cell: (info) => {
        return (
          <Button
            onClick={() => handleShowItem(info.getValue())}
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

  return (
    <div className="p-2">
      <div className="flex justify-center">
        {/* <div className="bg-red-300">Component</div> */}
        <div className="">
          <Button
            onClick={() => {
              console.log("test");
            }}
            className="bg-slate-900"
          >
            <PlusCircle className="mr-1" />
            New Routine
          </Button>
        </div>
      </div>
      {/* Main DataTable */}
      {!showItemDetail && (
        <DataTable data={data} columns={columns} />
      )}
      {showItemDetail && selectedItem && (
        <div>
          <Button onClick={handleHideItem}>Back</Button>
          <p>Item Detail:</p>

          <VersionList groups={selectedItem} />
        </div>
      )}

      <SkinRoutineForm />
    </div>
  );
};

export default Page;
