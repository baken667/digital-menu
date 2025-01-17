"use client";
import { useTransition } from "react";
import { signOut, useSession } from "next-auth/react";
import initials from "initials";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { messages } from "@/lib/messages";
import { Loader2Icon, LogOutIcon, User2Icon } from "lucide-react";

function UserAvatar({ username }: { username: string }) {
  const shortname = initials(username);

  return (
    <Avatar>
      <AvatarFallback>{shortname}</AvatarFallback>
    </Avatar>
  );
}

export default function UserDropdown() {
  const { data: session, status } = useSession();

  const [isPending, startTransition] = useTransition();

  function handleLogout() {
    startTransition(async () => {
      await signOut();
    });
  }

  if (status === "loading" || !session?.user) {
    return <Skeleton className="h-10 w-10 rounded-full" />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full h-10 w-10">
          {isPending ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            <UserAvatar username={session.user.name} />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel asChild>
          <div className="flex flex-col">
            <span>{session.user.name}</span>
            <span className="text-xs text-muted-foreground">
              {session.user.email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User2Icon />
            {messages.common.profile}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout}>
            <LogOutIcon />
            {messages.common.auth.logout}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
