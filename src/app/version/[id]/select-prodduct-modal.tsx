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
import React from "react";
import { Product } from "../../../../types";

export const SelectProductModal = () => {
  const { data: productList, isFetching } =
    useFetchProducts();

  if (isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            Test Product Modal
          </Button>
        </DialogTrigger>
        <DialogContent className="overflow-y-auto max-h-[80%] [&::-webkit-scrollbar]:hidden">
          <DialogHeader>
            <DialogTitle>Select products</DialogTitle>
            <DialogDescription>
              {productList.map((product: Product) => {
                return (
                  <div
                    key={product.id}
                    className="flex p-2 items-center"
                  >
                    <Checkbox />
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
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};
