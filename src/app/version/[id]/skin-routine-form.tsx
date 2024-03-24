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
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ProductGroup } from "../../../../types";
import { ProductForm } from "./product-form";

export const SkinRoutineForm = () => {
  const form = useForm({
    defaultValues: {
      username: "",
      startAt: "",
      group: "",
      isPublished: "",
    },
  });
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={() => {
            console.log("Skin routine test");
          }}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="startAt"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Routine start:</FormLabel>
                <FormControl>
                  <Input {...field} type="date" />
                </FormControl>
                {/* <FormDescription>
                  This is your public display name.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
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
            control={form.control}
            name="isPublished"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Publish:</FormLabel>
                <FormControl>
                  <Switch />
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
      </Form>
    </>
  );
};
