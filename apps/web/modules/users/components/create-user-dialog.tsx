"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { UserRoles } from "@dmu/prisma/client";

import { messages } from "@/lib/messages";
import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "../../../components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { trpc } from "@/lib/trpc/provider";
import { UserCreateSchema } from "../lib/schema";
import { UsersCreateAction } from "../actions/create-user-action";

export default function CreateUserDialog() {
  const [open, setOpen] = useState(false);
  const { users } = trpc.useUtils();
  const { form, handleSubmitWithAction, action } = useHookFormAction(
    UsersCreateAction,
    zodResolver(UserCreateSchema),
    {
      formProps: {
        defaultValues: {
          name: "",
          role: "owner",
          email: "",
        },
      },
      actionProps: {
        onSuccess: async ({ data }) => {
          if (data?.success) {
            toast.success(data.message);
            users.list.invalidate();
            setOpen(false);
            form.reset();
          } else {
            toast.error(data?.message);
          }
        },
      },
    },
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{messages.users.create}</Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={handleSubmitWithAction}>
            <DialogHeader>
              <DialogTitle>{messages.users.create}</DialogTitle>
              <DialogDescription>
                {messages.users.createDescription}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{messages.common.username}</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{messages.common.email}</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{messages.common.role}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={messages.users.selectUserRole}
                        />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectGroup>
                          {Object.values(UserRoles).map((role) => (
                            <SelectItem key={role} value={role}>
                              {messages.common[role]}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={action.isExecuting}>
                {messages.common.save}
                {action.isExecuting && <Loader2Icon className="animate-spin" />}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
