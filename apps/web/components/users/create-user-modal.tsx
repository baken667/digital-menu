"use client";

import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { createUserAction } from "@/actions/users/create-user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { UserRoles } from "@dmu/prisma/client";

import { CreateUserSchema } from "@/schemas/users/create-user";
import { messages } from "@/lib/messages";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "sonner";

export default function CreateUserModal() {
  const { form, handleSubmitWithAction, action } = useHookFormAction(
    createUserAction,
    zodResolver(CreateUserSchema),
    {
      formProps: {
        defaultValues: {
          name: "Baken2",
          role: "admin",
          email: "baken.wws@icloud.com",
        },
      },
      actionProps: {
        onSuccess: async ({ data }) => {
          if (data?.success) {
            toast.success(data.message);
          } else {
            toast.error(data?.message);
          }
        },
      },
    }
  );

  return (
    <Dialog>
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
