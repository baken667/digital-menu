"use client";

import { useState } from "react";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { messages } from "@/lib/messages";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { createEstablishmentAction } from "@/actions/establishments/create-establishment";
import { CreateEstablishmentSchema } from "@/schemas/establishments/create-establishment";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { trpc } from "@/trpc/provider";
import { EstablishmentCreateSchema } from "@/modules/establishments/lib/schema";
import { EstablishmentCreateAction } from "@/modules/establishments/actions/establishment-create-action";

export default function CreateEstablishmentDialog() {
  const establishment = trpc.useUtils().establishment;
  const [open, setOpen] = useState(false);

  const { form, handleSubmitWithAction } = useHookFormAction(
    EstablishmentCreateAction,
    zodResolver(EstablishmentCreateSchema),
    {
      formProps: {
        defaultValues: {
          name: "",
          slug: "",
        },
      },
      actionProps: {
        onSuccess: async ({ data }) => {
          if (data?.success) {
            toast.success(data.message);
            establishment.list.invalidate();
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
        <Button>{messages.establishments.create}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{messages.establishments.create}</DialogTitle>
          <DialogDescription>
            {messages.establishments.createDescription}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmitWithAction}>
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{messages.common.name}</FormLabel>
                    <Input {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{messages.common.slug}</FormLabel>
                    <Input {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="mt-4">
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {messages.common.save}
                {form.formState.isSubmitting && (
                  <Loader2Icon className="animate-spin" />
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
