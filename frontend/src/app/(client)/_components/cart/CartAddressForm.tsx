import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const addressSchema = z.object({
  address: z.string().min(1, "Address is required"),
  apartment: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "ZIP code is required"),
});

type AddressFormType = z.infer<typeof addressSchema>;

interface CartAddressFormProps {
  onBack: () => void;
  onSubmit: () => void;
}

export function CartAddressForm({ onBack, onSubmit }: CartAddressFormProps) {
  const form = useForm<AddressFormType>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      address: "",
      apartment: "",
      city: "",
      state: "",
      zipCode: "",
    },
  });

  const handleSubmit = (values: AddressFormType) => {
    console.log("Address:", values);
    onSubmit();
  };

  return (
    <div className="h-full p-6 bg-white">
      <div className="max-w-full">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-black">Input address</h1>
          <Button variant="ghost" size="icon" onClick={onBack}>
            <X className="h-6 w-6" />
          </Button>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your address" className="h-12" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="apartment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Apartment, suite, etc. (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Apartment, suite, etc." className="h-12" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">City</FormLabel>
                    <FormControl>
                      <Input placeholder="City" className="h-12" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">State</FormLabel>
                    <FormControl>
                      <Input placeholder="State" className="h-12" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">ZIP Code</FormLabel>
                  <FormControl>
                    <Input placeholder="ZIP Code" className="h-12" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full h-12 bg-red-500 hover:bg-red-600 text-white">
              Continue
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
