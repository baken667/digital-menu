"use client";
import { PenIcon } from "lucide-react";
import initials from "initials";

import { User } from "@dmu/prisma/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DialogTrigger } from "@/components/ui/dialog";
import { messages } from "@/lib/messages";
import DeleteUser from "./delete-user-alert";
import EditUserModal from "./edit-user-modal";

export default function UserCard({
  user,
  isFetching,
}: {
  user: Omit<User, "passwordHash">;
  isFetching: boolean;
}) {
  const shortname = initials(user.name || user.email);

  return (
    <Card className={isFetching ? "animate-pulse" : ""}>
      <CardContent className="px-6 py-4 flex flex-col md:flex-row md:items-center gap-6 justify-between">
        <div className="flex flex-col gap-2 lg:flex-row">
          <div className="flex flex-row gap-4">
            <Avatar>
              <AvatarFallback>{shortname}</AvatarFallback>
            </Avatar>
            <div>
              <div>
                <h3 className="font-semibold text-base">{user.name}</h3>
              </div>
              <div className="">
                <p className="text-muted-foreground text-sm flex-col">
                  {user.email}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-end gap-2">
            <Badge variant={user.role === "admin" ? "default" : "outline"}>
              {messages.common[user.role]}
            </Badge>
            {user.lockedAt && (
              <Badge variant="destructive">{messages.common.locked}</Badge>
            )}
          </div>
        </div>
        <div className="flex gap-2 justify-end">
          <DeleteUser id={user.id} disabled={isFetching} />
          <EditUserModal userId={user.id}>
            <DialogTrigger asChild>
              <Button size="icon" variant="outline" disabled={isFetching}>
                <PenIcon />
              </Button>
            </DialogTrigger>
          </EditUserModal>
        </div>
      </CardContent>
    </Card>
  );
}
