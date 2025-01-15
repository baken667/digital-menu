"use client";

import { useSession } from "next-auth/react";

export default function DashboardClient() {
  const { data: session } = useSession();

  return <div>{JSON.stringify(session, null, 2)}</div>;
}
