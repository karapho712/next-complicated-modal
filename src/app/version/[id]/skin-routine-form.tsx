import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  ProductGroup,
  UserProduct,
} from "../../../../types";
import { ProductForm } from "./product-form";
import { format } from "date-fns/format";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
} from "@/components/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";

export const SkinRoutineForm = () => {
  const formMethods = useForm<UserProduct>({
    defaultValues: {
      startAt: new Date(),
      group: ProductGroup.NIGHT,
      isPublished: false,
    },
  });

  // const [date, setDate] = useState<Date | undefined>(
  //   new Date()
  // );

  const onSubmit = async (data: any) => {
    // data.startAt = date;
    console.log(data);
    console.log("submitted");
  };
  return (
    <>
      <FormProvider {...formMethods}>
        {/* <Form {...formMethods}> */}
        <form
          onSubmit={formMethods.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <FormField
            control={formMethods.control}
            name="startAt"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value &&
                            "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={formMethods.control}
            name="group"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Routine name:</FormLabel>
                <FormControl>
                  <>
                    <Input
                      {...field}
                      id="routine"
                      list="routine-list"
                      type="text"
                    />
                    <datalist id="routine-list">
                      {Object.values(ProductGroup).map(
                        (type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        )
                      )}
                    </datalist>
                  </>
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={formMethods.control}
            name="isPublished"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Publish:</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <ProductForm />

          <div className="">
            <Button type="submit" className="mr-2">
              Submit
            </Button>
            <Button type="reset">Cancel</Button>
          </div>
        </form>
        {/* </Form> */}
      </FormProvider>
    </>
  );
};
