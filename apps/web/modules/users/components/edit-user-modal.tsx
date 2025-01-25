import { useState } from "react";
import { z } from "zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";
import { User, UserRoles } from "@dmu/prisma/client";
import { trpc } from "@/lib/trpc/provider";

import { messages } from "@/lib/messages";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { UserEditAction } from "../actions/edit-user-action";
import { UserEditSchema } from "../lib/schema";

interface EditUserModalProps {
  userId: string;
  children: React.ReactNode;
}

function UserForm({
  data,
  setOpen,
}: {
  data: User;
  setOpen: (val: boolean) => void;
}) {
  const utils = trpc.useUtils();
  const { form, handleSubmitWithAction } = useHookFormAction(
    UserEditAction,
    zodResolver(
      z.object({
        id: z.string(),
        data: UserEditSchema,
      }),
    ),
    {
      formProps: {
        defaultValues: {
          id: data.id,
          data: {
            name: data.name || "",
            role: data.role,
            email: data.email,
          },
        },
      },
      actionProps: {
        onSuccess: async () => {
          toast.success(messages.users.edited);
          utils.users.invalidate();
          setOpen(false);
        },
      },
    },
  );

  return (
    <Form {...form}>
      <form onSubmit={handleSubmitWithAction}>
        <div className="grid grid-cols-2 py-4 gap-4">
          <FormField
            control={form.control}
            name="data.email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{messages.common.email}</FormLabel>
                <Input {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="data.name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{messages.common.username}</FormLabel>
                <Input {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="data.role"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>{messages.common.role}</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={messages.users.selectUserRole} />
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
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {messages.common.save}

            {form.formState.isSubmitting && (
              <Loader2Icon className="animate-spin" />
            )}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}

export default function EditUserModal({
  userId,
  children,
}: EditUserModalProps) {
  const [open, setOpen] = useState(false);

  const { data, isLoading } = trpc.users.get.useQuery(userId, {
    enabled: open,
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children}
      <DialogContent className="sm:max-w-screen-sm">
        <DialogHeader>
          <DialogTitle>{messages.users.edit}</DialogTitle>
          <DialogDescription>
            {messages.users.editDescription}
          </DialogDescription>
        </DialogHeader>
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <Spinner />
          </div>
        )}
        {data && <UserForm data={data} setOpen={setOpen} />}
      </DialogContent>
    </Dialog>
  );
}
