"use client";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormLabel,
  FormDescription,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
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
      password: "",
    },
  });

  const onSubmit = (values: FormSchemaType) => {
    console.log(values);
  };
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex h-fit w-fit items-center justify-center gap-10">
        <div className="flex flex-col w-104 gap-6">
          <Form {...form}>
            <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap">
                <FormLabel className="text-black font-semibold text-[24px] leading-8">
                  Login
                </FormLabel>
                <FormDescription className="text-muted-foreground text-[16px] font-normal leading-6 ">
                  Log in to enjoy your favorite dishes.
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

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Password"
                          className="h-12"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormDescription className="text-sm text-secondary-foreground underline">
                  Forgot password?
                </FormDescription>
              </div>
              <Button
                type="submit"
                className="bg-black text-white w-full h-12 px-6"
              >
                Let's go
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </Form>
        </div>
        <img src="/misc/login.jpg" className="w-214 h-226 rounded-3xl" />
      </div>
    </div>
  );
}
