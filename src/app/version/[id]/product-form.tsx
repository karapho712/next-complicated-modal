import {
  Accordion,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AccordionItem } from "@radix-ui/react-accordion";
import Image from "next/image";
import React from "react";
import {
  useFieldArray,
  useFormContext,
} from "react-hook-form";
import { SelectProductModal } from "./select-product-modal";

export const ProductForm = () => {
  const formMethods = useFormContext();
  const { fields } = useFieldArray({
    control: formMethods.control,
    name: "items",
  });

  const group = formMethods.watch("group");

  return (
    <div>
      {/* START Modal Compnent Here */}
      <SelectProductModal group={group} />
      {/* END Modal Compnent Here */}

      {fields.map((field, index) => {
        const { product } = field;

        return (
          <Accordion
            type="multiple"
            className="w-full"
            key={product.id}
          >
            <AccordionItem value={product.id}>
              <AccordionTrigger>
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
              </AccordionTrigger>
              <AccordionContent>
                <FormField
                  control={formMethods.control}
                  name={`items.${index}.comment`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Leave your instructions here:
                      </FormLabel>
                      <FormControl>
                        <Input {...field} type="text" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={formMethods.control}
                  name={`items.${index}.order`}
                  shouldUnregister={false}
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>Order</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        );
      })}
    </div>
  );
};
