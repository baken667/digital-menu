"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { uploadEstablishmentLogoAction } from "@/actions/establishments/upload-establishment-logo";
import { UploadEstablishmentLogoSchema } from "@/schemas/establishments/upload-logo";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { messages } from "@/lib/messages";
import { Input } from "../ui/input";
import { trpc } from "@/trpc/provider";

type PropsType = {
  estId: string;
};

export default function UploadEstablishmentLogo({ estId }: PropsType) {
  const { establishment } = trpc.useUtils();
  const uploadAction = uploadEstablishmentLogoAction.bind(null, estId);

  const { form, handleSubmitWithAction } = useHookFormAction(
    uploadAction,
    zodResolver(UploadEstablishmentLogoSchema),
    {
      actionProps: {
        onSuccess: (data) => {
          console.log(data.data);
          establishment.invalidate();
        },
        onError: (data) => {
          console.log(data);
        },
      },
      formProps: {
        defaultValues: {
          file: undefined,
        },
      },
    },
  );

  return (
    <Form {...form}>
      <form onSubmit={handleSubmitWithAction} className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Logo</FormLabel>
              <FormControl>
                <Input
                  name={field.name}
                  type="file"
                  onChange={(e) => field.onChange(e.target.files?.[0])}
                  onBlur={field.onBlur}
                  accept="image/png, image/jpeg, image/jpg, image/svg+xml, image/gif"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button>{messages.common.save}</Button>
      </form>
    </Form>
  );
}
