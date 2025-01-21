"use client";

import { useSession } from "next-auth/react";
import Container from "../container";
import Link from "next/link";
import Logo from "@/components/common/logo";
import { Button } from "@/components/ui/button";
import { messages } from "@/lib/messages";
import { Skeleton } from "@/components/ui/skeleton";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/routes";

export default function Header() {
  const { status } = useSession();

  return (
    <header>
      <Container className="py-4 flex justify-between items-center">
        <Link href="/" className="block">
          <Logo className="h-8 fill-primary" />
        </Link>
        {status === "loading" ? (
          <Skeleton className="h-10 w-32" />
        ) : (
          <Button asChild>
            <Link href={status === "authenticated" ? DEFAULT_LOGIN_REDIRECT : "/login"}>
              {status === "authenticated"
                ? messages.common.dashboard
                : messages.common.auth.login}
            </Link>
          </Button>
        )}
      </Container>
    </header>
  );
}
