"use client";

import { authLoginAction } from "@/modules/auth/actions/login-action";
import { AuthLoginSchema } from "@/modules/auth/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { messages } from "@/lib/messages";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";

export default function LoginForm() {
  const { form, handleSubmitWithAction } = useHookFormAction(
    authLoginAction,
    zodResolver(AuthLoginSchema),
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
            signIn(undefined, { redirect: true });
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
                <FormLabel>{messages.common.email}</FormLabel>
                <FormControl>
                  <Input placeholder="example@mail.com" {...field} />
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
                <FormLabel>{messages.common.password}</FormLabel>
                <FormControl>
                  <Input placeholder="********" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {messages.common.auth.login}
            {form.formState.isSubmitting && (
              <Loader2Icon className="animate-spin" />
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
