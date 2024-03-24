import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useFetchProducts } from "@/hooks/user/useFetchProduct";
import Image from "next/image";
import React, { useState } from "react";
import { Product, ProductGroup } from "../../../../types";
import { clone, has, omit, values } from "lodash";
import { useFormContext } from "react-hook-form";

export const SelectProductModal = ({
  group,
}: {
  group: ProductGroup;
}) => {
  const formMethods = useFormContext();

  const [open, setOpen] = useState(false);

  const { data: productList, isFetching } =
    useFetchProducts();

  const [productMap, setProductMap] = useState<any>({});
  // console.log(productMap);

  if (isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        formMethods.setValue("items", values(productMap));
        setOpen(!open);
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline">
          Test Product Modal
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-y-auto max-h-[80%] [&::-webkit-scrollbar]:hidden">
        <DialogHeader>
          <DialogTitle>Select products</DialogTitle>
          {productList.map((product: Product) => {
            return (
              <div
                key={product.id}
                className="flex p-2 items-center"
              >
                <Checkbox
                  checked={has(productMap, product.id)}
                  onCheckedChange={(e) => {
                    setProductMap((prevState) => {
                      let newState = clone(prevState);

                      if (e.valueOf() === true) {
                        newState[product.id] = {
                          product,
                          group,
                          comment: product.comment || "",
                        };
                      } else {
                        newState = omit(
                          newState,
                          product.id
                        );
                      }

                      return newState;
                    });
                  }}
                />
                <Image
                  src={"/next.svg"}
                  width={40}
                  height={40}
                  alt={product.name}
                  className="mx-2"
                />
                <div className="inline-block">
                  <p>{product.name}</p>
                  <p>{product.type}</p>
                </div>
              </div>
            );
          })}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
