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
import { Plus, Upload, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { api } from "@/lib/axios";
import { useEffect, useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  image: z.string().min(1, {
    message: "Image is required.",
  }),
  ingredients: z.string().min(5, {
    message: "Ingredients must be at least 5 characters.",
  }),
  categoryId: z.string().min(1, { message: "Category is required." }),
});

type FoodFormValues = z.infer<typeof foodFormSchema>;

type Category = { _id: string; name: string };

interface FoodData {
  _id: string;
  name: string;
  price: number;
  image: string;
  ingredients?: string;
  categoryId: string;
}

interface CreateFoodDialogProps {
  onFoodCreated?: () => void;
  editFood?: FoodData;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const CreateFoodDialog = ({
  onFoodCreated,
  editFood,
  open: controlledOpen,
  onOpenChange,
}: CreateFoodDialogProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = isControlled ? onOpenChange! : setInternalOpen;
  const isEditMode = !!editFood;
  const [categories, setCategories] = useState<Category[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const form = useForm<FoodFormValues>({
    resolver: zodResolver(foodFormSchema),
    defaultValues: {
      name: editFood?.name || "",
      price: editFood?.price?.toString() || "",
      ingredients: editFood?.ingredients || "",
      image: editFood?.image || "",
      categoryId: editFood?.categoryId || "",
    },
  });

  useEffect(() => {
    if (editFood && open) {
      form.reset({
        name: editFood.name,
        price: editFood.price.toString(),
        ingredients: editFood.ingredients || "",
        image: editFood.image,
        categoryId: editFood.categoryId,
      });
      setUploadedImageUrl(editFood.image || null);
    }
  }, [editFood, open, form]);
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const response = await fetch(
        `/api/upload?filename=${encodeURIComponent(file.name)}`,
        {
          method: "POST",
          body: file,
        }
      );

      if (!response.ok) {
        const text = await response.text();
        const error = text ? JSON.parse(text) : { error: "Unknown error" };
        console.error("Upload error:", error);
        alert(`Upload failed: ${error.details || error.error}`);
        return;
      }

      const blob = await response.json();
      setUploadedImageUrl(blob.url);
      form.setValue("image", blob.url);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = () => {
    setUploadedImageUrl("");
    form.setValue("image", "");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = async (data: FoodFormValues) => {
    try {
      setIsSubmitting(true);

      const payload = {
        name: data.name,
        price: parseFloat(data.price),
        image: data.image,
        ingredients: data.ingredients,
        categoryId: data.categoryId || "64f1a1a1a1a1a1a1a1a1a1a1",
      };

      if (isEditMode) {
        await api.put(`/foods/${editFood._id}`, payload);
      } else {
        await api.post("/foods", payload);
      }

      form.reset();
      setUploadedImageUrl(null);
      setOpen(false);

      if (onFoodCreated) {
        onFoodCreated();
      }
    } catch (error) {
      console.error(isEditMode ? "Failed to update food:" : "Failed to create food:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await api.get<Category[]>("/categories");
      setCategories(data);
    };

    fetchCategories();
  }, []);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {!isEditMode && (
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="w-full h-full flex flex-col gap-4 items-center justify-center p-4"
          >
            <Plus />
            Add New Dish
          </Button>
        </DialogTrigger>
      )}

      <DialogContent className="sm:max-w-150">
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Edit Dish" : "Add new Dish"}</DialogTitle>
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
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category._id} value={category._id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ingredients"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ingredients</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="List ingredients..."
                      className="min-h-20"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={() => (
                <FormItem>
                  <FormLabel>Food image</FormLabel>
                  <FormControl>
                    <div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                      />
                      {uploadedImageUrl ? (
                        <div className="relative border-2 border-gray-300 rounded-lg overflow-hidden">
                          <img
                            src={uploadedImageUrl}
                            alt="Uploaded food"
                            className="w-full h-48 object-cover"
                          />
                          <button
                            type="button"
                            onClick={removeImage}
                            className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <label
                          htmlFor="file-upload"
                          className="border-2 border-dashed border-gray-300 rounded-lg p-12 flex flex-col items-center justify-center hover:border-gray-400 transition-colors cursor-pointer"
                        >
                          <Upload className="w-8 h-8 text-gray-400 mb-3" />
                          <p className="text-sm text-gray-600">
                            {isUploading
                              ? "Uploading..."
                              : "Choose a file or drag & drop it here"}
                          </p>
                        </label>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-black text-white hover:bg-black/90"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? isEditMode
                    ? "Saving..."
                    : "Adding..."
                  : isEditMode
                    ? "Save Changes"
                    : "Add Dish"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
