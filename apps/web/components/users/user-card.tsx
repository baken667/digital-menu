"use client";

import { User } from "@dmu/prisma/client";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { PenIcon } from "lucide-react";
import initials from "initials";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { messages } from "@/lib/messages";
import DeleteUser from "./delete-user";
import EditUserModal from "./edit-user-modal";
import { DialogTrigger } from "../ui/dialog";

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
      <CardContent className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>{shortname}</AvatarFallback>
          </Avatar>
          <div>
            <div>
              <h3 className="font-semibold text-base">{user.name}</h3>
            </div>
            <div className="flex gap-4 items-center">
              <p className="text-muted-foreground text-sm">{user.email}</p>
              <Badge variant={user.role === "admin" ? "default" : "outline"}>
                {messages.common[user.role]}
              </Badge>
              {user.lockedAt && (
                <Badge variant="destructive">{messages.common.locked}</Badge>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
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
