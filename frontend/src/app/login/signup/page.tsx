"use client";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import {
  AuthPageLayout,
  AuthFormHeader,
  PasswordInputField,
  AuthFormActions,
} from "@/app/(client)/_components/auth";
import { useAuth } from "@/contexts/AuthProvider";

const emailSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
});

const passwordSchema = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type EmailFormType = z.infer<typeof emailSchema>;
type PasswordFormType = z.infer<typeof passwordSchema>;

export default function SignUp() {
  const [step, setStep] = useState(1);
  const [emailData, setEmailData] = useState("");
  const [usernameData, setUsernameData] = useState("");
  const { register } = useAuth();

  const emailForm = useForm<EmailFormType>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  });

  const passwordForm = useForm<PasswordFormType>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onEmailSubmit = (values: EmailFormType) => {
    setUsernameData(values.username);
    setEmailData(values.email);
    setStep(2);
  };

  const onPasswordSubmit = async (values: PasswordFormType) => {
    await register(usernameData, values.password, emailData);
  };

  return (
    <AuthPageLayout>
      {step === 1 && (
        <Form {...emailForm}>
          <form className="space-y-5" onSubmit={emailForm.handleSubmit(onEmailSubmit)}>
            <AuthFormHeader
              title="Create your account"
              description="Sign up to explore your favorite dishes."
            />

            <div className="flex flex-col gap-4">
              <FormField
                control={emailForm.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Choose a username"
                        className="h-12"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={emailForm.control}
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
            </div>

            <AuthFormActions
              buttonText="Continue"
              footerText="Already have an account?"
              footerLinkText="Log in"
              footerLinkHref="/login"
            />
          </form>
        </Form>
      )}

      {step === 2 && (
        <Form {...passwordForm}>
          <form
            className="space-y-5"
            onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
          >
            <AuthFormHeader
              title="Create a strong password"
              description="Your password must be at least 6 characters."
            />

            <div className="flex flex-col gap-4">
              <PasswordInputField control={passwordForm.control} name="password" />
              <PasswordInputField
                control={passwordForm.control}
                name="confirmPassword"
                placeholder="Confirm password"
              />
            </div>

            <AuthFormActions
              buttonText="Continue"
              footerText="Already have an account?"
              footerLinkText="Log in"
              footerLinkHref="/login"
            />
          </form>
        </Form>
      )}
    </AuthPageLayout>
  );
}
