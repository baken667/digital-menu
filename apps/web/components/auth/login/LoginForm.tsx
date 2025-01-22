"use client";

import React from "react";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";

import { loginAction } from "@/actions/auth/login";
import { LoginSchema } from "@/schemas/users/auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/routes";

function LoginForm() {
  const { action, form, handleSubmitWithAction } = useHookFormAction(
    loginAction,
    zodResolver(LoginSchema),
    {
      formProps: {
        defaultValues: {
          email: "",
          password: "",
        },
      },
      actionProps: {
        onSuccess: async ({ data }) => {
          if (data?.success) {
            signIn(undefined, {
              redirectTo: DEFAULT_LOGIN_REDIRECT,
            });
          } else {
            toast.error(data?.message);
          }
        },
      },
    },
  );
  return (
    <Form {...form}>
      <form onSubmit={handleSubmitWithAction}>
        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="me@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={action.isPending}>
            Войти
            {action.isPending && <Loader2Icon className="animate-spin" />}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default LoginForm;
