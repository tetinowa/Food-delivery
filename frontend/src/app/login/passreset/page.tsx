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
  AuthFormActions,
} from "@/app/(client)/_components/auth";

const resetEmailSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const verificationCodeSchema = z.object({
  code: z.string().min(1, "Please enter the verification code"),
});

type ResetEmailFormType = z.infer<typeof resetEmailSchema>;
type VerificationCodeFormType = z.infer<typeof verificationCodeSchema>;

export default function ForgotPassword() {
  const [step, setStep] = useState(1);

  const emailForm = useForm<ResetEmailFormType>({
    resolver: zodResolver(resetEmailSchema),
    defaultValues: {
      email: "",
    },
  });

  const codeForm = useForm<VerificationCodeFormType>({
    resolver: zodResolver(verificationCodeSchema),
    defaultValues: {
      code: "",
    },
  });

  const onEmailSubmit = (values: ResetEmailFormType) => {
    console.log("Reset email:", values);
    setStep(2);
  };

  const onCodeSubmit = (values: VerificationCodeFormType) => {
    console.log("Verification code:", values);
  };

  return (
    <AuthPageLayout>
      {step === 1 && (
        <Form {...emailForm}>
          <form className="space-y-5" onSubmit={emailForm.handleSubmit(onEmailSubmit)}>
            <AuthFormHeader
              title="Reset your password"
              description="Enter your email to reset your password."
            />

            <FormField
              control={emailForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="example@email.com"
                      className="h-12"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <AuthFormActions
              buttonText="Continue"
              footerText="Don't have an account?"
              footerLinkText="Sign up"
              footerLinkHref="/login/signup"
            />
          </form>
        </Form>
      )}

      {step === 2 && (
        <Form {...codeForm}>
          <form className="space-y-5" onSubmit={codeForm.handleSubmit(onCodeSubmit)}>
            <AuthFormHeader
              title="Please verify Your Email"
              description="We've sent a code to your email. Please check your inbox."
            />

            <FormField
              control={codeForm.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter code"
                      className="h-12"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <AuthFormActions
              buttonText="Continue"
              footerText="Didn't receive code?"
              footerLinkText="Resend"
              onFooterLinkClick={() => console.log("Resend code")}
            />
          </form>
        </Form>
      )}
    </AuthPageLayout>
  );
}
