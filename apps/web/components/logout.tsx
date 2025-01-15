"use client";
import { useTransition } from "react";
import { Button } from "./ui/button";
import { Loader2Icon } from "lucide-react";
import { signOut } from "next-auth/react";

function LogoutButton() {
  const [pending, startTransition] = useTransition();

  const handleLogout = async () => {
    startTransition(async () => {
      await signOut()
    });
  };
  return (
    <Button onClick={handleLogout}>
      logout {pending ?? <Loader2Icon className="animate-spin" />}
    </Button>
  );
}

export default LogoutButton;
