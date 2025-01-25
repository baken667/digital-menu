import { toast } from "sonner";
import { Loader2Icon, Trash2Icon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { messages } from "@/lib/messages";
import { trpc } from "@/trpc/provider";

interface Props {
  id: string;
  disabled?: boolean;
}

export default function DeleteEstablishment({ id, disabled }: Props) {
  const { establishment } = trpc.useUtils();

  const { isLoading, mutate } = trpc.establishment.delete.useMutation({
    onSuccess: () => {
      toast.success(messages.establishments.deleted);
      establishment.invalidate();
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
          disabled={disabled || isLoading}
        >
          {isLoading ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            <Trash2Icon />
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>{messages.alert.confirmAction}</AlertDialogTitle>
        <AlertDialogDescription>
          {messages.establishments.deleteEstablishmentDescription}
        </AlertDialogDescription>
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
