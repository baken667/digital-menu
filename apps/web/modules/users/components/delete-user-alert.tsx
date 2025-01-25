"use client";

import { Loader2Icon, Trash2Icon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { messages } from "@/lib/messages";
import { trpc } from "@/lib/trpc/provider";
import { toast } from "sonner";

export default function DeleteUser({
  id,
  disabled,
}: {
  id: string;
  disabled?: boolean;
}) {
  const { users } = trpc.useUtils();
  const { isLoading, mutate } = trpc.users.delete.useMutation({
    onSuccess: () => {
      toast.success(messages.users.deleted);
      users.invalidate();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function handleDelete() {
    mutate(id);
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="icon"
          variant="destructive"
          disabled={isLoading || disabled}
        >
          {isLoading ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            <Trash2Icon />
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{messages.alert.confirmAction}</AlertDialogTitle>
          <AlertDialogDescription>
            {messages.users.deleteUserDescription}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{messages.common.cancel}</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>
            {messages.common.continue}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
