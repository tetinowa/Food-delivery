"use client";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const formSchema = z.object({
  email: z.email("Invalid email address"),
});

type FormSchemaType = z.infer<typeof formSchema>;

export type LoginProps = {
  onNext?: () => void;
};

export default function Login() {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: FormSchemaType) => {
    console.log(values);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex h-fit w-fit items-center justify-center gap-10">
        <div className="flex flex-col w-104 gap-6">
          <Form {...form}>
            <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap">
                <FormLabel className="text-black font-semibold text-[24px] leading-8">
                  Reset
                </FormLabel>
                <FormDescription className="text-muted-foreground text-[16px] font-normal leading-6 ">
                  Enter your email to reset your password.
                </FormDescription>
              </div>
              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <div>
                      <FormItem>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter your email address"
                            className="h-12"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                      </FormItem>
                    </div>
                  )}
                />
              </div>
              <Button
                type="submit"
                className="bg-black text-white w-full h-12 px-6"
              >
                Send link
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </Form>
          <div className="flex gap-3 justify-center">
            <h1>Don't have an account?</h1>
            <Link href="/signup" className="text-blue-500">
              {"Sign up"}
            </Link>
          </div>
        </div>
        <div>
          <img src="/misc/login.jpg" className="w-214 h-226 rounded-3xl" />
        </div>
      </div>
    </div>
  );
}
