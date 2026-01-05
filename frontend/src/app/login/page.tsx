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
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import {
  AuthPageLayout,
  AuthFormHeader,
  PasswordInputField,
  AuthFormActions,
} from "@/app/(client)/_components/auth";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormType = z.infer<typeof loginSchema>;

export default function Login() {
  const form = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginFormType) => {
    console.log("Login:", values);
  };

  return (
    <AuthPageLayout>
      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
          <AuthFormHeader
            title="Log in"
            description="Log in to enjoy your favorite dishes."
          />

          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      className="h-12"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <PasswordInputField control={form.control} name="password" />

            <Link href="/login/passreset">
              <FormDescription className="text-sm text-secondary-foreground underline cursor-pointer">
                Forgot password?
              </FormDescription>
            </Link>
          </div>

          <AuthFormActions
            buttonText="Let's go"
            footerText="Don't have an account?"
            footerLinkText="Sign up"
            footerLinkHref="/login/signup"
          />
        </form>
      </Form>
    </AuthPageLayout>
  );
}
