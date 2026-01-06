"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const foodFormSchema = z.object({
  name: z.string().min(2, {
    message: "Food name must be at least 2 characters.",
  }),
  price: z.string().refine(
    (val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num > 0;
    },
    {
      message: "Price must be a valid positive number.",
    }
  ),
  ingredients: z.string().min(5, {
    message: "Ingredients must be at least 5 characters.",
  }),
  categoryId: z.string(),
});

type FoodFormValues = z.infer<typeof foodFormSchema>;

export const CreateFoodDialog = () => {
  const form = useForm<FoodFormValues>({
    resolver: zodResolver(foodFormSchema),
    defaultValues: {
      name: "",
      price: "",
      ingredients: "",
    },
  });

  const onSubmit = (data: FoodFormValues) => {
    console.log("Form data:", data);
    form.reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full h-full flex flex-col gap-4 items-center justify-center p-4"
        >
          <Plus />
          Add New Dish
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add new Dish</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Food name</FormLabel>
                    <FormControl>
                      <Input placeholder="Type food name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Food price</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter price..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="ingredients"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ingredients</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="List ingredients..."
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <FormLabel>Food image</FormLabel>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 flex flex-col items-center justify-center hover:border-gray-400 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-gray-400 mb-3" />
                <p className="text-sm text-gray-600">
                  Choose a file or drag & drop it here
                </p>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-black text-white hover:bg-black/90"
              >
                Add Dish
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
