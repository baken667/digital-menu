"use client";
import React from "react";
import { UserRoles } from "@dmu/prisma/client";
import { useSession } from "next-auth/react";

type ProtectedComponentProps = {
  children?: React.ReactNode;
  roles?: UserRoles[];
};

export default function ProtectedComponent({
  children,
  roles = ["admin"],
}: ProtectedComponentProps) {
  const { data: session } = useSession();

  if (!session || !roles.includes(session.user.role)) return;

  return children;
}
