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
import { api } from "@/lib/axios";
import { useState } from "react";

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

interface CreateFoodDialogProps {
  onFoodCreated?: () => void;
}

export const CreateFoodDialog = ({ onFoodCreated }: CreateFoodDialogProps) => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FoodFormValues>({
    resolver: zodResolver(foodFormSchema),
    defaultValues: {
      name: "",
      price: "",
      ingredients: "",
      categoryId: "",
    },
  });

  const onSubmit = async (data: FoodFormValues) => {
    try {
      setIsSubmitting(true);

      await api.post("/foods", {
        name: data.name,
        price: parseFloat(data.price),
        ingredients: data.ingredients,
        categoryId: data.categoryId || "64f1a1a1a1a1a1a1a1a1a1a1",
      });

      form.reset();
      setOpen(false);

      if (onFoodCreated) {
        onFoodCreated();
      }
    } catch (error) {
      console.error("Failed to create food:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
                disabled={isSubmitting}
              >
                {isSubmitting ? "Adding..." : "Add Dish"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
